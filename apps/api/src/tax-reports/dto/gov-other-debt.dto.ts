import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovOtherDebtSchema = z.object({
  debtType: z.string(),
  debtIdentifier: z.string().optional(),
  creditorName: z.string(),
  interestExpenses: z.number().positive(),
  remainingBalance: z.number().positive(),
});

export class GovOtherDebtDto extends createZodDto(GovOtherDebtSchema) {
  @ApiProperty({
    description: 'Type of debt',
    example: 'student_loan',
    type: String,
  })
  debtType: string;

  @ApiProperty({
    description: 'Identifier for the debt',
    example: 'SL12345',
    required: false,
    type: String,
  })
  debtIdentifier?: string;

  @ApiProperty({
    description: 'Name of the creditor',
    example: 'Student Loan Agency',
    type: String,
  })
  creditorName: string;

  @ApiProperty({
    description: 'Annual interest expenses',
    example: 1200,
    type: Number,
  })
  interestExpenses: number;

  @ApiProperty({
    description: 'Remaining balance on the debt',
    example: 25000,
    type: Number,
  })
  remainingBalance: number;
}
