declare module "micromq" {
  import { RequestHandler } from "express";

  interface MicroServiceOptions {
    name: string;
    rabbit: {
      url: string;
    };
  }

  interface Request {
    params: Record<string, string>;
    query: Record<string, string>;
    body: any;
  }

  interface Response {
    json: (data: any) => void;
    status: (code: number) => Response;
  }

  class MicroService {
    constructor(options: MicroServiceOptions);
    get(path: string, handler: RequestHandler): void;
    post(path: string, handler: RequestHandler): void;
    put(path: string, handler: RequestHandler): void;
    delete(path: string, handler: RequestHandler): void;
    start(): Promise<void>;
  }

  export = MicroService;
}
