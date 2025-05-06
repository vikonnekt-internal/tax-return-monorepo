import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicles.type';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicle)
  @Roles('admin')
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.getVehicle(id);
  }

  @Query(() => [Vehicle])
  @Roles('admin')
  async vehicles(
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    return this.vehiclesService.getAllVehicles({ taxYear, skip, take });
  }

  @Query(() => [Vehicle])
  @Roles('admin')
  async vehiclesByTaxpayer(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
  ) {
    return this.vehiclesService.getVehiclesByTaxpayer(taxpayerId, taxYear);
  }

  @Mutation(() => Vehicle)
  @Roles('admin')
  async createVehicle(@Args('input') createVehicleInput: CreateVehicleInput) {
    return this.vehiclesService.createVehicle(createVehicleInput);
  }

  @Mutation(() => Vehicle)
  @Roles('admin')
  async updateVehicle(@Args('input') updateVehicleInput: UpdateVehicleInput) {
    return this.vehiclesService.updateVehicle(updateVehicleInput);
  }

  @Mutation(() => Vehicle)
  @Roles('admin')
  async deleteVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.deleteVehicle(id);
  }
}
