import { Field, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateTaxpayerSchema = z.object({
  id: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fullAddress: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  taxYear: z.number().int().optional(),
});

export class UpdateTaxpayerDto extends createZodDto(UpdateTaxpayerSchema) {}

@InputType()
export class UpdateTaxpayerInput extends createZodDto(UpdateTaxpayerSchema) {
  @Field()
  id!: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  fullAddress?: string;

  @Field({ nullable: true })
  streetAddress?: string;

  @Field({ nullable: true })
  postalCode?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
