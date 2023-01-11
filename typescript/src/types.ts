/*
    Only specific to InversifyJS to be able to bind to containers using specific symbolic references.
*/

export const TYPES = {
    BookService: Symbol('BookService'),
    BookController: Symbol('BookController'),
    BookRepository: Symbol('BookRepository')
}