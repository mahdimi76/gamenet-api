export declare class CreateProductDto {
    name: string;
    buyPrice: number;
    sellPrice: number;
    stock?: number;
    gameNetId: string;
}
export declare class UpdateProductDto {
    name?: string;
    buyPrice?: number;
    sellPrice?: number;
    stock?: number;
}
