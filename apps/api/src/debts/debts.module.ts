import { Module } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { DebtsController } from './debts.controller';
import { DebtsResolver } from './debts.resolver';
import { DebtsRepository } from './debts.repository';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [DebtsController],
  providers: [DebtsResolver, DebtsService, DebtsRepository],
  exports: [DebtsService],
})
export class DebtsModule {}
