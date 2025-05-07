import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  GovIncomeSourceSchema,
  GovIncomeSourceDto,
} from './gov-income-source.dto';
import { GovAssetSchema, GovAssetDto } from './gov-asset.dto';
import { GovDebtSchema, GovDebtDto } from './gov-debt.dto';
import { GovBenefitSchema, GovBenefitDto } from './gov-benefit.dto';

export const UpdateGovDataSchema = z.object({
  incomeSources: z.array(GovIncomeSourceSchema).optional(),
  assets: z.array(GovAssetSchema).optional(),
  debts: z.array(GovDebtSchema).optional(),
  benefits: z.array(GovBenefitSchema).optional(),
  apiKey: z.string(),
  dataSource: z.string(),
});

export class UpdateGovDataDto extends createZodDto(UpdateGovDataSchema) {
  @ApiProperty({
    description: 'Array of income sources from government data',
    required: false,
    type: [GovIncomeSourceDto],
  })
  incomeSources?: GovIncomeSourceDto[];

  @ApiProperty({
    description: 'Array of assets from government data',
    required: false,
    type: [GovAssetDto],
  })
  assets?: GovAssetDto[];

  @ApiProperty({
    description: 'Array of debts from government data',
    required: false,
    type: [GovDebtDto],
  })
  debts?: GovDebtDto[];

  @ApiProperty({
    description: 'Array of benefits from government data',
    required: false,
    type: [GovBenefitDto],
  })
  benefits?: GovBenefitDto[];

  @ApiProperty({
    description: 'API key for authentication',
    example: 'gov-api-key-12345',
    type: String,
  })
  apiKey: string;

  @ApiProperty({
    description: 'Source of the government data',
    example: 'Tax Authority',
    type: String,
  })
  dataSource: string;
}
