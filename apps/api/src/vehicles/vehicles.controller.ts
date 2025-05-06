import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @Roles('admin')
  async getAllVehicles(
    @Query('taxYear') taxYear?: number,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.vehiclesService.getAllVehicles({
      taxYear: taxYear ? +taxYear : undefined,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
    });
  }

  @Get(':id')
  @Roles('admin')
  async getVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.getVehicle(id);
  }

  @Get('taxpayer/:taxpayerId')
  @Roles('admin')
  async getVehiclesByTaxpayer(
    @Param('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear?: number,
  ) {
    return this.vehiclesService.getVehiclesByTaxpayer(
      taxpayerId,
      taxYear ? +taxYear : undefined,
    );
  }

  @Post()
  @Roles('admin')
  async createVehicle(@Body() createVehicleDto: CreateVehicleInput) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Put(':id')
  @Roles('admin')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Omit<UpdateVehicleInput, 'id'>,
  ) {
    return this.vehiclesService.updateVehicle({
      id,
      ...updateData,
    });
  }

  @Delete(':id')
  @Roles('admin')
  async deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.deleteVehicle(id);
  }
}
