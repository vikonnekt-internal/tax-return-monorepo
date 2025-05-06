import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { OtherDebtType } from './other-debt-type.enum';

const CreateOtherDebtSchema = z.object({
  taxpayerId: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)'),
  taxReturnId: z.number().int().optional(),
  debtType: z.string().min(1),
  debtIdentifier: z.string().optional(),
  creditorName: z.string().min(1),
  interestExpenses: z.number().positive(),
  remainingBalance: z.number().positive(),
  taxYear: z.number().int(),
});

export class CreateOtherDebtDto extends createZodDto(CreateOtherDebtSchema) {}

@InputType()
export class CreateOtherDebtInput extends createZodDto(CreateOtherDebtSchema) {
  @Field()
  taxpayerId!: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field(() => OtherDebtType)
  debtType!: OtherDebtType;

  @Field({ nullable: true })
  debtIdentifier?: string;

  @Field()
  creditorName!: string;

  @Field(() => Float)
  interestExpenses!: number;

  @Field(() => Float)
  remainingBalance!: number;

  @Field(() => Int)
  taxYear!: number;
}
