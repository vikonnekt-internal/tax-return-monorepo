import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createRealEstateSchema = z.object({
  propertyId: z.string().min(1),
  taxpayerId: z.string().min(1),
  taxReturnId: z.number().int().optional(),
  address: z.string().min(1),
  propertyValue: z.number().positive(),
  purchaseYear: z.number().int().positive().optional(),
  taxYear: z.number().int().positive(),
});

export class CreateRealEstateDto extends createZodDto(createRealEstateSchema) {}

@InputType()
export class CreateRealEstateInput extends createZodDto(
  createRealEstateSchema,
) {
  @Field()
  propertyId!: string;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  address!: string;

  @Field(() => Float)
  propertyValue!: number;

  @Field(() => Int, { nullable: true })
  purchaseYear?: number;

  @Field(() => Int)
  taxYear!: number;

  @Field(() => Number, { nullable: true })
  assetId?: number;
}
