// read-only related interface
export interface IRead<T> {
    find(by?: string, order?: string): Promise<T[]>;
    findOne(id: string): Promise<T>;
}