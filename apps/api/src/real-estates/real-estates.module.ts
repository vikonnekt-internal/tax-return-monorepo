import { Module } from '@nestjs/common';
import { RealEstatesRepository } from './real-estates.repository';
import { RealEstatesResolver } from './real-estates.resolver';
import { RealEstatesService } from './real-estates.service';
import { RealEstatesController } from './real-estates.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [RealEstatesController],
  providers: [RealEstatesResolver, RealEstatesService, RealEstatesRepository],
  exports: [RealEstatesService],
})
export class RealEstatesModule {}
