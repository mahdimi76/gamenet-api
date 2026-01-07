import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession } from './entities/game-session.entity';
import { CreateSessionDto, EndSessionDto, UpdateSessionDto } from './dto/session.dto';
import { PaySessionDto } from './dto/pay-session.dto';
import { Transaction, TransactionType } from '../transactions/entities/transaction.entity';
import { Customer } from '../customers/entities/customer.entity';

import { Device } from '../devices/entities/device.entity';

@Injectable()
export class GameSessionsService {
    constructor(
        @InjectRepository(GameSession)
        private sessionsRepository: Repository<GameSession>,
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        @InjectRepository(Device)
        private devicesRepository: Repository<Device>,
    ) { }

    async create(createSessionDto: CreateSessionDto): Promise<GameSession> {
        // آپدیت وضعیت دستگاه به BUSY (اگر دستگاه مشخص باشد)
        if (createSessionDto.deviceId) {
            await this.devicesRepository.update(createSessionDto.deviceId, {
                status: 'BUSY',
                startTime: new Date()
            });
        }

        const session = this.sessionsRepository.create(createSessionDto);
        return this.sessionsRepository.save(session);
    }

    async findAll(): Promise<GameSession[]> {
        return this.sessionsRepository.find({
            relations: ['device', 'customer', 'startedBy'],
        });
    }

