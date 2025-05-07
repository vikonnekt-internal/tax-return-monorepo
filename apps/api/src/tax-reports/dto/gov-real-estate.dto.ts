import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovRealEstateSchema = z.object({
  propertyId: z.string(),
  address: z.string(),
  propertyValue: z.number().positive(),
  purchaseYear: z.number().int().optional(),
});

export class GovRealEstateDto extends createZodDto(GovRealEstateSchema) {
  @ApiProperty({
    description: 'Property identifier',
    example: 'PROP123456',
    type: String,
  })
  propertyId: string;

  @ApiProperty({
    description: 'Property address',
    example: '123 Main St, Anytown, AT 12345',
    type: String,
  })
  address: string;

  @ApiProperty({
    description: 'Current property value',
    example: 450000,
    type: Number,
  })
  propertyValue: number;

  @ApiProperty({
    description: 'Year the property was purchased',
    example: 2018,
    required: false,
    type: Number,
  })
  purchaseYear?: number;
}
