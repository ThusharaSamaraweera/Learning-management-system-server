import { FORBIDDEN, UNAUTHORIZED } from "../constants/constants";

export const apiResponse = {
  _200: (body: { [key: string]: any }) => {
    const data = { data: body };
    return {
      statusCode: 200,
      body: JSON.stringify(data, null, 2),
    };
  },
  //Created - send after POST or PUT
  _201: () => {
    return {
      statusCode: 201,
    };
  },
  //Success but no content - DELETE
  _204: () => {
    return {
      statusCode: 204,
    };
  },
  //Bad Request - API validations
  _400: (body: { [key: string]: any }) => {
    return {
      statusCode: 400,
      body: JSON.stringify(body, null, 2),
    };
  },
  _400E: (err: Error) => {
    const body = {
      errorMessage: err.message,
      error: err.name,
    };
    return {
      statusCode: 500,
      body: JSON.stringify(body, null, 2),
    };
  },
  //User login fails
  _401: (message = "", code = UNAUTHORIZED) => {
    const body = {
      errorMessage: message,
      error: code,
    };
    return {
      statusCode: 401,
      body: JSON.stringify(body, null, 2),
    };
  },
  //User is forbidden to perform the action
  _403: (err: Error) => {
    const body = {
      errorMessage: err.message,
      error: FORBIDDEN,
    };
    return {
      statusCode: 403,
      body: JSON.stringify(body, null, 2),
    };
  },
  //route or resource not found
  _404: (body: { [key: string]: any }) => {
    return {
      statusCode: 404,
      body: JSON.stringify(body, null, 2),
    };
  },
  //internal server errors/ catched exceptions
  _500: (err: Error) => {
    const body = {
      errorMessage: err.message,
      error: err.name,
    };
    return {
      statusCode: 500,
      body: JSON.stringify(body, null, 2),
    };
  },
};
