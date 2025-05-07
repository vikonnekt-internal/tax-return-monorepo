import { Module } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';
import { BenefitsResolver } from './benefits.resolver';
import { BenefitsService } from './benefits.service';
import { DatabaseModule } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    BenefitsService,
    BenefitsRepository,
    BenefitsResolver,
    PaginationService,
  ],
  exports: [BenefitsService],
})
export class BenefitsModule {}
