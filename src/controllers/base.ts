import { Request, Response, Send } from 'express';

export namespace Controller {
  export abstract class BaseController {
    abstract handle(request: Request, response: Response): Promise<any>;

    protected getComingBaseUrl(request: Request) {
      return `${request.protocol}://${request.hostname}:3333`;
    }
  }
}
