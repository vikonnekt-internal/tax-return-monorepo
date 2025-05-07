import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ApiProperty } from '@nestjs/swagger';

const UpdateTaxReportSchema = z.object({
  id: z.number().int().positive(),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1)
    .optional(),
  status: z.string().optional(),
  submissionDate: z.date().optional(),
  totalIncome: z.number().optional(),
  totalDeductions: z.number().optional(),
  totalTaxableIncome: z.number().optional(),
  totalTaxes: z.number().optional(),
  totalRefund: z.number().optional(),
  totalOwed: z.number().optional(),
  notes: z.string().optional(),
});

export class UpdateTaxReportDto extends createZodDto(UpdateTaxReportSchema) {
  @ApiProperty({
    description: 'The tax report ID',
    example: 1,
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: 'The tax year for the report',
    example: 2023,
    minimum: 2000,
    maximum: new Date().getFullYear() + 1,
    required: false,
    type: Number,
  })
  taxYear?: number;

  @ApiProperty({
    description: 'Current status of the tax report',
    example: 'submitted',
    required: false,
    type: String,
  })
  status?: string;

  @ApiProperty({
    description: 'Submission date of the tax report',
    example: '2023-12-31T23:59:59Z',
    required: false,
    type: Date,
  })
  submissionDate?: Date;

  @ApiProperty({
    description: 'Total income amount',
    example: 75000,
    required: false,
    type: Number,
  })
  totalIncome?: number;

  @ApiProperty({
    description: 'Total deductions amount',
    example: 15000,
    required: false,
    type: Number,
  })
  totalDeductions?: number;

  @ApiProperty({
    description: 'Total taxable income amount',
    example: 60000,
    required: false,
    type: Number,
  })
  totalTaxableIncome?: number;

  @ApiProperty({
    description: 'Total taxes amount',
    example: 12000,
    required: false,
    type: Number,
  })
  totalTaxes?: number;

  @ApiProperty({
    description: 'Total refund amount',
    example: 2000,
    required: false,
    type: Number,
  })
  totalRefund?: number;

  @ApiProperty({
    description: 'Total amount owed',
    example: 0,
    required: false,
    type: Number,
  })
  totalOwed?: number;

  @ApiProperty({
    description: 'Additional notes for the tax report',
    example: 'Including foreign income',
    required: false,
    type: String,
  })
  notes?: string;
}

@InputType()
export class UpdateTaxReportInput extends createZodDto(UpdateTaxReportSchema) {
  @Field(() => Int)
  id!: number;

  @Field(() => Int, { nullable: true })
  taxYear?: number;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  submissionDate?: Date;

  @Field(() => Float, { nullable: true })
  totalIncome?: number;

  @Field(() => Float, { nullable: true })
  totalDeductions?: number;

  @Field(() => Float, { nullable: true })
  totalTaxableIncome?: number;

  @Field(() => Float, { nullable: true })
  totalTaxes?: number;

  @Field(() => Float, { nullable: true })
  totalRefund?: number;

  @Field(() => Float, { nullable: true })
  totalOwed?: number;

  @Field({ nullable: true })
  notes?: string;
}
