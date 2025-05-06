import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@tax/database';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { UpdateRealEstateInput } from './dto/update-real-estate.input';

@Injectable()
export class RealEstatesRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createRealEstateInput: CreateRealEstateInput) {
    const { assetId, ...realEstateData } = createRealEstateInput;

    // Only include fields that belong to the RealEstate model
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { taxpayerId, taxYear, taxReturnId, ...realEstateOnly } =
      realEstateData;

    return this.prisma.realEstate.create({
      data: {
        ...realEstateOnly,
        assetId,
      },
    });
  }

  async findAll(params: { taxpayerId: string; taxYear: number }) {
    const { taxpayerId, taxYear } = params;
    return this.prisma.realEstate.findMany({
      where: {
        asset: {
          taxpayerId,
          taxYear,
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.realEstate.findUnique({
      where: { propertyId: id },
    });
  }

  async update(id: string, updateRealEstateInput: UpdateRealEstateInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: idToRemove, ...updateData } = updateRealEstateInput;

    // Only include fields that belong to the RealEstate model
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { taxpayerId, taxYear, taxReturnId, ...realEstateOnly } = updateData;

    return this.prisma.realEstate.update({
      where: { propertyId: id },
      data: realEstateOnly,
    });
  }

  async remove(id: string) {
    return this.prisma.realEstate.delete({
      where: { propertyId: id },
    });
  }
}
