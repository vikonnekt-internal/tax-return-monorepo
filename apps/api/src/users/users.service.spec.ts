import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Mock bcrypt module
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUsersRepository = {
    getOneWithPassword: jest.fn(),
    updateUser: jest.fn(),
    getOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw exception when user is not found', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue(null);

      await expect(
        service.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw exception when password is invalid', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        isActive: true,
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'wrong-password',
        }),
      ).rejects.toThrow(
        new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
      );
    });

    it('should throw exception when account is blocked', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        isActive: false,
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(
        service.login({ email: 'test@example.com', password: 'password' }),
      ).rejects.toThrow(
        new HttpException('Account blocked', HttpStatus.FORBIDDEN),
      );
    });

    it('should return user without password on successful login', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        isActive: true,
        firstName: 'Test',
        lastName: 'User',
      };

      mockUsersRepository.getOneWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password',
      });

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        isActive: true,
        firstName: 'Test',
        lastName: 'User',
      });
    });
  });

  describe('updateOne', () => {
    it('should throw exception when email is already in use', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue({
        id: 2,
        email: 'existing@example.com',
      });

      await expect(
        service.updateOne({ id: 1, email: 'existing@example.com' }),
      ).rejects.toThrow(
        new HttpException('Email already in use', HttpStatus.BAD_REQUEST),
      );
    });

    it('should update user successfully', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue(null);
      mockUsersRepository.updateUser.mockResolvedValue({
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      });

      const result = await service.updateOne({
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      });

      expect(result).toEqual({
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      });
    });
  });

  describe('findUser', () => {
    it('should throw exception when user is not found', async () => {
      mockUsersRepository.getOne.mockRejectedValue(new Error('User not found'));

      await expect(service.findUser(999)).rejects.toThrow();
    });

    it('should return user when found', async () => {
      const mockUser = {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '1234567890',
        role: 'USER',
        taxpayerId: 123,
      };

      mockUsersRepository.getOne.mockResolvedValue(mockUser);

      const result = await service.findUser(1);

      expect(result).toEqual(mockUser);
    });
  });

  describe('updatePassword', () => {
    it('should throw exception when user is not found', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue(null);

      await expect(
        service.updatePassword(999, 'oldPassword', 'newPassword'),
      ).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw exception when current password is incorrect', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue({
        id: 1,
        password: 'hashedOldPassword',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.updatePassword(1, 'wrongPassword', 'newPassword'),
      ).rejects.toThrow(
        new HttpException(
          'Current password is incorrect',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    });

    it('should update password successfully', async () => {
      mockUsersRepository.getOneWithPassword.mockResolvedValue({
        id: 1,
        password: 'hashedOldPassword',
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      mockUsersRepository.updateUser.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      });

      const result = await service.updatePassword(
        1,
        'oldPassword',
        'newPassword',
      );

      expect(bcrypt.hash).toHaveBeenCalledWith('newPassword', 10);
      expect(mockUsersRepository.updateUser).toHaveBeenCalledWith({
        id: 1,
        password: 'hashedPassword',
      });
      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
      });
    });
  });
});
