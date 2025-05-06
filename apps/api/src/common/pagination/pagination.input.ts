import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PaginationInputSchema = z
  .object({
    limit: z.number().max(50).default(10).optional(),
    skip: z.number().default(0).optional(),
  })
  .default({
    limit: 10,
    skip: 0,
  });

export class PaginationInputDto extends createZodDto(PaginationInputSchema) {}

@InputType()
export class PaginationInput extends createZodDto(PaginationInputSchema) {
  @Field({ nullable: true })
  limit: number;
  @Field({ nullable: true })
  skip: number;
}
