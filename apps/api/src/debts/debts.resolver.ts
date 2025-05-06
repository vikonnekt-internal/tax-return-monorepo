import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Debt } from './debts.type';
import { DebtsService } from './debts.service';
import { CreateDebtInput } from './dto/create-debt.input';
import { UpdateDebtInput } from './dto/update-debt.input';

@Resolver(() => Debt)
export class DebtsResolver {
  constructor(private readonly debtsService: DebtsService) {}

  @Mutation(() => Debt)
  createDebt(@Args('createDebtInput') createDebtInput: CreateDebtInput) {
    return this.debtsService.create(createDebtInput);
  }

  @Query(() => [Debt], { name: 'debts' })
  findAll(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { type: () => Int }) taxYear: number,
  ) {
    return this.debtsService.findAll(taxpayerId, taxYear);
  }

  @Query(() => Debt, { name: 'debt' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.debtsService.findOne(id);
  }

  @Mutation(() => Debt)
  updateDebt(@Args('updateDebtInput') updateDebtInput: UpdateDebtInput) {
    return this.debtsService.update(updateDebtInput.id, updateDebtInput);
  }

  @Mutation(() => Debt)
  removeDebt(@Args('id', { type: () => Int }) id: number) {
    return this.debtsService.remove(id);
  }
}
