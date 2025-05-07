import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TaxReportsService } from './tax-reports.service';
import { TaxReportType, PaginatedTaxReportsType } from './tax-reports.type';
import { CreateTaxReportInput } from './dto/create-tax-report.input';
import { UpdateTaxReportInput } from './dto/update-tax-report.input';
import { IncomeSource } from '../income-sources/income-sources.type';
import { Asset } from '../assets/assets.type';
import { Debt } from '../debts/debts.type';
import { Benefit } from '../benefits/benefits.type';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@Resolver(() => TaxReportType)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class TaxReportsResolver {
  constructor(private readonly taxReportsService: TaxReportsService) {}

  @Mutation(() => TaxReportType)
  async createTaxReport(
    @Args('createTaxReportInput') createTaxReportInput: CreateTaxReportInput,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.create(
      {
        ...createTaxReportInput,
        status: createTaxReportInput.status || 'draft',
      },
      user.id,
      user.taxpayerId,
    );
  }

  @Query(() => PaginatedTaxReportsType, { name: 'taxReports' })
  async findAll(
    @Args('paginationInput', { nullable: true })
    paginationInput: PaginationInput,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.findAll(
      paginationInput,
      user.taxpayerId,
    );
  }

  @Query(() => TaxReportType, { name: 'taxReport' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.findOne(id, user.taxpayerId);
  }

  @Query(() => TaxReportType, { name: 'taxReportDetailed' })
  async findOneDetailed(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.findOneWithRelations(
      id,
      user.taxpayerId,
    );
  }

  @Mutation(() => TaxReportType)
  async updateTaxReport(
    @Args('updateTaxReportInput') updateTaxReportInput: UpdateTaxReportInput,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.update(
      updateTaxReportInput.id,
      updateTaxReportInput,
      user.taxpayerId,
    );
  }

  @Mutation(() => TaxReportType)
  async removeTaxReport(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.taxReportsService.remove(id, user.taxpayerId);
  }

  @ResolveField(() => [IncomeSource], { nullable: true })
  async incomeSources(
    @Parent() taxReport: TaxReportType,
    @CurrentUser() user: UserEntity,
  ) {
    const { id } = taxReport;
    if ('incomeSources' in taxReport) {
      return taxReport.incomeSources || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(
      id,
      user.taxpayerId,
    );
    return fullReport?.incomeSources || [];
  }

  @ResolveField(() => [Asset], { nullable: true })
  async assets(
    @Parent() taxReport: TaxReportType,
    @CurrentUser() user: UserEntity,
  ) {
    const { id } = taxReport;
    if ('assets' in taxReport) {
      return taxReport.assets || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(
      id,
      user.taxpayerId,
    );
    return fullReport?.assets || [];
  }

  @ResolveField(() => [Debt], { nullable: true })
  async debts(
    @Parent() taxReport: TaxReportType,
    @CurrentUser() user: UserEntity,
  ) {
    const { id } = taxReport;
    if ('debts' in taxReport) {
      return taxReport.debts || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(
      id,
      user.taxpayerId,
    );
    return fullReport?.debts || [];
  }

  @ResolveField(() => [Benefit], { nullable: true })
  async benefits(
    @Parent() taxReport: TaxReportType,
    @CurrentUser() user: UserEntity,
  ) {
    const { id } = taxReport;
    if ('benefits' in taxReport) {
      return taxReport.benefits || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(
      id,
      user.taxpayerId,
    );
    return fullReport?.benefits || [];
  }
}
