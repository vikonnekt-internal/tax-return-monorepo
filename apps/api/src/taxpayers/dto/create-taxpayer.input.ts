import { Field, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateTaxpayerSchema = z.object({
  id: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)'),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  fullAddress: z.string().min(1),
  streetAddress: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  taxYear: z.number().int().positive(),
});

export class CreateTaxpayerDto extends createZodDto(CreateTaxpayerSchema) {}

@InputType()
export class CreateTaxpayerInput extends createZodDto(CreateTaxpayerSchema) {
  @Field()
  id!: string;

  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field()
  fullAddress!: string;

  @Field()
  streetAddress!: string;

  @Field()
  postalCode!: string;

  @Field()
  city!: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => Int)
  taxYear!: number;
}
