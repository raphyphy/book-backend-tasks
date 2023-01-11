import { Container } from 'inversify';
import { TYPES } from './types';
import BookRepository, { IBookRepository } from './repositories/book.repository';
import BookService, { IBookService } from './services/book.service';
import BookController from './controllers/book.controller';

/*
    By default, the app is set to singleton scope such that after the first initialization of the binded objects through the first request, 
    this will last until the entire life cycle of the container. This is what we need for our APIs since we dont intend to create new 
    instances of controllers, repositories, services, etc.
    If needed, this can be unbinded manually through container.unbind or by setting the scope to transient or request
    Source: InversifyJS documentation: https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md
*/

const container = new Container({ defaultScope: 'Singleton' });

/* 
    DI Always remember: Depend on abstractions not concretions. Hence binding the abstractions of the actual concrete class.
    Note that for controllers, it will (and should never be) implemented since it will only serve 1 purpose in its entire lifecycle.
*/
container.bind(BookController).to(BookController);
container.bind<IBookRepository>(TYPES.BookRepository).to(BookRepository);
container.bind<IBookService>(TYPES.BookService).to(BookService);

export default container;