import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Asset, PaginatedAssetsType } from './assets.type';
import { AssetsService } from './assets.service';
import { CreateAssetInput } from './dto/create-asset.input';
import { UpdateAssetInput } from './dto/update-asset.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserEntity } from '../auth/entities/user-entities';
import { PaginationInput } from '../common/pagination/pagination.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Asset)
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'user')
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Mutation(() => Asset)
  createAsset(
    @Args('createAssetInput') createAssetInput: CreateAssetInput,
    @CurrentUser() user: UserEntity,
  ) {
    createAssetInput.taxpayerId = user.taxpayerId;
    return this.assetsService.create(createAssetInput);
  }

  @Query(() => PaginatedAssetsType, { name: 'assets' })
  findAll(
    @Args('taxYear', { type: () => Int }) taxYear: number,
    @CurrentUser() user: UserEntity,
    @Args('paginationInput', { nullable: true })
    paginationInput?: PaginationInput,
  ) {
    return this.assetsService.findAll(
      user.taxpayerId,
      taxYear,
      paginationInput,
    );
  }

  @Query(() => Asset, { name: 'asset' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.assetsService.findOne(id, user.taxpayerId);
  }

  @Mutation(() => Asset)
  updateAsset(
    @Args('updateAssetInput') updateAssetInput: UpdateAssetInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.assetsService.update(
      updateAssetInput.id,
      updateAssetInput,
      user.taxpayerId,
    );
  }

  @Mutation(() => Asset)
  removeAsset(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.assetsService.remove(id, user.taxpayerId);
  }

  @ResolveField('realEstateId', () => Int, { nullable: true })
  getRealEstateId(@Parent() asset: Asset) {
    return asset.realEstate?.id || null;
  }

  @ResolveField('vehicleId', () => Int, { nullable: true })
  getVehicleId(@Parent() asset: Asset) {
    return asset.vehicle?.id || null;
  }

  @ResolveField('assetType', () => String)
  getAssetType(@Parent() asset: Asset) {
    // Convert from database format (lowercase with underscore) to API format (uppercase with underscore)
    return asset.assetType.toUpperCase();
  }
}
