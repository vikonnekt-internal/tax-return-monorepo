import { Module } from '@nestjs/common';
import { HousingLoansRepository } from './housing-loans.repository';
import { HousingLoansResolver } from './housing-loans.resolver';
import { HousingLoansService } from './housing-loans.service';
import { HousingLoansController } from './housing-loans.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [HousingLoansController],
  providers: [
    HousingLoansResolver,
    HousingLoansService,
    HousingLoansRepository,
  ],
  exports: [HousingLoansService],
})
export class HousingLoansModule {}
