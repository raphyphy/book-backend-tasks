import { ObjectId } from "mongodb";

/*
  Interface for entire db. If read or write only is needed, it can be found on IRead and IWrite
*/
export interface IRepository<T> {
    create(item: T): Promise<boolean>;
    findOne(id: string | ObjectId): Promise<T>;
    find(by?: string, order?: string): Promise<T[]>;
    delete(id: string | ObjectId): Promise<boolean>;
    update(id: string | ObjectId, item: T): Promise<boolean>;
}