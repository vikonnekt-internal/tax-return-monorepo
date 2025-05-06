import { TestingModuleBuilder } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

import { DatabaseService } from '../database.service';

export * from './seed';

export type DatabaseServiceTesting = DeepMockProxy<PrismaClient>;

export function overrideDatabaseProvider(
  testingProvider: TestingModuleBuilder,
) {
  return testingProvider
    .overrideProvider(DatabaseService)
    .useValue(mockDeep<PrismaClient>());
}
