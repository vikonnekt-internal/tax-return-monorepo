import { Module } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';

import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  providers: [VehiclesResolver, VehiclesService, VehiclesRepository],
  exports: [VehiclesService],
})
export class VehiclesModule {}
