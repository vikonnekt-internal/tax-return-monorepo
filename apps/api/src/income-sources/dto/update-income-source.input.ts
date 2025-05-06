import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateIncomeSourceSchema = z.object({
  id: z.number().int(),
  taxpayerId: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)')
    .optional(),
  taxReturnId: z.number().int().optional(),
  sourceName: z.string().optional(),
  sourceIdNumber: z.string().optional(),
  incomeType: z.string().optional(),
  amount: z.number().positive().optional(),
  taxYear: z.number().int().optional(),
});

export class UpdateIncomeSourceDto extends createZodDto(
  UpdateIncomeSourceSchema,
) {}

@InputType()
export class UpdateIncomeSourceInput extends createZodDto(
  UpdateIncomeSourceSchema,
) {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  taxpayerId?: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field({ nullable: true })
  sourceName?: string;

  @Field({ nullable: true })
  sourceIdNumber?: string;

  @Field({ nullable: true })
  incomeType?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
