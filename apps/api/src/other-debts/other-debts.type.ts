import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType({ description: 'other debt' })
export class OtherDebt {
  @Field(() => ID)
  id: number;

  @Field()
  taxpayerId: string;

  @Field()
  debtType: string;

  @Field({ nullable: true })
  debtIdentifier?: string;

  @Field()
  creditorName: string;

  @Field(() => Float)
  interestExpenses: number;

  @Field(() => Float)
  remainingBalance: number;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}
