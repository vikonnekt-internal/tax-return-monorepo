import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovBenefitSchema = z.object({
  providerName: z.string(),
  benefitType: z.string(),
  amount: z.number().positive(),
  isActive: z.boolean().default(true),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
});

export class GovBenefitDto extends createZodDto(GovBenefitSchema) {
  @ApiProperty({
    description: 'Name of the benefit provider',
    example: 'Social Security Administration',
    type: String,
  })
  providerName: string;

  @ApiProperty({
    description: 'Type of benefit',
    example: 'unemployment',
    type: String,
  })
  benefitType: string;

  @ApiProperty({
    description: 'Benefit amount',
    example: 12000,
    type: Number,
  })
  amount: number;

  @ApiProperty({
    description: 'Whether this benefit is active',
    example: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tax year for this benefit',
    example: 2023,
    minimum: 2000,
    maximum: new Date().getFullYear() + 1,
    type: Number,
  })
  taxYear: number;
}
