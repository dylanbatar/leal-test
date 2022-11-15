import { Request, Response } from 'express';
import { Controller } from '../../../application/ports/controller';
import { HttpRequest } from '../../../application/ports/http';

export const adapterRouterJson = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const HttpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const httpResponse = await controller.handle(HttpRequest);
    res.status(httpResponse.statusCode).json({ data: httpResponse.body });
  };
};
