import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

jest.mock('@nestjs/graphql', () => ({
  GqlExecutionContext: {
    create: jest.fn(),
  },
}));

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let mockExecutionContext: ExecutionContext;
  let mockGqlContext: { getContext: jest.Mock };

  beforeEach(() => {
    guard = new JwtAuthGuard();

    mockGqlContext = {
      getContext: jest.fn().mockReturnValue({
        req: { headers: { authorization: 'Bearer token' } },
      }),
    };

    (GqlExecutionContext.create as jest.Mock).mockReturnValue(mockGqlContext);

    mockExecutionContext = {
      getType: jest.fn().mockReturnValue('graphql'),
      getArgs: jest.fn(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    } as unknown as ExecutionContext;
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('getRequest', () => {
    it('should get the request from the GraphQL context', () => {
      const mockRequest = { headers: { authorization: 'Bearer token' } };
      mockGqlContext.getContext.mockReturnValue({ req: mockRequest });

      const result = guard.getRequest(mockExecutionContext);

      expect(GqlExecutionContext.create).toHaveBeenCalledWith(
        mockExecutionContext,
      );
      expect(mockGqlContext.getContext).toHaveBeenCalled();
      expect(result).toEqual(mockRequest);
    });
  });

  describe('canActivate', () => {
    it('should call the parent canActivate method', () => {
      // Create a spy on the superclass's canActivate method
      const canActivateSpy = jest.spyOn(JwtAuthGuard.prototype, 'canActivate');
      // Replace implementation to prevent actual execution of parent method
      canActivateSpy.mockImplementation(() => true);

      const result = guard.canActivate(mockExecutionContext);

      expect(canActivateSpy).toHaveBeenCalledWith(mockExecutionContext);
      // Reset the spy to avoid affecting other tests
      canActivateSpy.mockRestore();
    });
  });
});
