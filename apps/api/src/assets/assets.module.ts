import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { AssetsResolver } from './assets.resolver';
import { AssetsRepository } from './assets.repository';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [AssetsController],
  providers: [AssetsResolver, AssetsService, AssetsRepository],
  exports: [AssetsService],
})
export class AssetsModule {}
