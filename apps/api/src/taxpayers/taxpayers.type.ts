import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { PaginateResult } from '../common/pagination/pagination.output';

@ObjectType({ description: 'taxpayer' })
export class Taxpayer {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  fullAddress: string;

  @Field()
  streetAddress: string;

  @Field()
  postalCode: string;

  @Field()
  city: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => Int)
  taxYear: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateModified: Date;
}

@ObjectType()
export class PaginatedTaxpayersType extends PaginateResult(Taxpayer) {}
