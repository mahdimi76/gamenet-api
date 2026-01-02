import { User } from '../../users/entities/user.entity';
export declare class GameNet {
    id: string;
    name: string;
    isActive: boolean;
    dataDeletionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    users: User[];
}
