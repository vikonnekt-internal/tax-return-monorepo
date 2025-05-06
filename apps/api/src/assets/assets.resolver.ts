import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Asset } from './assets.type';
import { AssetsService } from './assets.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';

@Resolver(() => Asset)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation(() => Asset)
  createAsset(@Args('createAssetInput') createAssetInput: CreateAssetInput) {
    return this.assetsService.create(createAssetInput);
  }

  @Query(() => [Asset], { name: 'assets' })
  findAll(
    @Args('taxpayerId') taxpayerId: string,
    @Args('taxYear', { type: () => Int }) taxYear: number,
  ) {
    return this.assetsService.findAll(taxpayerId, taxYear);
  }

  @Query(() => Asset, { name: 'asset' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assetsService.findOne(id);
  }

  @Mutation(() => Asset)
  updateAsset(@Args('updateAssetInput') updateAssetInput: UpdateAssetInput) {
    return this.assetsService.update(updateAssetInput.id, updateAssetInput);
  }

  @Mutation(() => Asset)
  removeAsset(@Args('id', { type: () => Int }) id: number) {
    return this.assetsService.remove(id);
  }
}
