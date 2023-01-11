import { Application } from 'express';
import container from './inversify';
import BookController from './controllers/book.controller';
import { toAsync } from './utils';

/*
  Establishing routes and middlewares per route. Any custom middleware can easily be pushed under []
*/
export default function (app: Application) {
  const BookControllerInstance = container.get<BookController>(BookController);

  app.delete('/api/books/:id', [], toAsync(BookControllerInstance.remove.bind(BookControllerInstance)));
  app.get('/api/books', [], toAsync(BookControllerInstance.list.bind(BookControllerInstance)));
  app.get('/api/books/:id', [], toAsync(BookControllerInstance.get.bind(BookControllerInstance)));
  app.post('/api/books', [], toAsync(BookControllerInstance.create.bind(BookControllerInstance)));
  app.put('/api/books/:id', [], toAsync(BookControllerInstance.update.bind(BookControllerInstance)))

}