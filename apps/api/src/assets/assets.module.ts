import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetsResolver } from './assets.resolver';
import { AssetsRepository } from './assets.repository';
import { DatabaseModule } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AssetsController],
  providers: [
    AssetsService,
    AssetsResolver,
    AssetsRepository,
    PaginationService,
  ],
  exports: [AssetsService],
})
export class AssetsModule {}
