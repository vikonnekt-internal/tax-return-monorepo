import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';
import { RealEstate } from '../real-estates/real-estates.type';
import { Vehicle } from '../vehicles/vehicles.type';

@ObjectType()
export class Asset {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  taxpayerId: string;

  @Field()
  assetType: string;

  @Field(() => Int, { nullable: true })
  realEstateId?: number;

  @Field(() => Int, { nullable: true })
  vehicleId?: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;

  @Field(() => RealEstate, { nullable: true })
  realEstate?: RealEstate;

  @Field(() => Vehicle, { nullable: true })
  vehicle?: Vehicle;
}

@ObjectType()
export class PaginatedAssetsType extends PaginateResult(Asset) {}
