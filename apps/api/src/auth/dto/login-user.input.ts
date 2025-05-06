import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class LoginUserDto extends createZodDto(LoginSchema) {}
