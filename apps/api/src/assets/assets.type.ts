import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RealEstate } from '../real-estates/real-estates.type';
import { Vehicle } from '../vehicles/vehicles.type';

@ObjectType()
export class Asset {
  @Field(() => Int)
  id: number;

  @Field()
  taxpayerId: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  assetType: string;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;

  @Field(() => RealEstate, { nullable: true })
  realEstate?: RealEstate;

  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;
}
