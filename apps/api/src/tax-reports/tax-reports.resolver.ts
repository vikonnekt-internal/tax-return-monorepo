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
import { TaxReportType } from './tax-reports.type';
import { CreateTaxReportInput } from './dto/create-tax-report.input';
import { UpdateTaxReportInput } from './dto/update-tax-report.input';
import { IncomeSource } from '../income-sources/income-sources.type';
import { Asset } from '../assets/assets.type';
import { Debt } from '../debts/debts.type';
import { Benefit } from '../benefits/benefits.type';

@Resolver(() => TaxReportType)
export class TaxReportsResolver {
  constructor(private readonly taxReportsService: TaxReportsService) {}

  @Mutation(() => TaxReportType)
  async createTaxReport(
    @Args('createTaxReportInput') createTaxReportInput: CreateTaxReportInput,
  ) {
    return await this.taxReportsService.create({
      ...createTaxReportInput,
      status: createTaxReportInput.status || 'draft',
    });
  }

  @Query(() => [TaxReportType], { name: 'taxReports' })
  async findAll() {
    return await this.taxReportsService.findAll();
  }

  @Query(() => [TaxReportType], { name: 'taxReportsByTaxpayer' })
  async findByTaxpayerId(@Args('taxpayerId') taxpayerId: string) {
    return await this.taxReportsService.findAllByTaxpayerId(taxpayerId);
  }

  @Query(() => TaxReportType, { name: 'taxReport' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.taxReportsService.findOne(id);
  }

  @Query(() => TaxReportType, { name: 'taxReportDetailed' })
  async findOneDetailed(@Args('id', { type: () => Int }) id: number) {
    return await this.taxReportsService.findOneWithRelations(id);
  }

  @Mutation(() => TaxReportType)
  async updateTaxReport(
    @Args('updateTaxReportInput') updateTaxReportInput: UpdateTaxReportInput,
  ) {
    return await this.taxReportsService.update(
      updateTaxReportInput.id,
      updateTaxReportInput,
    );
  }

  @Mutation(() => TaxReportType)
  async removeTaxReport(@Args('id', { type: () => Int }) id: number) {
    return await this.taxReportsService.remove(id);
  }

  @ResolveField(() => [IncomeSource], { nullable: true })
  async incomeSources(@Parent() taxReport: TaxReportType) {
    const { id } = taxReport;
    if ('incomeSources' in taxReport) {
      return taxReport.incomeSources || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(id);
    return fullReport?.incomeSources || [];
  }

  @ResolveField(() => [Asset], { nullable: true })
  async assets(@Parent() taxReport: TaxReportType) {
    const { id } = taxReport;
    if ('assets' in taxReport) {
      return taxReport.assets || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(id);
    return fullReport?.assets || [];
  }

  @ResolveField(() => [Debt], { nullable: true })
  async debts(@Parent() taxReport: TaxReportType) {
    const { id } = taxReport;
    if ('debts' in taxReport) {
      return taxReport.debts || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(id);
    return fullReport?.debts || [];
  }

  @ResolveField(() => [Benefit], { nullable: true })
  async benefits(@Parent() taxReport: TaxReportType) {
    const { id } = taxReport;
    if ('benefits' in taxReport) {
      return taxReport.benefits || [];
    }
    const fullReport = await this.taxReportsService.findOneWithRelations(id);
    return fullReport?.benefits || [];
  }
}
