import Joi from "joi";
import { BadRequestError } from "../utils/errorHandling/ErrorResponse";
import { logger, Logger } from "../utils/logger/logger";

export function validate(schema: any, data: any) {
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { value, error } = schema.validate(data, options);

  if (error) {
    logger.error({ message: error.details });
    throw new BadRequestError(undefined, error.details);
  }

  return value;
}
