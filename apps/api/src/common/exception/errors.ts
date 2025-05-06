import { HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';

export enum ErrorCode {
  FORBIDDEN = 'FORBIDDEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_FIELD = 'MISSING_FIELD',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE = 'DUPLICATE',
  RATE_LIMIT = 'RATE_LIMIT',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  INVALID_INPUT_FORMAT = 'INVALID_INPUT_FORMAT',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  UNSUPPORTED_OPERATION = 'UNSUPPORTED_OPERATION',
  CUSTOM_ERROR = 'CUSTOM_ERROR_MESSAGE',
  PLAN_PERMISSION_DENIED = 'PLAN_PERMISSION_DENIED',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

export class CustomError extends GraphQLError {
  constructor(message: string, code: ErrorCode, statusCode: HttpStatus) {
    super(message, {
      extensions: { code, statusCode },
    });
  }
}

export class PermissionDeniedError extends CustomError {
  constructor(message = 'Permission denied.') {
    super(message, ErrorCode.PERMISSION_DENIED, HttpStatus.FORBIDDEN);
  }
}

export class PlanPermissionDeniedError extends CustomError {
  constructor(message = 'You need to upgrade to access this feature.') {
    super(message, ErrorCode.PLAN_PERMISSION_DENIED, HttpStatus.FORBIDDEN);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'You are not authorized to perform this action.') {
    super(message, ErrorCode.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized access. Please log in.') {
    super(message, ErrorCode.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation error occurred.') {
    super(message, ErrorCode.VALIDATION_ERROR, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}

export class MissingFieldError extends CustomError {
  constructor(fieldName: string) {
    super(
      `The required field '${fieldName}' is missing.`,
      ErrorCode.MISSING_FIELD,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NotFoundError extends CustomError {
  constructor(resource: string) {
    super(
      `The requested ${resource} was not found.`,
      ErrorCode.NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}

export class DuplicateError extends CustomError {
  constructor(resource: string) {
    super(
      `${resource} already exists.`,
      ErrorCode.DUPLICATE,
      HttpStatus.CONFLICT,
    );
  }
}

export class RateLimitError extends CustomError {
  constructor(message = 'Rate limit exceeded.') {
    super(message, ErrorCode.RATE_LIMIT, HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class InternalServerError extends CustomError {
  constructor(message = 'Internal server error.') {
    super(
      message,
      ErrorCode.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class InsufficientFundsError extends CustomError {
  constructor() {
    super(
      'Insufficient funds to perform this operation.',
      ErrorCode.INSUFFICIENT_FUNDS,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidInputFormatError extends CustomError {
  constructor() {
    super(
      'Invalid input format.',
      ErrorCode.INVALID_INPUT_FORMAT,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class ExternalServiceError extends CustomError {
  constructor(serviceName: string, details: string) {
    super(
      `Error while interacting with ${serviceName}: ${details}`,
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      HttpStatus.BAD_GATEWAY,
    );
  }
}

export class UnsupportedOperationError extends CustomError {
  constructor(operation: string) {
    super(
      `Unsupported operation: ${operation}`,
      ErrorCode.UNSUPPORTED_OPERATION,
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
