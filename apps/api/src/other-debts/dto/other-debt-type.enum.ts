import { registerEnumType } from '@nestjs/graphql';

export enum OtherDebtType {
  STUDENT_LOAN = 'student_loan',
  PERSONAL_LOAN = 'personal_loan',
  CREDIT_CARD = 'credit_card',
  CAR_LOAN = 'car_loan',
  OTHER = 'other',
}

registerEnumType(OtherDebtType, {
  name: 'OtherDebtType',
  description: 'The type of other debt',
});
