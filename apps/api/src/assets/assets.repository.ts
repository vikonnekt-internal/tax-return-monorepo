import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';

@Injectable()
export class AssetsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createAssetInput: CreateAssetInput) {
    const { assetType, realEstate, vehicle, ...assetData } = createAssetInput;

    // Create the parent asset record first
    const asset = await this.prisma.asset.create({
      data: {
        ...assetData,
        assetType,
      },
    });

    // Based on assetType, create the specific asset type record
    if (assetType === 'real_estate' && realEstate) {
      await this.prisma.realEstate.create({
        data: {
          propertyId: realEstate.propertyId || '',
          address: realEstate.address || '',
          propertyValue: realEstate.propertyValue || 0,
          purchaseYear: realEstate.purchaseYear,
          assetId: asset.id,
        },
      });
    } else if (assetType === 'vehicle' && vehicle) {
      await this.prisma.vehicle.create({
        data: {
          registrationNumber: vehicle.registrationNumber || '',
          purchaseYear: vehicle.purchaseYear,
          purchasePrice: vehicle.purchasePrice || 0,
          assetId: asset.id,
        },
      });
    }

    return this.findOne(asset.id);
  }

  async findAll(params: { taxpayerId: string; taxYear: number }) {
    const { taxpayerId, taxYear } = params;
    return this.prisma.asset.findMany({
      where: {
        taxpayerId,
        taxYear,
      },
      include: {
        realEstate: true,
        vehicle: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.asset.findUnique({
      where: { id },
      include: {
        realEstate: true,
        vehicle: true,
      },
    });
  }

  async update(id: number, updateAssetInput: UpdateAssetInput) {
    const { assetType, realEstate, vehicle, ...assetData } = updateAssetInput;

    // Update the base asset
    const asset = await this.prisma.asset.update({
      where: { id },
      data: assetData,
    });

    // Update the specific asset type data
    if (assetType === 'real_estate' && realEstate) {
      if (realEstate.id) {
        await this.prisma.realEstate.update({
          where: { id: +realEstate.id }, // Convert string to number
          data: {
            propertyId: realEstate.propertyId || '',
            address: realEstate.address || '',
            propertyValue: realEstate.propertyValue || 0,
            purchaseYear: realEstate.purchaseYear,
            assetId: asset.id,
          },
        });
      } else {
        await this.prisma.realEstate.upsert({
          where: { assetId: asset.id },
          update: {
            propertyId: realEstate.propertyId || '',
            address: realEstate.address || '',
            propertyValue: realEstate.propertyValue || 0,
            purchaseYear: realEstate.purchaseYear,
          },
          create: {
            propertyId: realEstate.propertyId || '',
            address: realEstate.address || '',
            propertyValue: realEstate.propertyValue || 0,
            purchaseYear: realEstate.purchaseYear,
            assetId: asset.id,
          },
        });
      }
    } else if (assetType === 'vehicle' && vehicle) {
      if (vehicle.id) {
        await this.prisma.vehicle.update({
          where: { id: vehicle.id },
          data: {
            registrationNumber: vehicle.registrationNumber || '',
            purchaseYear: vehicle.purchaseYear,
            purchasePrice: vehicle.purchasePrice || 0,
            assetId: asset.id,
          },
        });
      } else {
        await this.prisma.vehicle.upsert({
          where: { assetId: asset.id },
          update: {
            registrationNumber: vehicle.registrationNumber || '',
            purchaseYear: vehicle.purchaseYear,
            purchasePrice: vehicle.purchasePrice || 0,
          },
          create: {
            registrationNumber: vehicle.registrationNumber || '',
            purchaseYear: vehicle.purchaseYear,
            purchasePrice: vehicle.purchasePrice || 0,
            assetId: asset.id,
          },
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    // The cascade delete will automatically remove related realEstate or vehicle
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
