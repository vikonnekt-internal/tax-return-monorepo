import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { IncomeSourcesService } from './income-sources.service';
import {
  IncomeSource,
  PaginatedIncomeSourcesType,
} from './income-sources.type';
import { CreateIncomeSourceInput } from './dto/create-income-source.input';
import { UpdateIncomeSourceInput } from './dto/update-income-source.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => IncomeSource)
@Roles('admin', 'user')
export class IncomeSourcesResolver {
  constructor(private readonly incomeSourcesService: IncomeSourcesService) {}

  @Query(() => IncomeSource)
  async incomeSource(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.getIncomeSource(id, user.id);
  }

  @Query(() => PaginatedIncomeSourcesType)
  async incomeSources(
    @CurrentUser() user: UserEntity,
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
    @Args('incomeType', { nullable: true }) incomeType?: string,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    return this.incomeSourcesService.getAllIncomeSources(
      {
        taxYear,
        incomeType,
      },
      paginationInput,
      user.id,
    );
  }

  @Query(() => PaginatedIncomeSourcesType)
  async incomeSourcesByTaxpayer(
    @CurrentUser() user: UserEntity,
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    // Always use the user's ID as taxpayerId
    return this.incomeSourcesService.getIncomeSourcesByTaxpayer(
      user.id.toString(),
      taxYear,
      paginationInput,
      user.id,
    );
  }

  @Query(() => PaginatedIncomeSourcesType)
  async incomeSourcesByTaxReturn(
    @CurrentUser() user: UserEntity,
    @Args('taxReturnId', { type: () => Int }) taxReturnId: number,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    return this.incomeSourcesService.getIncomeSourcesByTaxReturn(
      taxReturnId,
      paginationInput,
      user.id,
    );
  }

  @Mutation(() => IncomeSource)
  async createIncomeSource(
    @Args('input') createIncomeSourceInput: CreateIncomeSourceInput,
    @CurrentUser() user: UserEntity,
  ) {
    // Always use user.id as taxpayerId
    return this.incomeSourcesService.createIncomeSource(
      {
        ...createIncomeSourceInput,
        taxpayerId: user.taxpayerId,
      },
      user.id,
    );
  }

  @Mutation(() => IncomeSource)
  async updateIncomeSource(
    @Args('input') updateIncomeSourceInput: UpdateIncomeSourceInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.updateIncomeSource(
      updateIncomeSourceInput,
      user.id,
    );
  }

  @Mutation(() => IncomeSource)
  async deleteIncomeSource(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.deleteIncomeSource(id, user.id);
  }

  @Mutation(() => [IncomeSource])
  async associateIncomeSourcesWithTaxReturn(
    @Args('incomeSourceIds', { type: () => [Int] }) incomeSourceIds: number[],
    @Args('taxReturnId', { type: () => Int }) taxReturnId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.incomeSourcesService.associateWithTaxReturn(
      incomeSourceIds,
      taxReturnId,
      user.id,
    );
  }

  @ResolveField('incomeType', () => String)
  getIncomeType(@Parent() incomeSource: IncomeSource) {
    // Convert from database format to API format (uppercase)
    return incomeSource.incomeType.toUpperCase();
  }
}
