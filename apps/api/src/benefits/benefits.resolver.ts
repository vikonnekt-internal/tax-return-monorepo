import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BenefitsService } from './benefits.service';
import { Benefit } from './benefits.type';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';

@Resolver(() => Benefit)
export class BenefitsResolver {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Mutation(() => Benefit)
  createBenefit(
    @Args('createBenefitInput') createBenefitInput: CreateBenefitInput,
  ) {
    return this.benefitsService.create(createBenefitInput);
  }

  @Query(() => [Benefit], { name: 'benefits' })
  findAll(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { type: () => Int }) taxYear: number,
  ) {
    return this.benefitsService.findAll(taxpayerId, taxYear);
  }

  @Query(() => Benefit, { name: 'benefit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.benefitsService.findOne(id);
  }

  @Mutation(() => Benefit)
  updateBenefit(
    @Args('updateBenefitInput') updateBenefitInput: UpdateBenefitInput,
  ) {
    return this.benefitsService.update(
      updateBenefitInput.id,
      updateBenefitInput,
    );
  }

  @Mutation(() => Benefit)
  removeBenefit(@Args('id', { type: () => Int }) id: number) {
    return this.benefitsService.remove(id);
  }
}
