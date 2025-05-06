import { InputType, Field, Int } from '@nestjs/graphql';
import { UpdateRealEstateInput } from '../../real-estates/dto/update-real-estate.input';
import { UpdateVehicleInput } from '../../vehicles/dto/update-vehicle.input';
import { AssetTypeEnum } from './asset-type.enum';

@InputType()
export class UpdateAssetInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  taxpayerId?: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field(() => AssetTypeEnum, { nullable: true })
  assetType?: AssetTypeEnum;

  @Field(() => Int, { nullable: true })
  taxYear?: number;

  @Field(() => UpdateRealEstateInput, { nullable: true })
  realEstate?: UpdateRealEstateInput;

  @Field(() => UpdateVehicleInput, { nullable: true })
  vehicle?: UpdateVehicleInput;
}
