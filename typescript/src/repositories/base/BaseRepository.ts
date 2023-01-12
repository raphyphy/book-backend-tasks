import { IWrite, IRead, IRepository } from "../interfaces";
import DB from "../../database";
import { injectable } from "inversify";
import { ObjectId } from "mongodb";
import { getValidObjectId } from "../../utils";

@injectable()
export abstract class BaseRepository<T> implements IRepository<T> {
    public readonly dbContext: typeof DB;
    
    // You can dynamically change DB instance here so you can switch between databases
    constructor() {
        this.dbContext = DB
    }

    async create(item: T): Promise<boolean> {
        const result = await this.dbContext.add(item)
        return result
    }
    async update(id: string | ObjectId, item: T): Promise<boolean> {
        const result = await this.dbContext.update(getValidObjectId(id), item);
        return result;
    }
    async delete(id: string | ObjectId): Promise<boolean> {
        const result = await this.dbContext.remove(getValidObjectId(id))
        return result
    }
    async find(by?: string, order?: string): Promise<T[]> {
        const results = await this.dbContext.all(by, order);
        return results as T[];
    }
    async findOne(id: string | ObjectId): Promise<T> {
        const result = await this.dbContext.findOne(getValidObjectId(id))
        return result as T
    }
}