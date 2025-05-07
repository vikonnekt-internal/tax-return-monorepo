import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { createBenefitSchema } from './create-benefit.input';

export const updateBenefitSchema = createBenefitSchema
  .extend({
    id: z.number().positive(),
  })
  .partial()
  .required({ id: true });

export class UpdateBenefitDto extends createZodDto(updateBenefitSchema) {}

@InputType()
export class UpdateBenefitInput extends createZodDto(updateBenefitSchema) {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  taxpayerId?: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field({ nullable: true })
  providerName?: string;

  @Field({ nullable: true })
  benefitType?: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
