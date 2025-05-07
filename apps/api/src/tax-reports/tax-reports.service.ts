import { Injectable } from '@nestjs/common';
import { TaxReportsRepository } from './tax-reports.repository';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';
import { PaginationInput } from '../common/pagination/pagination.input';
import PaginationService from '../common/pagination/pagination.service';
import { PageInfo } from '../common/pagination/page-info.type';
import { DatabaseService } from '@tax/database';

@Injectable()
export class TaxReportsService {
  constructor(
    private readonly taxReportsRepository: TaxReportsRepository,
    private readonly paginationService: PaginationService,
    private readonly prisma: DatabaseService,
  ) {}

  async create(
    createTaxReportDto: CreateTaxReportDto,
    userId: number,
    taxpayerId: string,
  ) {
    return await this.taxReportsRepository.create({
      ...createTaxReportDto,
      userId,
      taxpayerId,
    });
  }

  async findAll(paginationInput: PaginationInput, taxpayerId?: string) {
    const filter = taxpayerId ? { taxpayerId } : {};

    // Get page info for pagination
    const pageInfoBase = await this.paginationService.paginate('taxReturn', {
      filter,
      paging: paginationInput,
    });

    // Get actual data
    const data = await this.taxReportsRepository.findAll(
      paginationInput,
      filter,
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
  }

  async findAllByTaxpayerId(
    taxpayerId: string,
    paginationInput: PaginationInput,
    userId?: number,
  ) {
    const filter = { taxpayerId, ...(userId ? { userId } : {}) };

    // Get page info for pagination
    const pageInfoBase = await this.paginationService.paginate('taxReturn', {
      filter,
      paging: paginationInput,
    });

    // Get actual data
    const data = await this.taxReportsRepository.findAllByTaxpayerId(
      taxpayerId,
      paginationInput,
      userId,
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
  }

  async findOne(id: number, taxpayerId?: string) {
    return await this.taxReportsRepository.findOne(id, taxpayerId);
  }

  async findOneWithRelations(id: number, taxpayerId?: string) {
    return await this.taxReportsRepository.findOneWithRelations(id, taxpayerId);
  }

  async update(
    id: number,
    updateTaxReportDto: UpdateTaxReportDto,
    taxpayerId?: string,
  ) {
    return await this.taxReportsRepository.update(
      id,
      updateTaxReportDto,
      taxpayerId,
    );
  }

  async remove(id: number, taxpayerId?: string) {
    return await this.taxReportsRepository.remove(id, taxpayerId);
  }

  private async getTotalCount(filter: any) {
    return await this.prisma.taxReturn.count({
      where: filter,
    });
  }
}
