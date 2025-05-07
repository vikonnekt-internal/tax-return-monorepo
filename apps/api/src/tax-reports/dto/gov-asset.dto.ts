import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { GovRealEstateSchema, GovRealEstateDto } from './gov-real-estate.dto';
import { GovVehicleSchema, GovVehicleDto } from './gov-vehicle.dto';

export const GovAssetSchema = z.object({
  assetType: z.enum(['real_estate', 'vehicle']),
  isActive: z.boolean().default(true),
  taxYear: z
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear() + 1),
  govRealEstate: z
    .union([GovRealEstateSchema, z.undefined()])
    .optional()
    .nullable(),
  govVehicle: z.union([GovVehicleSchema, z.undefined()]).optional().nullable(),
});

export class GovAssetDto extends createZodDto(GovAssetSchema) {
  @ApiProperty({
    description: 'Type of asset',
    example: 'real_estate',
    enum: ['real_estate', 'vehicle'],
    type: String,
  })
  assetType: 'real_estate' | 'vehicle';

  @ApiProperty({
    description: 'Whether this asset is active',
    example: true,
    default: true,
    type: Boolean,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Tax year for this asset',
    example: 2023,
    minimum: 2000,
    maximum: new Date().getFullYear() + 1,
    type: Number,
  })
  taxYear: number;

  @ApiProperty({
    description: 'Real estate details (when assetType is "real_estate")',
    required: false,
    type: GovRealEstateDto,
    nullable: true,
  })
  govRealEstate?: GovRealEstateDto | null;

  @ApiProperty({
    description: 'Vehicle details (when assetType is "vehicle")',
    required: false,
    type: GovVehicleDto,
    nullable: true,
  })
  govVehicle?: GovVehicleDto | null;
}
