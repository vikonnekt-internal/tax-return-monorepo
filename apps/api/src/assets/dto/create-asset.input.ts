import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateRealEstateInput } from '../../real-estates/dto/create-real-estate.input';
import { CreateVehicleInput } from '../../vehicles/dto/create-vehicle.input';
import { AssetTypeEnum } from './asset-type.enum';

@InputType()
export class CreateAssetInput {
  @Field()
  taxpayerId: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field(() => AssetTypeEnum)
  assetType: AssetTypeEnum;

  @Field(() => Int)
  taxYear: number;

  @Field(() => CreateRealEstateInput, { nullable: true })
  realEstate?: CreateRealEstateInput;

  @Field(() => CreateVehicleInput, { nullable: true })
  vehicle?: CreateVehicleInput;
}
