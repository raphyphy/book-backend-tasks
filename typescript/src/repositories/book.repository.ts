import { injectable } from 'inversify';
import { BaseRepository } from './base/BaseRepository';
import { Book } from '../entities/Book';
import { ObjectId } from 'mongodb';
import { IRepository } from './interfaces';

export interface IBookRepository extends IRepository<Book> { }

@injectable()
export default class BookRepository extends BaseRepository<Book> implements IBookRepository { }