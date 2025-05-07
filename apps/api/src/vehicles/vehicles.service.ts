import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VehiclesRepository } from './vehicles.repository';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { PaginationResult } from '../common/pagination/pagination.output';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async createVehicle(createVehicleInput: CreateVehicleInput) {
    try {
      // Taxpayer ID should be set from the current user (done in resolver)
      if (!createVehicleInput.taxpayerId) {
        throw new HttpException(
          'Taxpayer ID is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.vehiclesRepository.createVehicle({
        registrationNumber: createVehicleInput.registrationNumber,
        purchaseYear: createVehicleInput.purchaseYear,
        purchasePrice: createVehicleInput.purchasePrice,
        taxpayerId: createVehicleInput.taxpayerId,
        taxYear: createVehicleInput.taxYear,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create vehicle',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVehicleWithAsset(id: number) {
    try {
      // Get the vehicle including asset information
      return await this.vehiclesRepository.getOne({
        where: { id },
        select: {
          id: true,
          assetId: true,
          registrationNumber: true,
          purchaseYear: true,
          purchasePrice: true,
          asset: {
            select: {
              id: true,
              taxpayerId: true,
              taxYear: true,
            },
          },
        },
      });
    } catch {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
  }

  async getVehicle(id: number, taxpayerId?: string) {
    try {
      // Get the vehicle with its asset to check ownership
      const vehicleWithAsset = await this.getVehicleWithAsset(id);

      // If taxpayerId is provided, verify ownership by checking the asset
      // When Select is used with asset:{select:{...}}, the vehicle should include the asset property
      if (
        taxpayerId &&
        (!vehicleWithAsset['asset'] ||
          vehicleWithAsset['asset'].taxpayerId !== taxpayerId)
      ) {
        throw new NotFoundException(
          `Vehicle with ID ${id} not found for this user`,
        );
      }

      return vehicleWithAsset;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }
  }

  async getVehiclesByTaxpayer(
    taxpayerId: string,
    taxYear?: number,
    pagination?: PaginationInput,
  ) {
    try {
      // With our new structure, vehicles are linked to assets which are linked to taxpayers
      const where: any = { asset: { taxpayerId } };
      if (taxYear) {
        where.asset = { ...where.asset, taxYear };
      }

      const limit = pagination?.limit || 10;
      const cursor = pagination?.after
        ? { id: parseInt(pagination.after) }
        : undefined;

      const vehicles = await this.vehiclesRepository.getAll({
        where,
        take: limit + 1, // Take one more to check if there's a next page
        cursor,
        skip: cursor ? 1 : 0, // Skip the cursor if it exists
        orderBy: { id: 'desc' },
      });

      const hasNextPage = vehicles.length > limit;
      const actualVehicles = hasNextPage ? vehicles.slice(0, limit) : vehicles;

      const result: PaginationResult<any> = {
        data: actualVehicles,
        totalCount: await this.vehiclesRepository.count({ where }),
        pageInfo: {
          hasNextPage,
          endCursor:
            actualVehicles.length > 0
              ? actualVehicles[actualVehicles.length - 1].id.toString()
              : '',
          startCursor:
            actualVehicles.length > 0 ? actualVehicles[0].id.toString() : '',
        },
      };

      return result;
    } catch {
      throw new HttpException(
        'Failed to retrieve vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllVehicles(params?: {
    taxYear?: number;
    pagination?: PaginationInput;
    user?: UserEntity;
  }) {
    const { taxYear, pagination } = params || {};
    const limit = pagination?.limit || 10;
    const cursor = pagination?.after
      ? { id: parseInt(pagination.after) }
      : undefined;

    const where: any = {};
    if (taxYear) where.asset = { taxYear };

    try {
      const vehicles = await this.vehiclesRepository.getAll({
        where,
        take: limit + 1,
        cursor,
        skip: cursor ? 1 : 0,
        orderBy: { id: 'desc' },
      });

      const hasNextPage = vehicles.length > limit;
      const actualVehicles = hasNextPage ? vehicles.slice(0, limit) : vehicles;

      const result: PaginationResult<any> = {
        data: actualVehicles,
        totalCount: await this.vehiclesRepository.count({ where }),
        pageInfo: {
          hasNextPage,
          endCursor:
            actualVehicles.length > 0
              ? actualVehicles[actualVehicles.length - 1].id.toString()
              : '',
          startCursor:
            actualVehicles.length > 0 ? actualVehicles[0].id.toString() : '',
        },
      };

      return result;
    } catch {
      throw new HttpException(
        'Failed to retrieve vehicles',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateVehicle(
    updateVehicleInput: UpdateVehicleInput,
    user: UserEntity,
  ) {
    try {
      // Verify the vehicle belongs to the user
      await this.getVehicle(updateVehicleInput.id, user.taxpayerId);

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

  async deleteVehicle(id: number, user: UserEntity) {
    try {
      // Verify the vehicle belongs to the user
      await this.getVehicle(id, user.taxpayerId);

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
