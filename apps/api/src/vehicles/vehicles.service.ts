import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async createVehicle(createVehicleInput: CreateVehicleInput) {
    try {
      // We need to handle both direct vehicle creation and vehicle creation as part of an asset
      // For now, just passing through but in a real implementation you'd check if this is part of an asset
      return await this.vehiclesRepository.createVehicle({
        registrationNumber: createVehicleInput.registrationNumber,
        purchaseYear: createVehicleInput.purchaseYear,
        purchasePrice: createVehicleInput.purchasePrice,
        // These will be handled differently when an Asset is created
        taxpayerId: createVehicleInput.taxpayerId,
        taxYear: createVehicleInput.taxYear,
      });
    } catch {
      throw new HttpException(
        'Failed to create vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVehicle(id: number) {
    try {
      return await this.vehiclesRepository.getOne({
        where: { id },
      });
    } catch {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
  }

  async getVehiclesByTaxpayer(taxpayerId: string, taxYear?: number) {
    try {
      // With our new structure, vehicles are linked to assets which are linked to taxpayers
      // This would need to be updated to join through the asset table
      const where: any = { asset: { taxpayerId } };
      if (taxYear) {
        where.asset = { ...where.asset, taxYear };
      }

      return await this.vehiclesRepository.getAll({
        where,
        orderBy: { id: 'desc' },
      });
    } catch {
      throw new HttpException(
        'Failed to retrieve vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllVehicles(params?: {
    taxYear?: number;
    skip?: number;
    take?: number;
  }) {
    const { taxYear, skip = 0, take = 10 } = params || {};

    const where: any = {};
    if (taxYear) where.asset = { taxYear };

    try {
      return await this.vehiclesRepository.getAll({
        where,
        skip,
        take,
        orderBy: { id: 'desc' },
      });
    } catch {
      throw new HttpException(
        'Failed to retrieve vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVehicle(updateVehicleInput: UpdateVehicleInput) {
    try {
      // Check if vehicle exists
      await this.getVehicle(updateVehicleInput.id);

      const { id, ...updateData } = updateVehicleInput;

      return await this.vehiclesRepository.updateVehicle(id, updateData);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteVehicle(id: number) {
    try {
      // Check if vehicle exists
      await this.getVehicle(id);

      return await this.vehiclesRepository.deleteVehicle(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
