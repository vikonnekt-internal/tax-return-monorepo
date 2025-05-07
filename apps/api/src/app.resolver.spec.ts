import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';

describe('AppResolver', () => {
  let resolver: AppResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppResolver],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('sayHello', () => {
    it('should return "Hello from GraphQL!"', () => {
      expect(resolver.sayHello()).toBe('Hello from GraphQL!');
    });
  });
});
