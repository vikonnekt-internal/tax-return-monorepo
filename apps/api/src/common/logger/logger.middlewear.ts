import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      token: req.headers['authorization'],
      operation: req.body?.operationName,
    });
    next();
  }
}
