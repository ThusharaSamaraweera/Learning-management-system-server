import { FORBIDDEN, UNAUTHORIZED } from "../constants/logConstants";

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
};
