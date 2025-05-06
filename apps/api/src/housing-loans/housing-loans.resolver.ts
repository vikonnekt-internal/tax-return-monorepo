import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HousingLoansService } from './housing-loans.service';
import { HousingLoan } from './housing-loans.type';
import { CreateHousingLoanInput } from './dto/create-housing-loan.input';
import { UpdateHousingLoanInput } from './dto/update-housing-loan.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => HousingLoan)
export class HousingLoansResolver {
  constructor(private readonly housingLoansService: HousingLoansService) {}

  @Query(() => HousingLoan)
  @Roles('admin')
  async housingLoan(@Args('id', { type: () => Int }) id: number) {
    return this.housingLoansService.getHousingLoan(id);
  }

  @Query(() => [HousingLoan])
  @Roles('admin')
  async housingLoans(
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    return this.housingLoansService.getAllHousingLoans({ taxYear, skip, take });
  }

  @Query(() => [HousingLoan])
  @Roles('admin')
  async housingLoansByTaxpayer(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { nullable: true, type: () => Int }) taxYear?: number,
  ) {
    return this.housingLoansService.getHousingLoansByTaxpayer(
      taxpayerId,
      taxYear,
    );
  }

  @Mutation(() => HousingLoan)
  @Roles('admin')
  async createHousingLoan(
    @Args('input') createHousingLoanInput: CreateHousingLoanInput,
  ) {
    return this.housingLoansService.createHousingLoan(createHousingLoanInput);
  }

  @Mutation(() => HousingLoan)
  @Roles('admin')
  async updateHousingLoan(
    @Args('input') updateHousingLoanInput: UpdateHousingLoanInput,
  ) {
    return this.housingLoansService.updateHousingLoan(updateHousingLoanInput);
  }

  @Mutation(() => HousingLoan)
  @Roles('admin')
  async deleteHousingLoan(@Args('id', { type: () => Int }) id: number) {
    return this.housingLoansService.deleteHousingLoan(id);
  }
}
