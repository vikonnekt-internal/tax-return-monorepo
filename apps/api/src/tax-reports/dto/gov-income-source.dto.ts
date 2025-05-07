import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovIncomeSourceSchema = z.object({
  sourceName: z.string(),
  sourceIdNumber: z.string().optional(),
  incomeType: z.string(),
  amount: z.number().positive(),
  isActive: z.boolean().default(true),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
});

export class GovIncomeSourceDto extends createZodDto(GovIncomeSourceSchema) {
  @ApiProperty({
    description: 'Name of the income source',
    example: 'Employer Corp',
    type: String,
  })
  sourceName: string;

  @ApiProperty({
    description: 'Identifier number for the income source',
    example: 'EMP12345',
    required: false,
    type: String,
  })
  sourceIdNumber?: string;

  @ApiProperty({
    description: 'Type of income',
    example: 'salary',
    type: String,
  })
  incomeType: string;

  @ApiProperty({
    description: 'Income amount',
    example: 75000,
    type: Number,
  })
  amount: number;

  @ApiProperty({
    description: 'Whether this income source is active',
    example: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tax year for this income',
    example: 2023,
    minimum: 2000,
    maximum: new Date().getFullYear() + 1,
    type: Number,
  })
  taxYear: number;
}
