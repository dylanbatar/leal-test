import { httpResponse } from '../ports/http';

export const BadRequest = (error: Error) => ({
  statusCode: 400,
  body: error.message || error
});

export const ServerError = (reason: string | Error) => ({
  statusCode: 500,
  body: reason
});

export function SuccessRequest<T>(data: T) {
  return {
    statusCode: 200,
    body: data
  };
}
