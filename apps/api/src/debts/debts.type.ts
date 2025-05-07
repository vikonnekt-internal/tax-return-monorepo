import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';
import { HousingLoan } from '../housing-loans/housing-loans.type';
import { OtherDebt } from '../other-debts/other-debts.type';

@ObjectType()
export class Debt {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  creditorName: string;

  @Field()
  debtType: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => HousingLoan, { nullable: true })
  housingLoan?: HousingLoan;

  @Field(() => OtherDebt, { nullable: true })
  otherDebt?: OtherDebt;
}

@ObjectType()
export class PaginatedDebtsType extends PaginateResult(Debt) {}
