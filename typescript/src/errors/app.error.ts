import { HttpStatusCode, StaticStrings } from "../constants";

export class CustomError extends Error {
  public readonly httpStatusCode: number;
  public readonly message: string;

  constructor(httpStatusCode: HttpStatusCode, message: string, ...args: any) {
    super(...args);
    Object.setPrototypeOf(this, CustomError.prototype); // should be done whenever a built-in class is extended https://bobbyhadz.com/blog/typescript-extend-error-class

    this.httpStatusCode = httpStatusCode;
    this.message = message
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON() {
    return {
      code: this.httpStatusCode,
      errorType: this.name,
      message: this.message
    };
  }
}

export class NotFoundError extends CustomError {
  constructor() {
    super(HttpStatusCode.NOT_FOUND, StaticStrings.RESOURCE_NOT_FOUND, arguments);
  }
}

export class BadRequestError extends CustomError{
  constructor(message: string, ...args: any) {
    super(HttpStatusCode.BAD_REQUEST, message, ...args)
  }
}

/* TODO: Get current request context maybe (?) so you can display it like 'Method not implemented: GET /books/:bookId' */
export class MethodNotImplemented extends CustomError {
  constructor() {
    super(HttpStatusCode.METHOD_NOT_IMPLEMENTED, StaticStrings.METHOD_NOT_IMPLEMENTED, arguments)
  }
}

export class InvalidIdError extends BadRequestError {
  constructor(...args: any) {
    super(StaticStrings.INVALID_ID, ...args);
  }
}

