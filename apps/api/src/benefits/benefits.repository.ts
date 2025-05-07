import { Injectable } from '@nestjs/common';
import { DatabaseService, Prisma } from '@tax/database';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';
import PaginationService from '../common/pagination/pagination.service';
import { PaginationInput } from '../common/pagination/pagination.input';

@Injectable()
export class BenefitsRepository {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createBenefitInput: CreateBenefitInput) {
    const { taxpayerId, ...data } = createBenefitInput;
    return this.prisma.benefit.create({
      data: {
        ...data,
        taxpayerId: taxpayerId || '',
      },
    });
  }

  async findAll(
    params: { taxpayerId: string; taxYear: number },
    paginationInput?: PaginationInput,
  ) {
    const { taxpayerId, taxYear } = params;
    const filter = { taxpayerId, taxYear };

    if (!paginationInput) {
      const benefits = await this.prisma.benefit.findMany({
        where: filter,
        orderBy: { id: 'desc' },
      });

      return {
        data: benefits,
        totalCount: benefits.length,
        pageInfo: {
          hasNextPage: false,
          endCursor:
            benefits.length > 0 ? String(benefits[benefits.length - 1].id) : '',
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
    const benefits = await this.prisma.benefit.findMany({
      where: filter as Prisma.BenefitWhereInput,
      cursor: cursor || undefined,
      skip: cursor ? skip : 0,
      take,
      orderBy: {
        id: before ? 'desc' : 'asc', // Reverse sort when paginating backwards
      },
    });

    // If we paginated backwards, we need to reverse the items to maintain the correct order
    const orderedBenefits = before ? [...benefits].reverse() : benefits;

    // Get total count
    const totalCount = await this.prisma.benefit.count({ where: filter });

    // Get page info for pagination
    const pageInfoBase = await this.paginationService.paginate('benefit', {
      filter,
      paging: paginationInput,
    });

    const pageInfo = {
      ...pageInfoBase,
      startCursor:
        orderedBenefits.length > 0
          ? this.paginationService.generateCursor(orderedBenefits[0].id)
          : undefined,
      endCursor:
        orderedBenefits.length > 0
          ? this.paginationService.generateCursor(
              orderedBenefits[orderedBenefits.length - 1].id,
            )
          : '',
    };

    return this.paginationService.createPaginationObject({
      data: orderedBenefits,
      pageInfo,
      totalCount,
    });
  }

  async findOne(id: number) {
    return this.prisma.benefit.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBenefitInput: UpdateBenefitInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _, ...data } = updateBenefitInput;
    return this.prisma.benefit.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.benefit.delete({
      where: { id },
    });
  }
}
