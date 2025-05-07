import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';
import { AssetTypeEnum } from './dto/asset-type.enum';

@Injectable()
export class AssetsRepository {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly paginationService: PaginationService,
  ) {}

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
    if (assetType === AssetTypeEnum.REAL_ESTATE && realEstate) {
      await this.prisma.realEstate.create({
        data: {
          propertyId: realEstate.propertyId || '',
          address: realEstate.address || '',
          propertyValue: realEstate.propertyValue || 0,
          purchaseYear: realEstate.purchaseYear,
          assetId: asset.id,
        },
      });
    } else if (assetType === AssetTypeEnum.VEHICLE && vehicle) {
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

  async findAll(
    params: { taxpayerId: string; taxYear: number },
    paginationInput?: PaginationInput,
  ) {
    const { taxpayerId, taxYear } = params;
    const filter = { taxpayerId, taxYear };

    if (!paginationInput) {
      const assets = await this.prisma.asset.findMany({
        where: filter,
        include: {
          realEstate: true,
          vehicle: true,
        },
        orderBy: { id: 'desc' },
      });

      return {
        data: assets,
        totalCount: assets.length,
        pageInfo: {
          hasNextPage: false,
          endCursor:
            assets.length > 0 ? String(assets[assets.length - 1].id) : '',
        },
      };
    }

    const { limit = 10, after, before } = paginationInput;

    // Configure cursor and pagination direction
    let cursor: any = undefined;
    let skip = 0;
    let take = limit;

    if (after) {
      cursor = { id: this.paginationService.decodeCursor(after) };
      skip = 1; // Skip the cursor item
    } else if (before) {
      cursor = { id: this.paginationService.decodeCursor(before) };
      skip = 1;
      take = -limit; // Take negative = take items before cursor
    }

    // Get data with pagination
    const assets = await this.prisma.asset.findMany({
      where: filter,
      include: {
        realEstate: true,
        vehicle: true,
      },
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedAssets = before ? [...assets].reverse() : assets;

    // Get total count
    const totalCount = await this.prisma.asset.count({ where: filter });

    // Get page info for pagination
    const pageInfoBase = await this.paginationService.paginate('asset', {
      filter,
      paging: paginationInput,
    });

    const pageInfo = {
      ...pageInfoBase,
      startCursor:
        orderedAssets.length > 0
          ? this.paginationService.generateCursor(orderedAssets[0].id)
          : undefined,
      endCursor:
        orderedAssets.length > 0
          ? this.paginationService.generateCursor(
              orderedAssets[orderedAssets.length - 1].id,
            )
          : '',
    };

    return this.paginationService.createPaginationObject({
      data: orderedAssets,
      pageInfo,
      totalCount,
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
    if (assetType === AssetTypeEnum.REAL_ESTATE && realEstate) {
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
    } else if (assetType === AssetTypeEnum.VEHICLE && vehicle) {
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
