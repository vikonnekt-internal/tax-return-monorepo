import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType({ description: 'housing loan' })
export class HousingLoan {
  @Field(() => ID)
  id: number;

  @Field()
  taxpayerId: string;

  @Field()
  lenderName: string;

  @Field({ nullable: true })
  lenderId?: string;

  @Field()
  loanNumber: string;

  @Field()
  propertyAddress: string;

  @Field()
  loanDate: Date;

  @Field(() => Int, { nullable: true })
  loanTermYears?: number;

  @Field(() => Float)
  annualPayments: number;

  @Field(() => Float)
  principalRepayment: number;

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
