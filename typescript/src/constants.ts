enum StaticStrings {
    INVALID_ID = 'Invalid book id',
    RESOURCE_NOT_FOUND = 'Resource not found!',
    METHOD_NOT_IMPLEMENTED = 'Method not implemented'
}

enum HttpStatusCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    METHOD_NOT_IMPLEMENTED = 501
}
  
export {
    StaticStrings,
    HttpStatusCode
}