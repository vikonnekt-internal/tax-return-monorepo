import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  startCursor?: string;

  @Field()
  endCursor: string;

  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  hasPreviousPage?: boolean;
}
