import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { OtherDebtType } from './other-debt-type.enum';

const UpdateOtherDebtSchema = z.object({
  id: z.number().int(),
  debtType: z.string().optional(),
  debtIdentifier: z.string().optional(),
  creditorName: z.string().optional(),
  interestExpenses: z.number().positive().optional(),
  remainingBalance: z.number().positive().optional(),
  taxYear: z.number().int().optional(),
});

export class UpdateOtherDebtDto extends createZodDto(UpdateOtherDebtSchema) {}

@InputType()
export class UpdateOtherDebtInput extends createZodDto(UpdateOtherDebtSchema) {
  @Field(() => Int)
  id!: number;

  @Field(() => OtherDebtType, { nullable: true })
  debtType?: OtherDebtType;

  @Field({ nullable: true })
  debtIdentifier?: string;

  @Field({ nullable: true })
  creditorName?: string;

  @Field(() => Float, { nullable: true })
  interestExpenses?: number;

  @Field(() => Float, { nullable: true })
  remainingBalance?: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
