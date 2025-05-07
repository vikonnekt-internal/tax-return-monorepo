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
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('income-sources')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class IncomeSourcesController {
  constructor(private readonly incomeSourcesService: IncomeSourcesService) {}

  @Get()
  async getAllIncomeSources(
    @CurrentUser() user: UserEntity,
    @Query('taxYear') taxYear?: number,
    @Query('incomeType') incomeType?: string,
    @Query() paginationInput?: PaginationInput,
  ) {
    return this.incomeSourcesService.getAllIncomeSources(
      {
        taxYear: taxYear ? +taxYear : undefined,
        incomeType,
      },
      paginationInput,
      user.id,
    );
  }

  @Get(':id')
  async getIncomeSource(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.getIncomeSource(id, user.id);
  }

  @Get('taxpayer')
  async getIncomeSourcesByTaxpayer(
    @CurrentUser() user: UserEntity,
    @Query('taxYear') taxYear?: number,
    @Query() paginationInput?: PaginationInput,
  ) {
    return this.incomeSourcesService.getIncomeSourcesByTaxpayer(
      user.id.toString(),
      taxYear ? +taxYear : undefined,
      paginationInput,
      user.id,
    );
  }

  @Post()
  async createIncomeSource(
    @Body() createIncomeSourceDto: CreateIncomeSourceInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.createIncomeSource(
      {
        ...createIncomeSourceDto,
        taxpayerId: user.id.toString(),
      },
      user.id,
    );
  }

  @Put(':id')
  async updateIncomeSource(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Omit<UpdateIncomeSourceInput, 'id'>,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.updateIncomeSource(
      {
        id,
        ...updateData,
      },
      user.id,
    );
  }

  @Delete(':id')
  async deleteIncomeSource(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.deleteIncomeSource(id, user.id);
  }
}
