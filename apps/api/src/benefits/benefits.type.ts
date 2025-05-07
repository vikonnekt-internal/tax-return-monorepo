import { Field, Int, ObjectType, Float } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';

@ObjectType()
export class Benefit {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  taxReturnId?: number;

  @Field()
  providerName: string;

  @Field()
  benefitType: string;

  @Field()
  description: string;

  @Field(() => Float)
  amount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PaginatedBenefitsType extends PaginateResult(Benefit) {}
