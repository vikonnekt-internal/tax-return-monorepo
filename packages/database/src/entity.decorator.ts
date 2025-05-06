import { SetMetadata } from '@nestjs/common';

import { PrismaModelName } from './database.types';

export const Entity = (modelName: PrismaModelName) =>
  SetMetadata('entity', modelName);
