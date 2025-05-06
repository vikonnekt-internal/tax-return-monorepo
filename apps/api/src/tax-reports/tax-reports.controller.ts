import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxReportsService } from './tax-reports.service';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';

@Controller('tax-reports')
export class TaxReportsController {
  constructor(private readonly taxReportsService: TaxReportsService) {}

  @Post()
  async create(@Body() createTaxReportDto: CreateTaxReportDto) {
    return await this.taxReportsService.create(createTaxReportDto);
  }

  @Get()
  async findAll() {
    return await this.taxReportsService.findAll();
  }

  @Get('taxpayer/:taxpayerId')
  async findByTaxpayerId(@Param('taxpayerId') taxpayerId: string) {
    return await this.taxReportsService.findAllByTaxpayerId(taxpayerId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taxReportsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaxReportDto: UpdateTaxReportDto,
  ) {
    return await this.taxReportsService.update(+id, updateTaxReportDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taxReportsService.remove(+id);
  }
}
