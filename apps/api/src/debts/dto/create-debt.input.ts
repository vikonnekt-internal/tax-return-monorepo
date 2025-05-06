import { InputType, Field, Int } from '@nestjs/graphql';
import { CreateHousingLoanInput } from '../../housing-loans/dto/create-housing-loan.input';
import { CreateOtherDebtInput } from '../../other-debts/dto/create-other-debt.input';
import { DebtTypeEnum } from './debt-type.enum';

@InputType()
export class CreateDebtInput {
  @Field()
  taxpayerId: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field(() => DebtTypeEnum)
  debtType: DebtTypeEnum;

  @Field(() => Int)
  taxYear: number;

  @Field(() => CreateHousingLoanInput, { nullable: true })
  housingLoan?: CreateHousingLoanInput;

  @Field(() => CreateOtherDebtInput, { nullable: true })
  otherDebt?: CreateOtherDebtInput;
}
