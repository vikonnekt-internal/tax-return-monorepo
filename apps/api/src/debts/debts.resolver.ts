import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Debt, PaginatedDebtsType } from './debts.type';
import { DebtsService } from './debts.service';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HousingLoan } from '../housing-loans/housing-loans.type';
import { OtherDebt } from '../other-debts/other-debts.type';

@Resolver(() => Debt)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class DebtsResolver {
  constructor(private readonly debtsService: DebtsService) {}

  @Mutation(() => Debt)
  createDebt(
    @Args('createDebtInput') createDebtInput: CreateDebtInput,
    @CurrentUser() user: UserEntity,
  ) {
    // Override taxpayerId with the user's ID
    createDebtInput.taxpayerId = user.taxpayerId;
    return this.debtsService.create(createDebtInput);
  }

  @Query(() => PaginatedDebtsType, { name: 'debts' })
  findAll(
    @Args('taxYear', { type: () => Int }) taxYear: number,
    @CurrentUser() user: UserEntity,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    return this.debtsService.findAll(user.taxpayerId, taxYear, paginationInput);
  }

  @Query(() => Debt, { name: 'debt' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.debtsService.findOne(id, user.taxpayerId);
  }

  @Mutation(() => Debt)
  updateDebt(
    @Args('updateDebtInput') updateDebtInput: UpdateDebtInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.debtsService.update(
      updateDebtInput.id,
      updateDebtInput,
      user.taxpayerId,
    );
  }

  @Mutation(() => Debt)
  removeDebt(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.debtsService.remove(id, user.taxpayerId);
  }

  @ResolveField(() => HousingLoan, { nullable: true })
  async housingLoan(@Parent() debt: Debt) {
    if (debt.debtType?.toLowerCase() !== 'housing_loan') return null;
    return await this.debtsService.getHousingLoan(debt.id);
  }

  @ResolveField(() => OtherDebt, { nullable: true })
  async otherDebt(@Parent() debt: Debt) {
    if (debt.debtType?.toLowerCase() !== 'other_debt') return null;
    return await this.debtsService.getOtherDebt(debt.id);
  }

  @ResolveField('debtType', () => String)
  getDebtType(@Parent() debt: Debt) {
    // Convert from database format (lowercase with underscore) to API format (uppercase with underscore)
    return debt.debtType.toUpperCase();
  }
}
