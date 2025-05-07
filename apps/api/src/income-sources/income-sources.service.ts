import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IncomeSourcesRepository } from './income-sources.repository';
import { CreateIncomeSourceInput } from './dto/create-income-source.input';
import { UpdateIncomeSourceInput } from './dto/update-income-source.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';
import { PageInfo } from '../common/pagination/page-info.type';
import { DatabaseService } from '@tax/database';

@Injectable()
export class IncomeSourcesService {
  constructor(
    private readonly incomeSourcesRepository: IncomeSourcesRepository,
    private readonly paginationService: PaginationService,
    private readonly prisma: DatabaseService,
  ) {}

  async createIncomeSource(
    createIncomeSourceInput: CreateIncomeSourceInput,
    userId: number,
  ) {
    const { taxReturnId, taxpayerId, ...rest } = createIncomeSourceInput;
    console.log('🚀 ~ IncomeSourcesService ~ taxpayerId:', taxpayerId);
    try {
      // We've received userId from auth but can't store it directly in IncomeSource
      // Instead, we store taxpayerId from the input
      return await this.incomeSourcesRepository.createIncomeSource({
        ...rest,
        taxpayer: { connect: { id: taxpayerId } },
        // Connect to taxReturn if taxReturnId is provided
        ...(taxReturnId
          ? {
              taxReturn: {
                connect: { id: taxReturnId },
              },
            }
          : {}),
      });
    } catch (err) {
      // Log the error for debugging
      console.error(`Error creating income source for user ${userId}:`, err);
      throw new HttpException(
        'Failed to create income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIncomeSource(id: number, userId?: number) {
    try {
      const where: Record<string, unknown> = { id };
      if (userId) where.userId = userId;

      return await this.incomeSourcesRepository.getOne({
        where,
      });
    } catch (err) {
      console.error(`Error getting income source ${id}:`, err);
      throw new HttpException('Income source not found', HttpStatus.NOT_FOUND);
    }
  }

  async getIncomeSourcesByTaxpayer(
    taxpayerId: string,
    taxYear?: number,
    paginationInput?: PaginationInput,
    userId?: number,
  ) {
    try {
      const filter: Record<string, unknown> = { taxpayerId };
      if (taxYear) {
        filter.taxYear = taxYear;
      }
      if (userId) {
        filter.userId = userId;
      }

      // Get page info for pagination
      const pageInfoBase = await this.paginationService.paginate(
        'incomeSource',
        {
          filter,
          paging: paginationInput,
        },
      );

      // Get actual data
      const data = await this.incomeSourcesRepository.getAllPaginated(
        filter,
        paginationInput,
      );

      // If we have data, set the cursors
      const pageInfo: PageInfo = {
        ...pageInfoBase,
        startCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[0].id)
            : undefined,
        endCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[data.length - 1].id)
            : '',
      };

      // Get total count
      const totalCount = await this.getTotalCount(filter);

      return this.paginationService.createPaginationObject({
        data,
        pageInfo,
        totalCount,
      });
    } catch (err) {
      console.error(
        `Error getting income sources for taxpayer ${taxpayerId}:`,
        err,
      );
      throw new HttpException(
        'Failed to retrieve income sources',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIncomeSourcesByTaxReturn(
    taxReturnId: number,
    paginationInput?: PaginationInput,
    userId?: number,
  ) {
    try {
      const filter: Record<string, unknown> = { taxReturnId };
      if (userId) {
        filter.userId = userId;
      }

      // Get page info for pagination
      const pageInfoBase = await this.paginationService.paginate(
        'incomeSource',
        {
          filter,
          paging: paginationInput,
        },
      );

      // Get actual data
      const data = await this.incomeSourcesRepository.getAllPaginated(
        filter,
        paginationInput,
      );

      // If we have data, set the cursors
      const pageInfo: PageInfo = {
        ...pageInfoBase,
        startCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[0].id)
            : undefined,
        endCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[data.length - 1].id)
            : '',
      };

      // Get total count
      const totalCount = await this.getTotalCount(filter);

      return this.paginationService.createPaginationObject({
        data,
        pageInfo,
        totalCount,
      });
    } catch (err) {
      console.error(
        `Error getting income sources for tax return ${taxReturnId}:`,
        err,
      );
      throw new HttpException(
        'Failed to retrieve income sources for tax return',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async associateWithTaxReturn(
    incomeSourceIds: number[],
    taxReturnId: number,
    userId?: number,
  ) {
    try {
      const updates = incomeSourceIds.map((id) =>
        this.incomeSourcesRepository.updateIncomeSource(
          id,
          {
            taxReturn: { connect: { id: taxReturnId } },
          },
          userId,
        ),
      );

      return await Promise.all(updates);
    } catch (err) {
      console.error(
        `Error associating income sources with tax return ${taxReturnId}:`,
        err,
      );
      throw new HttpException(
        'Failed to associate income sources with tax return',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllIncomeSources(
    params: {
      taxYear?: number;
      incomeType?: string;
      taxReturnId?: number;
    },
    paginationInput?: PaginationInput,
    userId?: number,
  ) {
    const { taxYear, incomeType, taxReturnId } = params || {};

    const filter: Record<string, unknown> = {};
    if (taxYear) filter.taxYear = taxYear;
    if (incomeType) filter.incomeType = incomeType;
    if (taxReturnId) filter.taxReturnId = taxReturnId;
    if (userId) filter.userId = userId;

    try {
      // Get page info for pagination
      const pageInfoBase = await this.paginationService.paginate(
        'incomeSource',
        {
          filter,
          paging: paginationInput,
        },
      );

      // Get actual data
      const data = await this.incomeSourcesRepository.getAllPaginated(
        filter,
        paginationInput,
      );

      // If we have data, set the cursors
      const pageInfo: PageInfo = {
        ...pageInfoBase,
        startCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[0].id)
            : undefined,
        endCursor:
          data.length > 0
            ? this.paginationService.generateCursor(data[data.length - 1].id)
            : '',
      };

      // Get total count
      const totalCount = await this.getTotalCount(filter);

      return this.paginationService.createPaginationObject({
        data,
        pageInfo,
        totalCount,
      });
    } catch (err) {
      console.error(`Error getting income sources:`, err);
      throw new HttpException(
        'Failed to retrieve income sources',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateIncomeSource(
    updateIncomeSourceInput: UpdateIncomeSourceInput,
    userId?: number,
  ) {
    try {
      // Check if income source exists and belongs to the user
      await this.getIncomeSource(updateIncomeSourceInput.id, userId);

      const { id, ...updateData } = updateIncomeSourceInput;

      return await this.incomeSourcesRepository.updateIncomeSource(
        id,
        updateData,
        userId,
      );
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(
        `Error updating income source ${updateIncomeSourceInput.id}:`,
        err,
      );
      throw new HttpException(
        'Failed to update income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteIncomeSource(id: number, userId?: number) {
    try {
      // Check if income source exists and belongs to the user
      await this.getIncomeSource(id, userId);

      return await this.incomeSourcesRepository.deleteIncomeSource(id, userId);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error(`Error deleting income source ${id}:`, err);
      throw new HttpException(
        'Failed to delete income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getTotalCount(filter: any) {
    return await this.prisma.incomeSource.count({
      where: filter,
    });
  }
}
