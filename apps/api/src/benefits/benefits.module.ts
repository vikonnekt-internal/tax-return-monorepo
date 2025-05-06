import { Module } from '@nestjs/common';
import { BenefitsRepository } from './benefits.repository';
import { BenefitsResolver } from './benefits.resolver';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [BenefitsController],
  providers: [BenefitsResolver, BenefitsService, BenefitsRepository],
  exports: [BenefitsService],
})
export class BenefitsModule {}
