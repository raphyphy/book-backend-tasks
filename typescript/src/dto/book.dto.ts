import { ObjectId } from "mongodb";

export interface BookCreateDTO {
    id?: ObjectId;
    title: string;
    author: string;
    year: Date;
    isbn: string;
}