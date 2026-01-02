import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(product);
    }

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findByGameNet(gameNetId: string): Promise<Product[]> {
        return this.productsRepository.find({ where: { gameNetId } });
    }

    async findOne(id: string): Promise<Product | null> {
        return this.productsRepository.findOne({ where: { id } });
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        await this.productsRepository.update(id, updateProductDto);
        return this.findOne(id);
    }

    async updateStock(id: string, quantity: number): Promise<Product | null> {
        const product = await this.findOne(id);
        if (product) {
            product.stock += quantity;
            return this.productsRepository.save(product);
        }
        return null;
    }

    async remove(id: string): Promise<void> {
        await this.productsRepository.delete(id);
    }
}
