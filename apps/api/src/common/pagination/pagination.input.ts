import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const PaginationInputSchema = z
  .object({
    limit: z.number().max(50).default(10).optional(),
    after: z.string().optional(),
    before: z.string().optional(),
  })
  .default({
    limit: 10,
  });

export class PaginationInputDto extends createZodDto(PaginationInputSchema) {
  @ApiProperty({
    description: 'Number of items to return (max 50)',
    example: 10,
    default: 10,
    required: false,
    maximum: 50,
    type: Number,
  })
  limit: number;

  @ApiProperty({
    description: 'Cursor for pagination - get items after this cursor',
    example: 'cursor123',
    required: false,
    type: String,
  })
  after?: string;

  @ApiProperty({
    description: 'Cursor for pagination - get items before this cursor',
    example: 'cursor123',
    required: false,
    type: String,
  })
  before?: string;
}

@InputType()
export class PaginationInput extends createZodDto(PaginationInputSchema) {
  @Field({ nullable: true })
  limit: number;

  @Field({ nullable: true })
  after?: string;

  @Field({ nullable: true })
  before?: string;
}
