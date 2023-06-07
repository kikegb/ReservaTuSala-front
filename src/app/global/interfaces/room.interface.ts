import { User } from "./user.interface";
import { Location } from "./location.interface";
import { Schedule } from "./schedule.interface";
import { Material } from "./material.interface";

export interface Room {
    id: number;
    business: User;
    location: Location;
    name: String;
    size: number;
    capacity: number;
    price: number;
    schedules: Schedule[];
    materials: Material[]
}