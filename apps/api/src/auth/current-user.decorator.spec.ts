import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CurrentUser } from './current-user.decorator';

describe('CurrentUser', () => {
  let mockExecutionContext: ExecutionContext;

  beforeEach(() => {
    jest.clearAllMocks();

    mockExecutionContext = {
      getType: jest.fn(),
      getArgs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    } as unknown as ExecutionContext;
  });

  it('should get CurrentUser decorator', () => {
    // Just test that the decorator is defined
    expect(CurrentUser).toBeDefined();
  });
});
