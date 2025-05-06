import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { passwordRegex } from 'src/common/utils/regex';

const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(6)
    .regex(
      passwordRegex,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character',
    ),
  token: z.string(),
});

export class ResetPasswordInputDto extends createZodDto(ResetPasswordSchema) {}

@InputType()
export class ResetPasswordInput extends createZodDto(ResetPasswordSchema) {
  @Field()
  password: string;

  @Field()
  token: string;
}
