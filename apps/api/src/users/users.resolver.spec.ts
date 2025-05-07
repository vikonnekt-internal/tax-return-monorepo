// Mock modules before importing
jest.mock(
  '../auth/current-user.decorator',
  () => ({
    CurrentUser: () => jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  '../auth/jwt-auth.guard',
  () => ({
    JwtAuthGuard: jest.fn().mockImplementation(() => ({
      canActivate: jest.fn().mockReturnValue(true),
    })),
  }),
  { virtual: true },
);

jest.mock(
  '../auth/role.guard',
  () => ({
    RolesGuard: jest.fn().mockImplementation(() => ({
      canActivate: jest.fn().mockReturnValue(true),
    })),
  }),
  { virtual: true },
);

jest.mock(
  'src/auth/current-user.decorator',
  () => ({
    CurrentUser: () => jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  'src/auth/jwt-auth.guard',
  () => ({
    JwtAuthGuard: jest.fn().mockImplementation(() => ({
      canActivate: jest.fn().mockReturnValue(true),
    })),
  }),
  { virtual: true },
);

jest.mock(
  'src/auth/role.guard',
  () => ({
    RolesGuard: jest.fn().mockImplementation(() => ({
      canActivate: jest.fn().mockReturnValue(true),
    })),
  }),
  { virtual: true },
);

jest.mock(
  'src/auth/entities/user-entities',
  () => ({
    UserEntity: class MockUserEntity {
      id!: number;
      firstName!: string;
      lastName!: string;
      email!: string;
      taxpayerId!: string;
    },
  }),
  { virtual: true },
);

import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  const mockUsersService = {
    findUser: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('whoAmI', () => {
    it('should return the current user', async () => {
      const mockUser = {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '1234567890',
        taxpayerId: '123',
      };

      mockUsersService.findUser.mockResolvedValue(mockUser);

      const result = await resolver.whoAmI({
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        taxpayerId: '123',
      });

      expect(mockUsersService.findUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });
});
