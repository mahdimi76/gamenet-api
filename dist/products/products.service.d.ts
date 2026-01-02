import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByGameNet(gameNetId: string): Promise<Product[]>;
    findOne(id: string): Promise<Product | null>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null>;
    updateStock(id: string, quantity: number): Promise<Product | null>;
    remove(id: string): Promise<void>;
}
