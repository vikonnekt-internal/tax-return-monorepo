import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const PaginationInputSchema = z
  .object({
    limit: z.number().max(50).default(10).optional(),
    after: z.string().optional(),
    before: z.string().optional(),
  })
  .default({
    limit: 10,
  });

export class PaginationInputDto extends createZodDto(PaginationInputSchema) {}

@InputType()
export class PaginationInput extends createZodDto(PaginationInputSchema) {
  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
