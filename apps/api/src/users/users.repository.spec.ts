import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '@tax/database';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let databaseService: DatabaseService;

  const mockDatabaseService = {
    user: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getOneWithPassword', () => {
    it('should call prisma.user.findFirst with provided params', async () => {
      const params = { where: { email: 'test@example.com' } };
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      mockDatabaseService.user.findFirst.mockResolvedValue(mockUser);

      const result = await repository.getOneWithPassword(params);

      expect(mockDatabaseService.user.findFirst).toHaveBeenCalledWith(params);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should call prisma.user.update with correct parameters', async () => {
      const userData = {
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      };

      mockDatabaseService.user.update.mockResolvedValue({
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      });

      const result = await repository.updateUser(userData);

      expect(mockDatabaseService.user.update).toHaveBeenCalledWith({
        where: { id: userData.id },
        data: userData,
      });

      expect(result).toEqual({
        id: 1,
        email: 'updated@example.com',
        firstName: 'Updated',
      });
    });
  });

  describe('getOne', () => {
    it('should call prisma.user.findFirst with correct parameters', async () => {
      const params = {
        where: { id: 1 },
        select: {
          id: true,
          email: true,
        },
      };

      const mockUser = { id: 1, email: 'test@example.com' };

      mockDatabaseService.user.findFirst.mockResolvedValue(mockUser);

      const result = await repository.getOne(params);

      expect(mockDatabaseService.user.findFirst).toHaveBeenCalledWith({
        where: params.where,
        select: params.select,
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw error when user is not found', async () => {
      const params = {
        where: { id: 999 },
        select: {
          id: true,
          email: true,
        },
      };

      mockDatabaseService.user.findFirst.mockResolvedValue(null);

      await expect(repository.getOne(params)).rejects.toThrow('User not found');
    });
  });
});
