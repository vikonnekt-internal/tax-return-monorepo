import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@tax/database';

import logger from '../logger';

import { DuplicateError } from './errors';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  };

  private errorCodesMessageMapping: { [key: string]: string } = {
    P2000: 'Bad request',
    P2002: 'Conflict',
    P2025: 'Not found',
  };
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    logger.error(exception.message, exception.code, exception.meta);
    let cause = exception.meta?.cause
      ? (exception.meta?.cause as string).split('(')[0]
      : '';
    const details = exception.meta?.cause
      ? JSON.stringify(exception.meta?.cause).replace(/\n/g, '')
      : '';
    // TODO: Run threw all changes.
    if (exception.code === 'P2002') {
      cause = `${
        exception.meta?.target ? exception.meta.target[0] : ''
      } already exists`;
    }
    switch (exception.code) {
      case 'P2002':
        // throw new HttpException(
        //   {
        //     message: `${this.errorCodesMessageMapping.P2002} Cause: ${cause}`,
        //     details,
        //   },
        //   this.errorCodesStatusMapping.P2002,
        throw new DuplicateError(
          `${exception?.meta?.target?.[0]}` || 'already exists',
        );
      case 'P2025':
        throw new HttpException(
          {
            message: `${this.errorCodesMessageMapping.P2025} Cause: ${cause}`,
            details,
          },
          this.errorCodesStatusMapping.P2025,
        );
      case 'P2000':
        throw new HttpException(
          { message: this.errorCodesMessageMapping.P2000, details },
          this.errorCodesStatusMapping.P2000,
        );

      default:
        // default 500 error code
        return exception;
    }
  }
}
