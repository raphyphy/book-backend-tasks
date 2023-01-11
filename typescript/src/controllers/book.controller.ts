import { Request, Response } from 'express'
import { injectable, inject } from 'inversify';
import { IBookRepository } from '../repositories/book.repository';
import { TYPES } from '../types';
import { IBookService } from '../services/book.service';
import { BookCreateDTO } from '../dto/book.dto';

/*
 * Controller should only be responsible in validating input data from requests, pass these info to repositories or services, and route them to response
 * Generic catch for error handling should ideally be handled here as well. However, the code is written in such a way that you can throw an error anywhere
 * and it will still be caught under error middleware! :D
*/
@injectable()
export default class BookController {
    /* 
        Rule of thumb: 
        if it's simple, direct crud, directly connect to repository;
        if it's complex, create the business logic to service
        We can choose to purely isolate controller to only communicate to service. While this is to keep architectural integrity, 
        keep in mind that this is not always efficient. A very good example would be the additional latency when passing data 
            controllers -> service (additional overhead) -> repository -> db
            vs
            controllers -> repository -> db
        Decision is always on a case-to-case basis but if gearing for extra performance upgrade consider this!
    */
    @inject(TYPES.BookRepository) private bookRepository: IBookRepository;
    @inject(TYPES.BookService) private bookService: IBookService

    public async get(req: Request, res: Response): Promise<void> {
        const book = await this.bookRepository.findOne(req.params.id);
        res.json(book);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const by : string | any = req.query?.by || undefined
        const order : string | any = req.query?.order || undefined
        const books = await this.bookRepository.find(by, order)
        res.json({ books })
    }

    public async create(req: Request, res: Response): Promise<void> {
        // TODO: Missing field errors
        const createBook: BookCreateDTO = { ...req.body }
        const result = await this.bookService.createBook(createBook)
        res.status(201).json({ created: result })
    }
    
    public async remove(req: Request, res: Response): Promise<void> {
        const result = await this.bookRepository.delete(req.params.id)
        res.status(204).json({ deleted: result })
    }

    public async update(req: Request, res: Response): Promise<void> {
        const result = await this.bookRepository.update(req.params.id, req.body);
        res.status(204).json({ updated: result })
    }
}