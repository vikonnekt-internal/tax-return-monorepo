import { Injectable } from '@nestjs/common';
import { DatabaseService, IncomeSource, Prisma } from '@tax/database';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';

@Injectable()
export class IncomeSourcesRepository {
  constructor(
    private prisma: DatabaseService,
    private paginationService: PaginationService,
  ) {}

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

  async getAllPaginated(
    filter: Record<string, unknown>,
    paginationInput?: PaginationInput,
  ): Promise<IncomeSource[]> {
    const { limit = 10, after, before } = paginationInput || {};

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
    const items = await this.prisma.incomeSource.findMany({
      where: filter as Prisma.IncomeSourceWhereInput,
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedItems = before ? [...items].reverse() : items;

    return orderedItems;
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
    userId?: number,
  ): Promise<IncomeSource> {
    return await this.prisma.incomeSource.update({
      where: {
        id,
        ...(userId ? { userId } : {}),
      },
      data,
    });
  }

  async deleteIncomeSource(id: number, userId?: number): Promise<IncomeSource> {
    return await this.prisma.incomeSource.delete({
      where: {
        id,
        ...(userId ? { userId } : {}),
      },
    });
  }
}
