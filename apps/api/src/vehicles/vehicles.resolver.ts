import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { PaginatedVehiclesType, Vehicle } from './vehicles.type';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';

@Resolver(() => Vehicle)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class VehiclesResolver {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehiclesService.getVehicle(id);
  }

  @Query(() => PaginatedVehiclesType)
  async vehicles(
    @CurrentUser() user: UserEntity,
    @Args('taxYear', { type: () => Int }) taxYear: number,
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.vehiclesService.getVehiclesByTaxpayer(
      user.taxpayerId,
      taxYear,
      pagination,
    );
  }

  @Mutation(() => Vehicle)
  async createVehicle(
    @Args('input') createVehicleInput: CreateVehicleInput,
    @CurrentUser() user: UserEntity,
  ) {
    createVehicleInput.taxpayerId = user.taxpayerId;
    return this.vehiclesService.createVehicle(createVehicleInput);
  }

  @Mutation(() => Vehicle)
  async updateVehicle(
    @Args('input') updateVehicleInput: UpdateVehicleInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.vehiclesService.updateVehicle(updateVehicleInput, user);
  }

  @Mutation(() => Vehicle)
  async deleteVehicle(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.vehiclesService.deleteVehicle(id, user);
  }
}
