import { apiResponse } from "./apiResponse";
import { Logger } from "./logger/logger";

export class ApplicationError extends Error {
  constructor(message: string = "") {
    super("APPLICATION_ERROR");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "Application Server Error";
  }
}

export class ResourceNotFoundError extends Error {
  constructor(message: string = "") {
    super("RESOURCE_NOT_FOUND_ERROR");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "Resource Not Found";
  }
}

export class BadRequestError extends Error {
  constructor(message: string = "") {
    super("BAD_REQUEST");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "Bad Request";
  }
}

export class UnAuthorizedError extends Error {
  constructor(message: string = "") {
    super("UNAUTHORIZED");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "UnAuthorized";
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "") {
    super("DATABASE_ERROR");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "Request failed due to database error";
  }
}

export class CustomUIError extends Error {
  constructor(message: string = "") {
    super("CUSTOM_UI_ERROR");
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message ?? "Custom UI Error";
  }
}

export const sendErrorResponse = (
  err: Error,
  logger: Logger,
  message: string
) => {
  if (err instanceof ApplicationError) {
    return apiResponse._500(err);
  } else if (err instanceof BadRequestError) {
    return apiResponse._400E(err);
  } else if (err instanceof UnAuthorizedError) {
    return apiResponse._403(err);
  } else if (err instanceof CustomUIError) {
    return apiResponse._500(err);
  } else {
    logger.error(err);
    return apiResponse._500(new ApplicationError(message));
  }
};
