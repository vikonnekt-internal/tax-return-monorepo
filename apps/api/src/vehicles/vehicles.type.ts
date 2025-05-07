import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';

@ObjectType({ description: 'vehicle' })
export class Vehicle {
  @Field(() => ID)
  id: number;

  @Field()
  taxpayerId: string;

  @Field()
  registrationNumber: string;

  @Field(() => Int, { nullable: true })
  purchaseYear?: number;

  @Field(() => Float)
  purchasePrice: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}
@ObjectType()
export class PaginatedVehiclesType extends PaginateResult(Vehicle) {}
