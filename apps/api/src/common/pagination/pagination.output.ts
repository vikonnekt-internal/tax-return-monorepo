import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { PageInfo } from './page-info.type';

const PaginationResponseSchema = z.object({
  totalCount: z.number(),
  pageInfo: z.object({
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean().optional(),
    startCursor: z.string().optional(),
    endCursor: z.string(),
  }),
});

export class PaginationResponseDto extends createZodDto(
  PaginationResponseSchema,
) {}

@ObjectType()
export class PaginationResultType {
  @Field()
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}

export class PaginationResult<T> {
  data: T[];
  pageInfo: PageInfo;
  totalCount: number;
}

export function PaginateResult<T>(
  ItemType: Type<T>,
): Type<PaginationResult<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field()
    totalCount: number;
  }

  return PageClass as Type<PaginationResult<T>>;
}
