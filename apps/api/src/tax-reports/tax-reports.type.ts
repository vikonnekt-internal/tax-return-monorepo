import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { Taxpayer } from '../taxpayers/taxpayers.type';
import { IncomeSource } from '../income-sources/income-sources.type';
import { Asset } from '../assets/assets.type';
import { Debt } from '../debts/debts.type';
import { Benefit } from '../benefits/benefits.type';
import { PaginateResult } from '../common/pagination/pagination.output';

@ObjectType()
export class TaxReportType {
  @Field(() => ID)
  id: number;

  @Field()
  taxYear: number;

  @Field({ nullable: true })
  userId?: number;

  @Field()
  status: string;

  @Field({ nullable: true })
  submissionDate?: Date;

  @Field({ nullable: true })
  notes?: string;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;

  @Field(() => Taxpayer, { nullable: true })
  taxpayer?: Taxpayer;

  @Field(() => [IncomeSource], { nullable: true })
  incomeSources?: IncomeSource[];

  @Field(() => [Asset], { nullable: true })
  assets?: Asset[];

  @Field(() => [Debt], { nullable: true })
  debts?: Debt[];

  @Field(() => [Benefit], { nullable: true })
  benefits?: Benefit[];
}

@ObjectType()
export class PaginatedTaxReportsType extends PaginateResult(TaxReportType) {}
