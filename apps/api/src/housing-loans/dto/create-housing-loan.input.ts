import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateHousingLoanSchema = z.object({
  taxpayerId: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)'),
  taxReturnId: z.number().int().optional(),
  lenderName: z.string().min(1),
  lenderId: z.string().optional(),
  loanNumber: z.string().min(1),
  propertyAddress: z.string().min(1),
  loanDate: z.string().min(1),
  loanTermYears: z.number().int().optional(),
  annualPayments: z.number().positive(),
  principalRepayment: z.number().positive(),
  interestExpenses: z.number().positive(),
  remainingBalance: z.number().positive(),
  taxYear: z.number().int(),
});

export class CreateHousingLoanDto extends createZodDto(
  CreateHousingLoanSchema,
) {}

@InputType()
export class CreateHousingLoanInput extends createZodDto(
  CreateHousingLoanSchema,
) {
  @Field()
  taxpayerId!: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  lenderName!: string;

  @Field({ nullable: true })
  lenderId?: string;

  @Field()
  loanNumber!: string;

  @Field()
  propertyAddress!: string;

  @Field()
  loanDate!: string;

  @Field(() => Int, { nullable: true })
  loanTermYears?: number;

  @Field(() => Float)
  annualPayments!: number;

  @Field(() => Float)
  principalRepayment!: number;

  @Field(() => Float)
  interestExpenses!: number;

  @Field(() => Float)
  remainingBalance!: number;

  @Field(() => Int)
  taxYear!: number;
}
