import { Module } from '@nestjs/common';
import { TaxReportsService } from './tax-reports.service';
import { TaxReportsResolver } from './tax-reports.resolver';
import { TaxReportsRepository } from './tax-reports.repository';
import { TaxReportsController } from './tax-reports.controller';
import { DatabaseService } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';

@Module({
  providers: [
    TaxReportsService,
    TaxReportsResolver,
    TaxReportsRepository,
    DatabaseService,
    PaginationService,
  ],
  controllers: [TaxReportsController],
  exports: [TaxReportsService],
})
export class TaxReportsModule {}
