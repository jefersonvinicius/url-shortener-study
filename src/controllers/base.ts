import { Request } from "express";

export namespace Controller {
  export type Response = {
    statusCode: number;
    body?: any;
  };

  export interface Controller {
    handle(request: Request): Promise<Response>;
  }
}
