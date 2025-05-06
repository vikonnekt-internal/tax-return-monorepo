import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class RealEstate {
  @Field(() => ID)
  id: string;

  @Field()
  taxpayerId: string;

  @Field()
  address: string;

  @Field(() => Float)
  propertyValue: number;

  @Field(() => Int, { nullable: true })
  purchaseYear?: number;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}
