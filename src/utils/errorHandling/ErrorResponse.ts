export class BaseError extends Error {
  message: string;
  httpCode: number;
  isOperational: boolean;
  description: string;

  constructor(message: string, httpCode: number, description: string, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.description = description;

    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends BaseError {
  constructor(message: string = "Bad request", description: any) {
    super(message, 400, description, true);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized", description: any) {
    super(message, 401, description, true);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden", description: any) {
    super(message, 403, description, true);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string = "Not Found", description: any) {
    super(message, 404, description, true);
  }
}

export class ServerError extends BaseError {
  constructor(message: string = "Internal server Error", description: any) {
    super(message, 500, description, true);
  }
}

export class DBError extends BaseError {
  constructor(message: string = "Database Error", description: any) {
    super(message, 500, description, true);
  }
}
