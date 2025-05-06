import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateHousingLoanSchema = z.object({
  id: z.number().int(),
  lenderName: z.string().optional(),
  lenderId: z.string().optional(),
  loanNumber: z.string().optional(),
  propertyAddress: z.string().optional(),
  loanDate: z.string().optional(),
  loanTermYears: z.number().int().optional(),
  annualPayments: z.number().positive().optional(),
  principalRepayment: z.number().positive().optional(),
  interestExpenses: z.number().positive().optional(),
  remainingBalance: z.number().positive().optional(),
  taxYear: z.number().int().optional(),
});

export class UpdateHousingLoanDto extends createZodDto(
  UpdateHousingLoanSchema,
) {}

@InputType()
export class UpdateHousingLoanInput extends createZodDto(
  UpdateHousingLoanSchema,
) {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  lenderName?: string;

  @Field({ nullable: true })
  lenderId?: string;

  @Field({ nullable: true })
  loanNumber?: string;

  @Field({ nullable: true })
  propertyAddress?: string;

  @Field({ nullable: true })
  loanDate?: string;

  @Field(() => Int, { nullable: true })
  loanTermYears?: number;

  @Field(() => Float, { nullable: true })
  annualPayments?: number;

  @Field(() => Float, { nullable: true })
  principalRepayment?: number;

  @Field(() => Float, { nullable: true })
  interestExpenses?: number;

  @Field(() => Float, { nullable: true })
  remainingBalance?: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
