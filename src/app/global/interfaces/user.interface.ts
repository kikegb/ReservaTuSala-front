import { Operation } from "./operation.interface";

export interface User {
    id: number;
    cnif: string;
    name: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    businessOperations: Operation[],
    customerOperations: Operation[]
}