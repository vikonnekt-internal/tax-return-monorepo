import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { EnvService } from '../env-config/env.service';
import { LoginUserDto } from './dto/login-user.input';
import { ResetPasswordInput } from './dto/reset-password.input';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;
  let envService: jest.Mocked<EnvService>;

  beforeEach(async () => {
    const mockUsersService = {
      login: jest.fn(),
      findOneByResetToken: jest.fn(),
      findOneByEmailWithPassword: jest.fn(),
      updateOne: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const mockEnvService = {
      clientUrl: 'http://test.com',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: EnvService,
          useValue: mockEnvService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
    jwtService = module.get(JwtService) as jest.Mocked<JwtService>;
    envService = module.get(EnvService) as jest.Mocked<EnvService>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto: LoginUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        role: 'user',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetToken: null,
        resetTokenExpiry: null,
        verificationToken: null,
        verificationTokenDate: null,
        profilePic: null,
        password: 'hashed-password',
      };

      const token = {
        expiresIn: '30m',
        token: 'jwt-token',
      };

      usersService.login.mockResolvedValue(user as any);
      jwtService.sign.mockReturnValue('jwt-token');

      const result = await service.login(loginDto);

      expect(usersService.login).toHaveBeenCalledWith(loginDto);
      expect(jwtService.sign).toHaveBeenCalledWith(
        {
          id: user.id,
          email: user.email,
          role: [user.role],
        },
        { expiresIn: '30m' },
      );
      expect(result).toEqual({
        token,
        data: user,
      });
    });
  });

  describe('resetPassword', () => {
    it('should reset password for valid token', async () => {
      const resetInput: ResetPasswordInput = {
        token: 'valid-token',
        password: 'newPassword123',
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetToken: 'valid-token',
        resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour in the future
        verificationToken: null,
        verificationTokenDate: null,
        profilePic: null,
        password: 'hashed-password',
        role: 'user',
      };

      const returnedUser = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        profilePic: null,
        role: 'user',
        verificationTokenDate: null,
      };

      usersService.findOneByResetToken.mockResolvedValue(user as any);
      usersService.updateOne.mockResolvedValue(returnedUser as any);

      await service.resetPassword(resetInput);

      expect(usersService.findOneByResetToken).toHaveBeenCalledWith(
        resetInput.token,
      );
      expect(usersService.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({
          id: user.id,
          resetToken: null,
          resetTokenExpiry: null,
          password: expect.any(String),
        }),
      );
    });

    it('should throw error if reset token not found', async () => {
      const resetInput: ResetPasswordInput = {
        token: 'invalid-token',
        password: 'newPassword123',
      };

      usersService.findOneByResetToken.mockResolvedValue(null);

      await expect(service.resetPassword(resetInput)).rejects.toThrow(
        GraphQLError,
      );
      await expect(service.resetPassword(resetInput)).rejects.toThrow(
        'Password reset token expired',
      );
    });

    it('should throw error if reset token is expired', async () => {
      const resetInput: ResetPasswordInput = {
        token: 'expired-token',
        password: 'newPassword123',
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetToken: 'expired-token',
        resetTokenExpiry: new Date(Date.now() - 3600000), // 1 hour in the past
        verificationToken: null,
        verificationTokenDate: null,
        profilePic: null,
        password: 'hashed-password',
        role: 'user',
      };

      usersService.findOneByResetToken.mockResolvedValue(user as any);

      await expect(service.resetPassword(resetInput)).rejects.toThrow(
        GraphQLError,
      );
      await expect(service.resetPassword(resetInput)).rejects.toThrow(
        'Password reset token expired',
      );
    });
  });

  describe('sendResetPasswordEmail', () => {
    it('should send reset password email', async () => {
      const email = 'test@example.com';
      const user = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        resetToken: null,
        resetTokenExpiry: null,
        verificationToken: null,
        verificationTokenDate: null,
        profilePic: null,
        password: 'hashed-password',
        role: 'user',
      };

      const returnedUser = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        phone: null,
        taxpayerId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        profilePic: null,
        role: 'user',
        verificationTokenDate: null,
      };

      usersService.findOneByEmailWithPassword.mockResolvedValue(user as any);
      usersService.updateOne.mockResolvedValue(returnedUser as any);

      const result = await service.sendResetPasswordEmail(email);

      expect(usersService.findOneByEmailWithPassword).toHaveBeenCalledWith(
        email,
      );
      expect(usersService.updateOne).toHaveBeenCalledWith(
        expect.objectContaining({
          id: user.id,
          resetToken: expect.any(String),
          resetTokenExpiry: expect.any(Date),
        }),
      );
      expect(result).toBe('Password reset email sent');
    });

    it('should throw error if user not found', async () => {
      const email = 'nonexistent@example.com';

      usersService.findOneByEmailWithPassword.mockResolvedValue(null);

      await expect(service.sendResetPasswordEmail(email)).rejects.toThrow(
        GraphQLError,
      );
      await expect(service.sendResetPasswordEmail(email)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
