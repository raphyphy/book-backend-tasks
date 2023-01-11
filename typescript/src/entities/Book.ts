import { ObjectId } from "mongodb";

export class Book {
    private id: ObjectId;
    private title: string;
    private author: string;
    private year: Date;
    private isbn: string;

    constructor(id: ObjectId, title: string, author: string, year: Date, isbn: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
        this.isbn = isbn;
    }

    getId() {
        return this.id
    }
}

