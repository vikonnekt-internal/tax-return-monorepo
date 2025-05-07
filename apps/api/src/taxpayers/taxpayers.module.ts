import { Module } from '@nestjs/common';
import { TaxpayersRepository } from './taxpayers.repository';
import { TaxpayersService } from './taxpayers.service';
import { TaxpayersResolver } from './taxpayers.resolver';
import { DatabaseModule } from '@tax/database';
import PaginationService from '../common/pagination/pagination.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    TaxpayersRepository,
    TaxpayersService,
    TaxpayersResolver,
    PaginationService,
  ],
  exports: [TaxpayersService],
})
export class TaxpayersModule {}
