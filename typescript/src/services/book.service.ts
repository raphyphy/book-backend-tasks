import { injectable, inject } from 'inversify';
import { TYPES } from "../types";
import { IBookRepository } from '../repositories/book.repository';
import { BookCreateDTO } from '../dto/book.dto';
import { Book } from '../entities/Book';
import { ObjectId } from 'mongodb';
import { getValidObjectId } from '../utils';

export interface IBookService {
    createBook(data: BookCreateDTO): Promise<boolean>
}

/* Here are where custom logics should go. Aggregation, calculation, etc. */

@injectable()
export default class BookService implements IBookService {
    @inject(TYPES.BookRepository) private bookRepository: IBookRepository

    public async createBook(book: BookCreateDTO): Promise<boolean> {
        book = { ...book }
        const createBook: Book = new Book(
            getValidObjectId(book.id || new ObjectId()),
            book.title,
            book.author,
            book.year,
            book.isbn
        )
        const result = await this.bookRepository.create(createBook)
        return result;
    }
}