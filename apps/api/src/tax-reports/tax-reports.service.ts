import { Injectable } from '@nestjs/common';
import { TaxReportsRepository } from './tax-reports.repository';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';

@Injectable()
export class TaxReportsService {
  constructor(private readonly taxReportsRepository: TaxReportsRepository) {}

  async create(createTaxReportDto: CreateTaxReportDto) {
    return await this.taxReportsRepository.create(createTaxReportDto);
  }

  async findAll() {
    return await this.taxReportsRepository.findAll();
  }

  async findAllByTaxpayerId(taxpayerId: string) {
    return await this.taxReportsRepository.findAllByTaxpayerId(taxpayerId);
  }

  async findOne(id: number) {
    return await this.taxReportsRepository.findOne(id);
  }

  async findOneWithRelations(id: number) {
    return await this.taxReportsRepository.findOneWithRelations(id);
  }

  async update(id: number, updateTaxReportDto: UpdateTaxReportDto) {
    return await this.taxReportsRepository.update(id, updateTaxReportDto);
  }

  async remove(id: number) {
    return await this.taxReportsRepository.remove(id);
  }
}
