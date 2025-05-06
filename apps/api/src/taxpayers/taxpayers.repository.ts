import { Injectable } from '@nestjs/common';
import { DatabaseService, Prisma } from '@tax/database';

@Injectable()
export class TaxpayersRepository {
  constructor(private prisma: DatabaseService) {}

  async getOne(params: {
    where: Prisma.TaxpayerWhereInput;
    select?: Prisma.TaxpayerSelect;
  }) {
    const taxpayer = await this.prisma.taxpayer.findFirst({
      where: params.where,
      select: params.select,
    });

    if (!taxpayer) throw new Error('Taxpayer not found');
    return taxpayer;
  }

  async getAll(params: {
    where?: Prisma.TaxpayerWhereInput;
    orderBy?:
      | Prisma.TaxpayerOrderByWithRelationInput
      | Prisma.TaxpayerOrderByWithRelationInput[];
    take?: number;
    skip?: number;
  }) {
    return await this.prisma.taxpayer.findMany({
      ...params,
    });
  }

  async createTaxpayer(data: Prisma.TaxpayerCreateInput) {
    return await this.prisma.taxpayer.create({
      data,
    });
  }

  async updateTaxpayer(id: string, data: Prisma.TaxpayerUpdateInput) {
    return await this.prisma.taxpayer.update({
      where: { id },
      data,
    });
  }

  async deleteTaxpayer(id: string) {
    return await this.prisma.taxpayer.delete({
      where: { id },
    });
  }
}
