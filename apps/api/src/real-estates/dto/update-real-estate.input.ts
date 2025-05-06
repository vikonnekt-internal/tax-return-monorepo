import { InputType, Field, ID } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { createRealEstateSchema } from './create-real-estate.input';

export const updateRealEstateSchema = createRealEstateSchema.partial().extend({
  id: z.string().min(1),
});

export class UpdateRealEstateDto extends createZodDto(updateRealEstateSchema) {}

@InputType()
export class UpdateRealEstateInput extends createZodDto(
  updateRealEstateSchema,
) {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  propertyId?: string;

  @Field({ nullable: true })
  taxpayerId?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  propertyValue?: number;

  @Field({ nullable: true })
  purchaseYear?: number;

  @Field({ nullable: true })
  taxYear?: number;
}
