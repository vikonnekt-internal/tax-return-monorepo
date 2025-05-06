import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IncomeSourcesService } from './income-sources.service';
import { IncomeSource } from './income-sources.type';
import { CreateIncomeSourceInput } from './dto/create-income-source.input';
import { UpdateIncomeSourceInput } from './dto/update-income-source.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => IncomeSource)
export class IncomeSourcesResolver {
  constructor(private readonly incomeSourcesService: IncomeSourcesService) {}

  @Query(() => IncomeSource)
  @Roles('admin')
  async incomeSource(@Args('id', { type: () => Int }) id: number) {
    return this.incomeSourcesService.getIncomeSource(id);
  }

  @Query(() => [IncomeSource])
  @Roles('admin')
  async incomeSources(
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
    @Args('incomeType', { nullable: true }) incomeType?: string,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    return this.incomeSourcesService.getAllIncomeSources({
      taxYear,
      incomeType,
      skip,
      take,
    });
  }

  @Query(() => [IncomeSource])
  @Roles('admin')
  async incomeSourcesByTaxpayer(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
  ) {
    return this.incomeSourcesService.getIncomeSourcesByTaxpayer(
      taxpayerId,
      taxYear,
    );
  }

  @Query(() => [IncomeSource])
  @Roles('admin')
  async incomeSourcesByTaxReturn(
    @Args('taxReturnId', { type: () => Int }) taxReturnId: number,
  ) {
    return this.incomeSourcesService.getIncomeSourcesByTaxReturn(taxReturnId);
  }

  @Mutation(() => IncomeSource)
  @Roles('admin')
  async createIncomeSource(
    @Args('input') createIncomeSourceInput: CreateIncomeSourceInput,
  ) {
    return this.incomeSourcesService.createIncomeSource(
      createIncomeSourceInput,
    );
  }

  @Mutation(() => IncomeSource)
  @Roles('admin')
  async updateIncomeSource(
    @Args('input') updateIncomeSourceInput: UpdateIncomeSourceInput,
  ) {
    return this.incomeSourcesService.updateIncomeSource(
      updateIncomeSourceInput,
    );
  }

  @Mutation(() => IncomeSource)
  @Roles('admin')
  async deleteIncomeSource(@Args('id', { type: () => Int }) id: number) {
    return this.incomeSourcesService.deleteIncomeSource(id);
  }

  @Mutation(() => [IncomeSource])
  @Roles('admin')
  async associateIncomeSourcesWithTaxReturn(
    @Args('incomeSourceIds', { type: () => [Int] }) incomeSourceIds: number[],
    @Args('taxReturnId', { type: () => Int }) taxReturnId: number,
  ) {
    return this.incomeSourcesService.associateWithTaxReturn(
      incomeSourceIds,
      taxReturnId,
    );
  }

  @Query(() => [IncomeSource])
  @Roles('admin')
  async findAll(
    @Args('taxYear', { type: () => Int, nullable: true }) taxYear?: number,
    @Args('incomeType', { nullable: true }) incomeType?: string,
    @Args('taxReturnId', { type: () => Int, nullable: true })
    taxReturnId?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
    @Args('take', { type: () => Int, nullable: true }) take?: number,
  ) {
    return this.incomeSourcesService.getAllIncomeSources({
      taxYear,
      incomeType,
      taxReturnId,
      skip,
      take,
    });
  }
}
