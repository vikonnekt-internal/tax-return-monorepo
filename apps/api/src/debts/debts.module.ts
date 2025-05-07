import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { DebtsResolver } from './debts.resolver';
import { DebtsRepository } from './debts.repository';
import { DatabaseModule } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtsController],
  providers: [DebtsService, DebtsResolver, DebtsRepository, PaginationService],
  exports: [DebtsService],
})
export class DebtsModule {}
