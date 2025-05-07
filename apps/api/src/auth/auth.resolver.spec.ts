import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ResetPasswordInput } from './dto/reset-password.input';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(),
      resetPassword: jest.fn(),
      sendResetPasswordEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('loginAdmin', () => {
    it('should call authService.login with correct credentials', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const mockLoginResult = {
        token: { token: 'jwt-token', expiresIn: '30m' },
        data: {
          id: 1,
          email,
          role: 'admin',
          firstName: 'Test',
          lastName: 'User',
        },
      };

      authService.login.mockResolvedValue(mockLoginResult as any);

      const result = await resolver.loginAdmin(email, password);

      expect(authService.login).toHaveBeenCalledWith({ email, password });
      expect(result).toEqual(mockLoginResult);
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword and return true', async () => {
      const input: ResetPasswordInput = {
        token: 'reset-token',
        password: 'newPassword123',
      };

      const returnedUser = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
      };

      authService.resetPassword.mockResolvedValue(returnedUser as any);

      const result = await resolver.resetPassword(input);

      expect(authService.resetPassword).toHaveBeenCalledWith(input);
      expect(result).toBe(true);
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should call authService.sendResetPasswordEmail with email', async () => {
      const email = 'test@example.com';
      const mockResponse = 'Password reset email sent';

      authService.sendResetPasswordEmail.mockResolvedValue(mockResponse);

      const result = await resolver.sendResetPasswordEmail(email);

      expect(authService.sendResetPasswordEmail).toHaveBeenCalledWith(email);
      expect(result).toBe(mockResponse);
    });
  });
});
