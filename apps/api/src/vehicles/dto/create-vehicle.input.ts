import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateVehicleSchema = z.object({
  taxpayerId: z
    .string()
    .regex(/^\d{6}-?\d{4}$/, 'Invalid Icelandic ID format (kennitala)')
    .optional(),
  taxReturnId: z.number().int().optional(),
  registrationNumber: z.string().min(1),
  purchaseYear: z.number().int().optional(),
  purchasePrice: z.number().positive(),
  taxYear: z.number().int(),
});

export class CreateVehicleDto extends createZodDto(CreateVehicleSchema) {}

@InputType()
export class CreateVehicleInput extends createZodDto(CreateVehicleSchema) {
  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  registrationNumber!: string;

  @Field(() => Int, { nullable: true })
  purchaseYear?: number;

  @Field(() => Float)
  purchasePrice!: number;

  @Field(() => Int)
  taxYear!: number;
}
