import { User } from "./user.interface";
import { Location } from "./location.interface";

export interface Room {
    id: number;
    business: User;
    location: Location;
    name: String;
    size: number;
    capacity: number;
    price: number;
}