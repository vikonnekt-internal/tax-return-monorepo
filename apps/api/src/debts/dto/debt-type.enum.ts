import { registerEnumType } from '@nestjs/graphql';

export enum DebtTypeEnum {
  HOUSING_LOAN = 'housing_loan',
  OTHER_DEBT = 'other_debt',
}

registerEnumType(DebtTypeEnum, {
  name: 'DebtType',
  description: 'The type of debt',
});
