import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaxReportsService } from './tax-reports.service';
import { CreateTaxReportDto } from './dto/create-tax-report.input';
import { UpdateTaxReportDto } from './dto/update-tax-report.input';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tax-reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class TaxReportsController {
  constructor(private readonly taxReportsService: TaxReportsService) {}

  @Post()
  async create(
    @Body() createTaxReportDto: CreateTaxReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.create(
      createTaxReportDto,
      user.id,
      user.id.toString(),
    );
  }

  @Get()
  async findAll(
    @Query() paginationInput: PaginationInput,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.findAll(
      paginationInput,
      user.taxpayerId,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return await this.taxReportsService.findOne(+id, user.taxpayerId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaxReportDto: UpdateTaxReportDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.update(
      +id,
      updateTaxReportDto,
      user.taxpayerId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return await this.taxReportsService.remove(+id, user.taxpayerId);
  }
}
