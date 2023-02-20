import { FORBIDDEN, UNAUTHORIZED } from "../constants/logConstants";

export const apiResponse = {
  _200: (body: { [key: string]: any }) => {
    const data = body;
    return {
      statusCode: 200,
      data,
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
};
