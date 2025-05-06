import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { Decimal } from '@prisma/client/runtime/library';

type VehicleData = {
  id?: number;
  assetId?: number;
  registrationNumber: string;
  purchaseYear?: number | null;
  purchasePrice: number | string | Decimal;
  taxpayerId?: string;
  taxYear?: number;
};

type VehicleWhereInput = {
  id?: number;
  assetId?: number;
  registrationNumber?: string;
  AND?: VehicleWhereInput[];
  OR?: VehicleWhereInput[];
};

type VehicleSelect = {
  id?: boolean;
  assetId?: boolean;
  registrationNumber?: boolean;
  purchaseYear?: boolean;
  purchasePrice?: boolean;
  asset?: boolean | { select: any };
};

@Injectable()
export class VehiclesRepository {
  constructor(private prisma: DatabaseService) {}

  async getOne(params: { where: VehicleWhereInput; select?: VehicleSelect }) {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: params.where,
      select: params.select,
    });

    if (!vehicle) throw new Error('Vehicle not found');
    return vehicle;
  }

  async getAll(params: {
    where?: VehicleWhereInput;
    orderBy?: any;
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.vehicle.findMany({
      ...params,
    });
  }

  async createVehicle(data: VehicleData) {
    const { taxpayerId, taxYear } = data;
    const purchasePriceDecimal = new Decimal(data.purchasePrice.toString());

    // First, create the Asset if taxpayerId and taxYear are provided
    if (taxpayerId && taxYear) {
      const asset = await this.prisma.asset.create({
        data: {
          taxpayerId,
          taxYear,
          assetType: 'vehicle',
          vehicle: {
            create: {
              registrationNumber: data.registrationNumber,
              purchaseYear: data.purchaseYear,
              purchasePrice: purchasePriceDecimal,
            },
          },
        },
        include: {
          vehicle: true,
        },
      });

      return asset.vehicle;
    }

    // If no taxpayerId/taxYear, just create the Vehicle directly with an existing assetId
    if (!data.assetId) {
      throw new Error(
        'assetId is required when taxpayerId and taxYear are not provided',
      );
    }

    // Use a plain object for the create data that matches the expected schema
    return await this.prisma.vehicle.create({
      data: {
        registrationNumber: data.registrationNumber,
        purchaseYear: data.purchaseYear,
        purchasePrice: purchasePriceDecimal,
        asset: {
          connect: {
            id: data.assetId,
          },
        },
      },
    });
  }

  async updateVehicle(id: number, data: Partial<VehicleData>) {
    const { taxpayerId, taxYear } = data;

    // Handle updating the associated Asset if needed
    if (taxpayerId || taxYear) {
      const vehicle = await this.prisma.vehicle.findUnique({
        where: { id },
        select: { assetId: true },
      });

      if (vehicle?.assetId) {
        // Update the Asset with new taxpayerId/taxYear if provided
        await this.prisma.asset.update({
          where: { id: vehicle.assetId },
          data: {
            ...(taxpayerId && { taxpayerId }),
            ...(taxYear && { taxYear }),
          },
        });
      }
    }

    // Create the update data object
    const updateData: any = {};

    // Copy over the fields we want to update
    if (data.registrationNumber !== undefined) {
      updateData.registrationNumber = data.registrationNumber;
    }

    if (data.purchaseYear !== undefined) {
      updateData.purchaseYear = data.purchaseYear;
    }

    if (data.purchasePrice !== undefined) {
      updateData.purchasePrice = new Decimal(data.purchasePrice.toString());
    }

    // Handle assetId specially if it's provided
    if (data.assetId !== undefined) {
      updateData.asset = {
        connect: { id: data.assetId },
      };
    }

    return await this.prisma.vehicle.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteVehicle(id: number) {
    return await this.prisma.vehicle.delete({
      where: { id },
    });
  }
}
