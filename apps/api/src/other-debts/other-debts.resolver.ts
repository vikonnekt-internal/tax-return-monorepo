import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OtherDebtsService } from './other-debts.service';
import { OtherDebt } from './other-debts.type';
import { CreateOtherDebtInput } from './dto/create-other-debt.input';
import { UpdateOtherDebtInput } from './dto/update-other-debt.input';

@Resolver(() => OtherDebt)
export class OtherDebtsResolver {
  constructor(private readonly otherDebtsService: OtherDebtsService) {}

  @Mutation(() => OtherDebt)
  createOtherDebt(
    @Args('createOtherDebtInput') createOtherDebtInput: CreateOtherDebtInput,
  ) {
    return this.otherDebtsService.create(createOtherDebtInput);
  }

  @Query(() => [OtherDebt], { name: 'otherDebts' })
  findAll(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { type: () => Int }) taxYear: number,
  ) {
    return this.otherDebtsService.findAll(taxpayerId, taxYear);
  }

  @Query(() => OtherDebt, { name: 'otherDebt' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.otherDebtsService.findOne(id);
  }

  @Mutation(() => OtherDebt)
  updateOtherDebt(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateOtherDebtInput') updateOtherDebtInput: UpdateOtherDebtInput,
  ) {
    return this.otherDebtsService.update(id, updateOtherDebtInput);
  }

  @Mutation(() => OtherDebt)
  removeOtherDebt(@Args('id', { type: () => Int }) id: number) {
    return this.otherDebtsService.remove(id);
  }
}
