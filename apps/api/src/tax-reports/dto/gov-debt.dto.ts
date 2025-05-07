import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  GovHousingLoanSchema,
  GovHousingLoanDto,
} from './gov-housing-loan.dto';
import { GovOtherDebtSchema, GovOtherDebtDto } from './gov-other-debt.dto';

export const GovDebtSchema = z.object({
  debtType: z.enum(['housing_loan', 'other_debt']),
  isActive: z.boolean().default(true),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  govHousingLoan: z
    .union([GovHousingLoanSchema, z.undefined()])
    .optional()
    .nullable(),
  govOtherDebt: z
    .union([GovOtherDebtSchema, z.undefined()])
    .optional()
    .nullable(),
});

export class GovDebtDto extends createZodDto(GovDebtSchema) {
  @ApiProperty({
    description: 'Type of debt',
    example: 'housing_loan',
    enum: ['housing_loan', 'other_debt'],
    type: String,
  })
  debtType: 'housing_loan' | 'other_debt';

  @ApiProperty({
    description: 'Whether this debt is active',
    example: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tax year for this debt',
    example: 2023,
    minimum: 2000,
    maximum: new Date().getFullYear() + 1,
    type: Number,
  })
  taxYear: number;

  @ApiProperty({
    description: 'Housing loan details (when debtType is "housing_loan")',
    required: false,
    type: GovHousingLoanDto,
    nullable: true,
  })
  govHousingLoan?: GovHousingLoanDto | null;

  @ApiProperty({
    description: 'Other debt details (when debtType is "other_debt")',
    required: false,
    type: GovOtherDebtDto,
    nullable: true,
  })
  govOtherDebt?: GovOtherDebtDto | null;
}
