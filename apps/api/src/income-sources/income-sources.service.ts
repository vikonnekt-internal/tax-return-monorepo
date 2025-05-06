import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IncomeSourcesRepository } from './income-sources.repository';
import { CreateIncomeSourceInput } from './dto/create-income-source.input';
import { UpdateIncomeSourceInput } from './dto/update-income-source.input';

@Injectable()
export class IncomeSourcesService {
  constructor(
    private readonly incomeSourcesRepository: IncomeSourcesRepository,
  ) {}

  async createIncomeSource(createIncomeSourceInput: CreateIncomeSourceInput) {
    try {
      return await this.incomeSourcesRepository.createIncomeSource({
        ...createIncomeSourceInput,
        taxpayer: { connect: { id: createIncomeSourceInput.taxpayerId } },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIncomeSource(id: number) {
    try {
      return await this.incomeSourcesRepository.getOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Income source not found', HttpStatus.NOT_FOUND);
    }
  }

  async getIncomeSourcesByTaxpayer(taxpayerId: string, taxYear?: number) {
    try {
      const where: Record<string, unknown> = { taxpayerId };
      if (taxYear) {
        where.taxYear = taxYear;
      }

      return await this.incomeSourcesRepository.getAll({
        where,
        orderBy: { dateModified: 'desc' },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve income sources',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIncomeSourcesByTaxReturn(taxReturnId: number) {
    try {
      return await this.incomeSourcesRepository.getAll({
        where: { taxReturnId },
        orderBy: { dateModified: 'desc' },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve income sources for tax return',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async associateWithTaxReturn(incomeSourceIds: number[], taxReturnId: number) {
    try {
      const updates = incomeSourceIds.map((id) =>
        this.incomeSourcesRepository.updateIncomeSource(id, {
          taxReturn: { connect: { id: taxReturnId } },
        }),
      );

      return await Promise.all(updates);
    } catch (error) {
      throw new HttpException(
        'Failed to associate income sources with tax return',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllIncomeSources(params?: {
    taxYear?: number;
    incomeType?: string;
    taxReturnId?: number;
    skip?: number;
    take?: number;
  }) {
    const {
      taxYear,
      incomeType,
      taxReturnId,
      skip = 0,
      take = 10,
    } = params || {};

    const where: Record<string, unknown> = {};
    if (taxYear) where.taxYear = taxYear;
    if (incomeType) where.incomeType = incomeType;
    if (taxReturnId) where.taxReturnId = taxReturnId;

    try {
      return await this.incomeSourcesRepository.getAll({
        where,
        skip,
        take,
        orderBy: { dateModified: 'desc' },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve income sources',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateIncomeSource(updateIncomeSourceInput: UpdateIncomeSourceInput) {
    try {
      // Check if income source exists
      await this.getIncomeSource(updateIncomeSourceInput.id);

      const { id, ...updateData } = updateIncomeSourceInput;

      return await this.incomeSourcesRepository.updateIncomeSource(
        id,
        updateData,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteIncomeSource(id: number) {
    try {
      // Check if income source exists
      await this.getIncomeSource(id);

      return await this.incomeSourcesRepository.deleteIncomeSource(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete income source',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
