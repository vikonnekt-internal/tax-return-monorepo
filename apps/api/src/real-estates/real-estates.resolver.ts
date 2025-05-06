import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RealEstatesService } from './real-estates.service';
import { RealEstate } from './real-estates.type';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { UpdateRealEstateInput } from './dto/update-real-estate.input';

@Resolver(() => RealEstate)
export class RealEstatesResolver {
  constructor(private readonly realEstatesService: RealEstatesService) {}

  @Mutation(() => RealEstate)
  createRealEstate(
    @Args('createRealEstateInput') createRealEstateInput: CreateRealEstateInput,
  ) {
    return this.realEstatesService.create(createRealEstateInput);
  }

  @Query(() => [RealEstate], { name: 'realEstates' })
  findAll(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { type: () => Int }) taxYear: number,
  ) {
    return this.realEstatesService.findAll(taxpayerId, taxYear);
  }

  @Query(() => RealEstate, { name: 'realEstate' })
  findOne(@Args('id') id: string) {
    return this.realEstatesService.findOne(id);
  }

  @Mutation(() => RealEstate)
  updateRealEstate(
    @Args('updateRealEstateInput') updateRealEstateInput: UpdateRealEstateInput,
  ) {
    return this.realEstatesService.update(
      updateRealEstateInput.id,
      updateRealEstateInput,
    );
  }

  @Mutation(() => RealEstate)
  removeRealEstate(@Args('id') id: string) {
    return this.realEstatesService.remove(id);
  }
}
