export declare class OrderItemDto {
    productId: string;
    quantity: number;
    buyPriceSnapshot: number;
    sellPriceSnapshot: number;
    totalPrice?: number;
}
export declare class CreateOrderDto {
    gameNetId: string;
    soldById: string;
    customerId?: string;
    gameSessionId?: string;
    items: OrderItemDto[];
}
