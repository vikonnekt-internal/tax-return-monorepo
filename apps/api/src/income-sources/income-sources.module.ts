import { Module } from '@nestjs/common';
import { IncomeSourcesRepository } from './income-sources.repository';
import { IncomeSourcesResolver } from './income-sources.resolver';
import { IncomeSourcesService } from './income-sources.service';
import { IncomeSourcesController } from './income-sources.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomeSourcesController],
  providers: [
    IncomeSourcesResolver,
    IncomeSourcesService,
    IncomeSourcesRepository,
  ],
  exports: [IncomeSourcesService],
})
export class IncomeSourcesModule {}
