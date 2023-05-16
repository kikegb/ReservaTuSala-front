export interface Operation {
    id: number;
    start: Date;
    end: Date;
    cost: number;
    status: string;
    deleted: boolean;
}