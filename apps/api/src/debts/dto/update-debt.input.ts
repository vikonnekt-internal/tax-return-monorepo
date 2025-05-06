import { InputType, Field, Int } from '@nestjs/graphql';
import { UpdateHousingLoanInput } from '../../housing-loans/dto/update-housing-loan.input';
import { UpdateOtherDebtInput } from '../../other-debts/dto/update-other-debt.input';
import { DebtTypeEnum } from './debt-type.enum';

@InputType()
export class UpdateDebtInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  taxpayerId?: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field(() => DebtTypeEnum, { nullable: true })
  debtType?: DebtTypeEnum;

  @Field(() => Int, { nullable: true })
  taxYear?: number;

  @Field(() => UpdateHousingLoanInput, { nullable: true })
  housingLoan?: UpdateHousingLoanInput;

  @Field(() => UpdateOtherDebtInput, { nullable: true })
  otherDebt?: UpdateOtherDebtInput;
}
