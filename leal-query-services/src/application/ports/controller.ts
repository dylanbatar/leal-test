import { HttpRequest, httpResponse } from './http';

export interface Controller {
  handle(req: HttpRequest): Promise<httpResponse>;
}
