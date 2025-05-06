import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const UpdateVehicleSchema = z.object({
  id: z.number().int(),
  registrationNumber: z.string().optional(),
  purchaseYear: z.number().int().optional(),
  purchasePrice: z.number().positive().optional(),
  taxYear: z.number().int().optional(),
});

export class UpdateVehicleDto extends createZodDto(UpdateVehicleSchema) {}

@InputType()
export class UpdateVehicleInput extends createZodDto(UpdateVehicleSchema) {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  registrationNumber?: string;

  @Field(() => Int, { nullable: true })
  purchaseYear?: number;

  @Field(() => Float, { nullable: true })
  purchasePrice?: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;
}
