import { Module } from '@nestjs/common';
import { OtherDebtsRepository } from './other-debts.repository';
import { OtherDebtsResolver } from './other-debts.resolver';
import { OtherDebtsService } from './other-debts.service';
import { OtherDebtsController } from './other-debts.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [OtherDebtsController],
  providers: [OtherDebtsResolver, OtherDebtsService, OtherDebtsRepository],
  exports: [OtherDebtsService],
})
export class OtherDebtsModule {}
