import { Field, ID, Int, ObjectType, Float } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';

@ObjectType({ description: 'income source' })
export class IncomeSource {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  taxpayerId: string;

  @Field()
  sourceName: string;

  @Field({ nullable: true })
  sourceIdNumber?: string;

  @Field()
  incomeType: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}

@ObjectType()
export class PaginatedIncomeSourcesType extends PaginateResult(IncomeSource) {}
