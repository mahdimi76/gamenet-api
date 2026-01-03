export declare class CreateDeviceDto {
    name: string;
    type: string;
    hourlyRate?: number;
    extraRate?: number;
    gameNetId: string;
}
export declare class UpdateDeviceDto {
    name?: string;
    type?: string;
    hourlyRate?: number;
    extraRate?: number;
    status?: string;
}
