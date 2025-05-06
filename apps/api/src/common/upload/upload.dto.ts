import { PartialType } from '@nestjs/mapped-types';
import { ReadStream } from 'fs-capacitor';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UploadInputSchema = z.object({
  filename: z.string(),
  mimetype: z.string(),
  encoding: z.string(),
  createReadStream: z.function().returns(z.instanceof(ReadStream)),
});

export class UploadInputDto extends createZodDto(UploadInputSchema) {}
export class UploadOptionalInputDto extends PartialType(
  createZodDto(UploadInputSchema),
) {}
