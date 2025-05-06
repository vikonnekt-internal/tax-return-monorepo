import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const PaginationResponseSchema = z.object({
  limit: z.number(),
  skip: z.number(),
  totalCount: z.number(),
  hasNext: z.boolean(),
});

export class PaginationResponseDto extends createZodDto(
  PaginationResponseSchema,
) {}

@ObjectType()
export class PagingResultType {
  @Field()
  limit: number;

  @Field()
  skip: number;

  @Field()
  totalCount: number;

  @Field()
  hasNext: boolean;
}

export class PaginationResultType<T> {
  data: T[];
  paging: PagingResultType;
}

export function PaginateResult<T>(
  ItemType: Type<T>,
): Type<PaginationResultType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => PagingResultType)
    paging: PagingResultType;
  }

  return PageClass as Type<PaginationResultType<T>>;
}
