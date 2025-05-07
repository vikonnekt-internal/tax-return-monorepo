import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GovVehicleSchema = z.object({
  registrationNumber: z.string(),
  purchaseYear: z.number().int().optional(),
  purchasePrice: z.number().positive(),
});

export class GovVehicleDto extends createZodDto(GovVehicleSchema) {
  @ApiProperty({
    description: 'Vehicle registration number',
    example: 'ABC123',
    type: String,
  })
  registrationNumber: string;

  @ApiProperty({
    description: 'Year the vehicle was purchased',
    example: 2020,
    required: false,
    type: Number,
  })
  purchaseYear?: number;

  @ApiProperty({
    description: 'Purchase price of the vehicle',
    example: 35000,
    type: Number,
  })
  purchasePrice: number;
}
