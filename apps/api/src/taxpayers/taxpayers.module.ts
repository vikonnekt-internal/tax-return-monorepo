import { Module } from '@nestjs/common';
import { TaxpayersRepository } from './taxpayers.repository';
import { TaxpayersResolver } from './taxpayers.resolver';
import { TaxpayersService } from './taxpayers.service';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  providers: [TaxpayersResolver, TaxpayersService, TaxpayersRepository],
  exports: [TaxpayersService],
})
export class TaxpayersModule {}
