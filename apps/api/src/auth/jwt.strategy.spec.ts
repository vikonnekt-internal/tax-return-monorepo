import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { EnvService } from '../env-config/env.service';
import { UsersService } from '../users/users.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let usersService: jest.Mocked<UsersService>;
  let envService: jest.Mocked<EnvService>;

  beforeEach(async () => {
    const mockUsersService = {
      findUser: jest.fn(),
    };

    const mockEnvService = {
      jwtConfig: {
        secret: 'test-secret',
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: EnvService,
          useValue: mockEnvService,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    usersService = module.get(UsersService) as jest.Mocked<UsersService>;
    envService = module.get(EnvService) as jest.Mocked<EnvService>;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user from UserService', async () => {
      const payload = {
        id: 1,
        email: 'test@example.com',
      };

      const user = {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
      };

      usersService.findUser.mockResolvedValue(user as any);

      const result = await strategy.validate(payload);

      expect(usersService.findUser).toHaveBeenCalledWith(payload.id);
      expect(result).toEqual(user);
    });
  });
});
