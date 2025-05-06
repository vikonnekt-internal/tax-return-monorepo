import { Injectable } from '@nestjs/common';
import { DatabaseService, IncomeSource, Prisma } from '@tax/database';

@Injectable()
export class IncomeSourcesRepository {
  constructor(private prisma: DatabaseService) {}

  async getOne(params: {
    where: Prisma.IncomeSourceWhereInput;
    select?: Prisma.IncomeSourceSelect;
  }): Promise<IncomeSource> {
    const incomeSource = await this.prisma.incomeSource.findFirst({
      where: params.where,
      select: params.select,
    });

    if (!incomeSource) throw new Error('Income source not found');
    return incomeSource;
  }

  async getAll(params: {
    where?: Prisma.IncomeSourceWhereInput;
    orderBy?: Prisma.IncomeSourceOrderByWithRelationInput;
    take?: number;
    skip?: number;
  }): Promise<IncomeSource[]> {
    return await this.prisma.incomeSource.findMany({
      ...params,
    });
  }

  async createIncomeSource(
    data: Prisma.IncomeSourceCreateInput,
  ): Promise<IncomeSource> {
    return await this.prisma.incomeSource.create({
      data,
    });
  }

  async updateIncomeSource(
    id: number,
    data: Prisma.IncomeSourceUpdateInput,
  ): Promise<IncomeSource> {
    return await this.prisma.incomeSource.update({
      where: { id },
      data,
    });
  }

  async deleteIncomeSource(id: number): Promise<IncomeSource> {
    return await this.prisma.incomeSource.delete({
      where: { id },
    });
  }
}
