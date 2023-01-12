import { faker } from '@faker-js/faker';
import { logger } from "./helper";
import { ObjectId } from 'mongodb'
import { Book } from './entities/Book';
import sortArray from 'sort-array';
import { NotFoundError } from './errors/app.error';

/*
    Just my quirky way of creating my own database.
*/

class Database {
    private booksCol: Book[];
    private len;
  
    constructor(len?: number) {
      this.booksCol = []
      this.len = len || 10
    }

    public async connect(): Promise<void> {
      // Connects and populates the DB if INIT_DB envvar has been set
      if(process.env.INIT_DB?.toLowerCase() === 'true') {
          logger.info(`Populating books collection with faker books`)
          for (let i = 0; i < this.len; i++) {
            this.booksCol.push(new Book(
              new ObjectId(),
              `${faker.word.adjective()} ${faker.word.noun()}`,
              `${faker.name.fullName()}`,
              faker.date.past(),
              faker.datatype.uuid()
            ))
          }
          logger.info(`Populating done!`)
      }
      logger.info(`Connected to RaphyDB: insertURI here!`)
    }

    public async findOne(id: ObjectId): Promise<Book | {}> {
      const result = this.booksCol.find(i => i.getId().equals(id)) || {}
      return result
    }
  
    public async all(by: string = 'id', order: string = 'asc'): Promise<Book[]> {
      return sortArray(this.booksCol, { by, order })
    }
  
    public async add(bookObj : Book | any): Promise<boolean> {
      this.booksCol.push(bookObj)
      return true;
    }
  
    public async update(id: ObjectId, updateObj: Book | any): Promise<boolean> {
      const index : number  = this.booksCol.findIndex(i => i.getId().equals(id))
      updateObj['id'] = id
      if(index !== -1) {    
        const book = new Book(id, updateObj.title, updateObj.author, updateObj.year, updateObj.isbn)
        this.booksCol[index] = book
        return true
      } else {
        throw new NotFoundError();
      }
    }
  
    public async remove(id: ObjectId): Promise<boolean> {
      const prevLen = this.booksCol.length
      this.booksCol = this.booksCol.filter(i => !i.getId().equals(id)) // This is a shallow copy
      return prevLen > this.booksCol.length
    }
}

const db = new Database();
export default db;