import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createBenefitSchema = z.object({
  taxpayerId: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)'),
  taxReturnId: z.number().int().optional(),
  providerName: z.string().min(1),
  benefitType: z.string().min(1),
  amount: z.number().positive(),
  taxYear: z.number().int().positive(),
});

export class CreateBenefitDto extends createZodDto(createBenefitSchema) {}

@InputType()
export class CreateBenefitInput extends createZodDto(createBenefitSchema) {
  @Field()
  taxpayerId!: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  providerName!: string;

  @Field()
  benefitType!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => Int)
  taxYear!: number;
}
