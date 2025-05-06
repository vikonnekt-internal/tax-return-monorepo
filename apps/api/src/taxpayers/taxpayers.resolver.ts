import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaxpayersService } from './taxpayers.service';
import { Taxpayer } from './taxpayers.type';
import { CreateTaxpayerInput } from './dto/create-taxpayer.input';
import { UpdateTaxpayerInput } from './dto/update-taxpayer.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => Taxpayer)
export class TaxpayersResolver {
  constructor(private readonly taxpayersService: TaxpayersService) {}

  @Query(() => Taxpayer)
  @Roles('admin')
  async taxpayer(@Args('id') id: string) {
    return this.taxpayersService.getTaxpayer(id);
  }

  @Query(() => [Taxpayer])
  @Roles('admin')
  async taxpayers(
    @Args('taxYear', { nullable: true }) taxYear?: number,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return this.taxpayersService.getAllTaxpayers({ taxYear, skip, take });
  }

  @Mutation(() => Taxpayer)
  @Roles('admin')
  async createTaxpayer(
    @Args('input') createTaxpayerInput: CreateTaxpayerInput,
  ) {
    return this.taxpayersService.createTaxpayer(createTaxpayerInput);
  }

  @Mutation(() => Taxpayer)
  @Roles('admin')
  async updateTaxpayer(
    @Args('input') updateTaxpayerInput: UpdateTaxpayerInput,
  ) {
    return this.taxpayersService.updateTaxpayer(updateTaxpayerInput);
  }

  @Mutation(() => Taxpayer)
  @Roles('admin')
  async deleteTaxpayer(@Args('id') id: string) {
    return this.taxpayersService.deleteTaxpayer(id);
  }
}
