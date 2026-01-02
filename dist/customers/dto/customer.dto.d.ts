export declare class CreateCustomerDto {
    name: string;
    phoneNumber: string;
    email?: string;
    birthDate?: string;
    gameNetId: string;
}
export declare class UpdateCustomerDto {
    name?: string;
    phoneNumber?: string;
    email?: string;
    birthDate?: string;
    balance?: number;
}
