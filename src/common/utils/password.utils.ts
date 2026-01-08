import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

/**
 * هش کردن رمز عبور با bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * ساخت هش MD5 (برای مقایسه با رمزهای قدیمی)
 */
export function md5Hash(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
}

/**
 * تشخیص نوع رمز ذخیره شده
 */
export function detectPasswordType(storedPassword: string): 'bcrypt' | 'md5' | 'plain' {
    // bcrypt همیشه با $2a$, $2b$, یا $2y$ شروع می‌شود و ۶۰ کاراکتر است
    if (storedPassword.startsWith('$2') && storedPassword.length === 60) {
        return 'bcrypt';
    }
    // MD5 همیشه ۳۲ کاراکتر hex است
    if (/^[a-f0-9]{32}$/i.test(storedPassword)) {
        return 'md5';
    }
    // هر چیز دیگری Plain Text است
    return 'plain';
}

/**
 * مقایسه رمز عبور - پشتیبانی از bcrypt، MD5 و Plain Text
 */
export async function comparePassword(
    inputPassword: string,
    storedPassword: string,
): Promise<boolean> {
    const passwordType = detectPasswordType(storedPassword);

    switch (passwordType) {
        case 'bcrypt':
            return bcrypt.compare(inputPassword, storedPassword);
        case 'md5':
            return md5Hash(inputPassword) === storedPassword;
        case 'plain':
            return inputPassword === storedPassword;
        default:
            return false;
    }
}
