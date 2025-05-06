import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';

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

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}
