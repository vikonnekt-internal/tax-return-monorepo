import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const CreateTaxReportSchema = z.object({
  taxpayerId: z.string().min(1, 'Taxpayer ID is required'),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  userId: z.number().int().optional(),
  status: z.string().optional().default('draft'),
  submissionDate: z.date().optional(),
  totalIncome: z.number().optional(),
  totalDeductions: z.number().optional(),
  totalTaxableIncome: z.number().optional(),
  totalTaxes: z.number().optional(),
  totalRefund: z.number().optional(),
  totalOwed: z.number().optional(),
  notes: z.string().optional(),
});

export class CreateTaxReportDto extends createZodDto(CreateTaxReportSchema) {}

@InputType()
export class CreateTaxReportInput extends createZodDto(CreateTaxReportSchema) {
  @Field()
  taxpayerId!: string;

  @Field(() => Int)
  taxYear!: number;

  @Field(() => Int, { nullable: true })
  userId?: number;

  @Field({ defaultValue: 'draft', nullable: true })
  status!: string;

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
