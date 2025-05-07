import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BenefitsService } from './benefits.service';
import { Benefit, PaginatedBenefitsType } from './benefits.type';
import { CreateBenefitInput } from './dto/create-benefit.input';
import { UpdateBenefitInput } from './dto/update-benefit.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Benefit)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class BenefitsResolver {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Mutation(() => Benefit)
  createBenefit(
    @Args('createBenefitInput') createBenefitInput: CreateBenefitInput,
    @CurrentUser() user: UserEntity,
  ) {
    createBenefitInput.taxpayerId = user.taxpayerId;
    return this.benefitsService.create(createBenefitInput);
  }

  @Query(() => PaginatedBenefitsType, { name: 'benefits' })
  findAll(
    @Args('taxYear', { type: () => Int }) taxYear: number,
    @CurrentUser() user: UserEntity,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    return this.benefitsService.findAll(
      user.taxpayerId,
      taxYear,
      paginationInput,
    );
  }

  @Query(() => Benefit, { name: 'benefit' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.benefitsService.findOne(id, user.taxpayerId);
  }

  @Mutation(() => Benefit)
  updateBenefit(
    @Args('updateBenefitInput') updateBenefitInput: UpdateBenefitInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.benefitsService.update(
      updateBenefitInput.id,
      updateBenefitInput,
      user.taxpayerId,
    );
  }

  @Mutation(() => Benefit)
  removeBenefit(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.benefitsService.remove(id, user.taxpayerId);
  }

  @ResolveField('benefitType', () => String)
  getBenefitType(@Parent() benefit: Benefit) {
    // Convert from database format to API format (uppercase)
    return benefit.benefitType.toUpperCase();
  }
}
