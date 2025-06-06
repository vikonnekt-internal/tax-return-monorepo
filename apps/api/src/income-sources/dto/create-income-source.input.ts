import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateIncomeSourceSchema = z.object({
  taxReturnId: z.number().int().optional(),
  sourceName: z.string().min(1),
  sourceIdNumber: z.string().optional(),
  incomeType: z.string().min(1),
  amount: z.number().positive(),
  taxYear: z.number().int(),
});

export class CreateIncomeSourceDto extends createZodDto(
  CreateIncomeSourceSchema,
) {}

@InputType()
export class CreateIncomeSourceInput extends createZodDto(
  CreateIncomeSourceSchema,
) {
  taxpayerId!: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  sourceName!: string;

  @Field({ nullable: true })
  sourceIdNumber?: string;

  @Field()
  incomeType!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => Int)
  taxYear!: number;
}
