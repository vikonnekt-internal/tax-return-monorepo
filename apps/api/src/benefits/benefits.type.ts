import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class Benefit {
  @Field(() => ID)
  id: number;

  @Field()
  taxpayerId: string;

  @Field()
  providerName: string;

  @Field()
  benefitType: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}
