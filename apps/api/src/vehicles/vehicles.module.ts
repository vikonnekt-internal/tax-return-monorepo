import { Module } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { VehiclesResolver } from './vehicles.resolver';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { DatabaseModule } from '@tax/database';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiclesController],
  providers: [VehiclesResolver, VehiclesService, VehiclesRepository],
  exports: [VehiclesService],
})
export class VehiclesModule {}
