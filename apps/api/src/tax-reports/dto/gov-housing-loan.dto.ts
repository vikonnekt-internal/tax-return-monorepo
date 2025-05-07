import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovHousingLoanSchema = z.object({
  lenderName: z.string(),
  lenderId: z.string().optional(),
  loanNumber: z.string(),
  propertyAddress: z.string(),
  loanTermYears: z.number().int().optional(),
  annualPayments: z.number().positive(),
  principalRepayment: z.number().positive(),
  interestExpenses: z.number().positive(),
  remainingBalance: z.number().positive(),
});

export class GovHousingLoanDto extends createZodDto(GovHousingLoanSchema) {
  @ApiProperty({
    description: 'Name of the lender',
    example: 'National Bank',
    type: String,
  })
  lenderName: string;

  @ApiProperty({
    description: 'Identifier of the lender',
    example: 'NB12345',
    required: false,
    type: String,
  })
  lenderId?: string;

  @ApiProperty({
    description: 'Loan reference number',
    example: 'LOAN987654',
    type: String,
  })
  loanNumber: string;

  @ApiProperty({
    description: 'Address of the property associated with the loan',
    example: '123 Main St, Anytown, AT 12345',
    type: String,
  })
  propertyAddress: string;

  @ApiProperty({
    description: 'Term of the loan in years',
    example: 30,
    required: false,
    type: Number,
  })
  loanTermYears?: number;

  @ApiProperty({
    description: 'Annual payment amount',
    example: 12000,
    type: Number,
  })
  annualPayments: number;

  @ApiProperty({
    description: 'Amount of principal repaid annually',
    example: 8000,
    type: Number,
  })
  principalRepayment: number;

  @ApiProperty({
    description: 'Amount of interest paid annually',
    example: 4000,
    type: Number,
  })
  interestExpenses: number;

  @ApiProperty({
    description: 'Remaining balance on the loan',
    example: 280000,
    type: Number,
  })
  remainingBalance: number;
}
