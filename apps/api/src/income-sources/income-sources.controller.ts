import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { IncomeSourcesService } from './income-sources.service';
import { CreateIncomeSourceInput } from './dto/create-income-source.input';
import { UpdateIncomeSourceInput } from './dto/update-income-source.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@Controller('income-sources')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IncomeSourcesController {
  constructor(private readonly incomeSourcesService: IncomeSourcesService) {}

  @Get()
  @Roles('admin')
  async getAllIncomeSources(
    @Query('taxYear') taxYear?: number,
    @Query('incomeType') incomeType?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.incomeSourcesService.getAllIncomeSources({
      taxYear: taxYear ? +taxYear : undefined,
      incomeType,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
    });
  }

  @Get(':id')
  @Roles('admin')
  async getIncomeSource(@Param('id', ParseIntPipe) id: number) {
    return this.incomeSourcesService.getIncomeSource(id);
  }

  @Get('taxpayer/:taxpayerId')
  @Roles('admin')
  async getIncomeSourcesByTaxpayer(
    @Param('taxpayerId') taxpayerId: string,
    @Query('taxYear') taxYear?: number,
  ) {
    return this.incomeSourcesService.getIncomeSourcesByTaxpayer(
      taxpayerId,
      taxYear ? +taxYear : undefined,
    );
  }

  @Post()
  @Roles('admin')
  async createIncomeSource(
    @Body() createIncomeSourceDto: CreateIncomeSourceInput,
  ) {
    return this.incomeSourcesService.createIncomeSource(createIncomeSourceDto);
  }

  @Put(':id')
  @Roles('admin')
  async updateIncomeSource(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Omit<UpdateIncomeSourceInput, 'id'>,
  ) {
    return this.incomeSourcesService.updateIncomeSource({
      id,
      ...updateData,
    });
  }

  @Delete(':id')
  @Roles('admin')
  async deleteIncomeSource(@Param('id', ParseIntPipe) id: number) {
    return this.incomeSourcesService.deleteIncomeSource(id);
  }
}
