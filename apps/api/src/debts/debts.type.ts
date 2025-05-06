import { ObjectType, Field, Int } from '@nestjs/graphql';
import { HousingLoan } from '../housing-loans/housing-loans.type';
import { OtherDebt } from '../other-debts/other-debts.type';

@ObjectType()
export class Debt {
  @Field(() => Int)
  id: number;

  @Field()
  taxpayerId: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  debtType: string;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;

  @Field(() => HousingLoan, { nullable: true })
  housingLoan?: HousingLoan;

  @Field(() => OtherDebt, { nullable: true })
  otherDebt?: OtherDebt;
}
