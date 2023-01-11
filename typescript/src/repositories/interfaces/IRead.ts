import { ObjectId } from "mongodb";

export interface IRead<T> {
    find(by?: string, order?: string): Promise<T[]>;
    findOne(id: string): Promise<T>;
}