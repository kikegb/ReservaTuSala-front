import { Operation } from "./operation.interface";
import { Room } from "./room.interface";

export interface User {
    id: number;
    cnif: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    rooms: Room[];
    businessOperations: Operation[],
    customerOperations: Operation[]
}