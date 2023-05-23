import { Room } from "./room.interface";
import { User } from "./user.interface";

export interface Operation {
    id: number;
    customer: User;
    business: User;
    room: Room;
    start: Date;
    end: Date;
    cost: number;
    status: string;
    deleted: boolean;
}