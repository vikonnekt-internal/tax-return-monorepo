import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

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

export class UpdateTaxReportDto extends createZodDto(UpdateTaxReportSchema) {}

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
