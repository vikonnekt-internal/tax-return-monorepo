import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { passwordRegex } from '../../common/utils/regex';

const ResetPasswordSchema = z.object({
  password: z
    .string()
    .regex(
      passwordRegex,
      'Incorrect password format. Password must be at least 8 characters, contain at least 1 lowercase letter, uppercase letter, number and special character',
    ),
  token: z.string(),
});

export class ResetPasswordInput extends createZodDto(ResetPasswordSchema) {
  @Field(() => String)
  password: string;

  @Field(() => String)
  token: string;
}