    async findByGameNet(gameNetId: string, status?: string): Promise<GameSession[]> {
        const where: any = { gameNetId };
        if (status) where.status = status;
        return this.sessionsRepository.find({
            where,
            relations: ['device', 'customer', 'startedBy'],
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<GameSession | null> {
        return this.sessionsRepository.findOne({
            where: { id },
            relations: ['device', 'customer', 'startedBy'],
        });
    }

    async findActiveByDevice(deviceId: string): Promise<GameSession | null> {
        return this.sessionsRepository.findOne({
            where: { deviceId, status: 'ACTIVE' },
        });
    }

    async update(id: string, updateSessionDto: UpdateSessionDto, gameNetId: string): Promise<GameSession | null> {
        const session = await this.sessionsRepository.findOne({ where: { id, gameNetId } });
        if (!session) return null;
        await this.sessionsRepository.update(id, updateSessionDto);
        return this.findOne(id);
    }

    async endSession(id: string, endSessionDto: EndSessionDto, gameNetId: string): Promise<any> {
        // دریافت session با تمام relations و چک کردن gameNetId
        const session = await this.sessionsRepository.findOne({
            where: { id, gameNetId },
            relations: ['device', 'customer', 'orders', 'orders.items', 'services', 'services.service'],
        });

        if (!session || !session.device) {
            // اگر پیدا نشد یا مال این گیم‌نت نبود
            return null;
        }

        const endTime = new Date();
        const startTime = new Date(session.startTime);
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationMinutes = Math.ceil(durationMs / 60000);

        // محاسبه قیمت بازی با منطق پیشرفته
        const deviceConfig = session.device.config;
        const pricingVariant = session.pricingVariant; // e.g., "1", "2", "ONLINE"
        const playerCount = session.extraControllers + 1;

        // 1. تعیین نرخ پایه (Base Rate)
        let hourlyRate = session.device.hourlyRate || 0;

        // اگر تنظیمات پیشرفته وجود داشت
        if (deviceConfig && deviceConfig.pricingVariants) {
            // اگر variant مشخص شده (مثلاً از فرانت آمده)، اولویت با آن است
            if (pricingVariant && deviceConfig.pricingVariants[pricingVariant]) {
                hourlyRate = Number(deviceConfig.pricingVariants[pricingVariant]);
            }
            // اگر variant نبود (سیستم قدیم)، سعی کن بر اساس تعداد نفرات پیدا کنی
            else if (deviceConfig.pricingVariants[playerCount.toString()]) {
                hourlyRate = Number(deviceConfig.pricingVariants[playerCount.toString()]);
            }
            // حالت PC Offline/Online (اگر variant نباشد سیستم قدیم ممکن است به مشکل بخورد پس بهتر است variant همیشه باشد)
        }

        // 2. محاسبه دقیق با برش زمانی (Time Slicing)
        let calculatedGamePrice = 0;
        let current = new Date(startTime.getTime());
        const end = new Date(endTime.getTime());

        const dynamicRules = deviceConfig?.dynamicRules || [];

        // اگر قانون پویایی وجود نداشت، محاسبه ساده
        if (dynamicRules.length === 0) {
            calculatedGamePrice = (durationMinutes / 60) * hourlyRate;
        } else {
            // محاسبه دقیقه به دقیقه
            while (current < end) {
                const currentHour = current.getHours();
                const currentMinute = current.getMinutes();
                const currentDay = (current.getDay() + 1) % 7; // تبدیل 0..6 (یکشنبه..شنبه) به 0..6 (شنبه..جمعه) برای هماهنگی با فرانت
                // JS: 0=Sun, 1=Mon, ..., 6=Sat
                // Target: 0=Sat, 1=Sun, ..., 6=Fri
                // Formula: (Day + 1) % 7. 
                // Sat(6) -> 7%7=0. Sun(0) -> 1. Correct. 

                const currentTimeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

                let minuteRate = hourlyRate / 60; // نرخ پیش‌فرض این دقیقه

                // بررسی تطابق با قوانین پویا
                for (const rule of dynamicRules) {
                    // چک کردن روز (اگر آرایه روزها تعریف شده باشد)
                    const dayMatch = !rule.days || rule.days.length === 0 || rule.days.includes(currentDay);

                    if (dayMatch && this.isTimeInRange(currentTimeStr, rule.start, rule.end)) {
                        // اگر قانون منطبق شد، باید نرخ را از داخل قانون پیدا کنیم
                        if (rule.pricingVariants) {
                            // دقیقاً مشابه نرخ پایه، باید نرخ مناسب را از اینجا برداریم
                            if (pricingVariant && rule.pricingVariants[pricingVariant]) {
                                minuteRate = Number(rule.pricingVariants[pricingVariant]) / 60;
                            } else if (rule.pricingVariants[playerCount.toString()]) {
                                minuteRate = Number(rule.pricingVariants[playerCount.toString()]) / 60;
                            } else if (rule.rate) {
                                // Backward compatibility / Simple rate
                                minuteRate = Number(rule.rate) / 60;
                            }
                        } else if (rule.rate) {
                            minuteRate = Number(rule.rate) / 60;
                        }
                        break; // اولویت با اولین قانون منطبق
                    }
                }

                calculatedGamePrice += minuteRate;
                current.setMinutes(current.getMinutes() + 1);
            }
        }

        // قیمت نهایی
        // در سیستم جدید، اگر pricingVariants وجود داشته باشد، قیمت شامل همه چیز است.
        // فقط اگر هیچ کانفیگی نبود (حالت ساده قدیمی)، فرمول extraRate اعمال می‌شود.

        let finalGamePrice = Math.ceil(calculatedGamePrice);

        if ((!deviceConfig || !deviceConfig.pricingVariants) && !pricingVariant) {
            // اگر سیستم سنتی بود و هیچ کانفیگی نداشتیم
            const basePrice = (durationMinutes / 60) * (session.device.hourlyRate || 0);
            const extraRate = session.device.extraRate || 0;
            const extraPrice = (durationMinutes / 60) * extraRate * (session.extraControllers || 0);
            finalGamePrice = Math.ceil(basePrice + extraPrice);
        }

        const gamePrice = finalGamePrice;

        // محاسبه قیمت بوفه
        let buffetPrice = 0;
        if (session.orders) {
            session.orders.forEach(order => {
                if (order.items) {
                    order.items.forEach(item => {
                        buffetPrice += item.totalPrice || 0;
                    });
                }
            });
        }

        // محاسبه قیمت خدمات
        let servicesPrice = 0;
        if (session.services) {
            session.services.forEach(s => {
                servicesPrice += (s.quantity || 1) * (s.service?.price || 0);
            });
        }

        const totalPrice = gamePrice + buffetPrice + servicesPrice;

        // آپدیت session
        await this.sessionsRepository.update(id, {
            endTime,
            durationMinutes,
            totalPrice,
            status: 'COMPLETED',
            isPaid: false,
        });

        // آزاد کردن دستگاه
        await this.devicesRepository.update(session.deviceId, {
            status: 'AVAILABLE',
            startTime: null
        });

        return {
            success: true,
            data: {
                id: session.id,
                deviceName: session.device.name,
                duration: durationMinutes,
                gamePrice,
                buffetPrice,
                servicesPrice,
                totalPrice,
                startTime: session.startTime,
                endTime,
                customer: session.customer,
            }
        };
    }

    async paySession(id: string, payDto: PaySessionDto, userId: string, gameNetId: string): Promise<any> {
        const session = await this.sessionsRepository.findOne({ where: { id, gameNetId }, relations: ['customer'] });
        if (!session) throw new NotFoundException('نشست یافت نشد');

        if (session.isPaid) throw new BadRequestException('این نشست قبلاً پرداخت شده است');

        const amount = Number(session.totalPrice);

        // اگر پرداخت از کیف پول است
        if (payDto.method === 'WALLET') {
            if (!session.customer) throw new BadRequestException('مشتری برای پرداخت کیف پول مشخص نیست');
            if (Number(session.customer.balance) < amount) throw new BadRequestException('موجودی کیف پول کافی نیست');

            // کسر موجودی
            session.customer.balance = Number(session.customer.balance) - amount;
            // آپدیت آمار مشتری
            session.customer.totalSpent = Number(session.customer.totalSpent || 0) + amount;
            session.customer.totalMinutes = Number(session.customer.totalMinutes || 0) + (session.durationMinutes || 0);

            await this.customersRepository.save(session.customer);
        } else if (session.customer) {
            // پرداخت نقدی ولی مشتری دارد -> آپدیت آمار مشتری
            session.customer.totalSpent = Number(session.customer.totalSpent || 0) + amount;
            session.customer.totalMinutes = Number(session.customer.totalMinutes || 0) + (session.durationMinutes || 0);
            await this.customersRepository.save(session.customer);
        }

        // ثبت تراکنش مالی (برای همه روش‌ها ثبت می‌کنیم تا آمار دقیق باشد)
        if (payDto.isPaid) {
            const transaction = this.transactionsRepository.create({
                gameNetId: session.gameNetId,
                customerId: session.customerId, // اگر باشد
                amount: amount,
                type: TransactionType.USAGE,
                method: payDto.method,
                description: `تسویه بازی (دستگاه ${session.deviceId})`,
                registeredById: userId
            });
            await this.transactionsRepository.save(transaction);
        }

        // آپدیت وضعیت نشست
        session.isPaid = payDto.isPaid;
        session.paymentMethod = payDto.method;
        await this.sessionsRepository.save(session);

        return { success: true };
    }

    async getUnpaidSessions(gameNetId: string): Promise<GameSession[]> {
        return this.sessionsRepository.find({
            where: { gameNetId, isPaid: false, status: 'COMPLETED' },
            relations: ['customer', 'device'],
        });
    }

    private isTimeInRange(current: string, start: string, end: string): boolean {
        // فرمت: "23:00", "08:00"
        if (start <= end) {
            return current >= start && current < end;
        } else {
            // حالت عبور از نیمه شب (مثلاً 23:00 تا 02:00)
            return current >= start || current < end;
        }
    }
}
