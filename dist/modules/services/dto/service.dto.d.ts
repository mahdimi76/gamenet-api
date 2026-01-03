export declare class CreateServiceDto {
    name: string;
    price: number;
    gameNetId: string;
}
export declare class UpdateServiceDto {
    name?: string;
    price?: number;
}
export declare class AddSessionServiceDto {
    sessionId: string;
    serviceId: string;
    quantity?: number;
}
