import { Module } from '@nestjs/common';
import { TaxReportsService } from './tax-reports.service';
import { TaxReportsResolver } from './tax-reports.resolver';
import { TaxReportsRepository } from './tax-reports.repository';
import { TaxReportsController } from './tax-reports.controller';
import { GovDataController } from './gov-data.controller';
import { DatabaseService } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    TaxReportsService,
    TaxReportsResolver,
    TaxReportsRepository,
    DatabaseService,
    PaginationService,
  ],
  controllers: [TaxReportsController, GovDataController],
  exports: [TaxReportsService],
})
export class TaxReportsModule {}
