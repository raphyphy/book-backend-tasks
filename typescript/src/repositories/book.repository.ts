import { injectable } from 'inversify';
import { BaseRepository } from './base/BaseRepository';
import { Book } from '../entities/Book';
import { ObjectId } from 'mongodb';

export interface IRepository<T> {
    /**
      * Get documents from collection.
    */
    create(item: T): Promise<boolean>;
    findOne(id: string | ObjectId): Promise<T>;
    find(by?: string, order?: string): Promise<T[]>;
    delete(id: string | ObjectId): Promise<boolean>;
    update(id: string | ObjectId, item: T): Promise<boolean>;
}

export interface IBookRepository extends IRepository<Book> { }

@injectable()
export default class BookRepository extends BaseRepository<Book> implements IBookRepository { }