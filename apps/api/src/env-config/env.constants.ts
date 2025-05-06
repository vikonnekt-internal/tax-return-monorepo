import { z } from 'zod';

enum NodeEnv {
  PRODUCTION = 'production',
  DEV = 'development',
  TEST = 'test',
}

const envSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES: z.string(),
  FROM_EMAIL: z.string().optional().default('contact@tax.com'),
  SENDGRID_KEY: z.string(),
  CLIENT_URL: z.string().optional().default('https://app.tax.com'),
  LEGAL_PARSER_SERVICE_URL: z.string(),
  LEGAL_FORMATER_SERVICE_URL: z.string(),
  MICROSERVICE_TIMEOUT: z.string().default('30000'),
  MICROSERVICE_RETRIES: z.string().default('3'),
  S3_URL: z.string(),
  BUCKET_URL: z.string(),
  BUCKET_NAME: z.string(),
  REGION: z.string(),
  BUCKET_ACCESS_KEY: z.string(),
  BUCKET_SECRET_KEY: z.string(),
  LEGAL_ADAPTATION_SERVICE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof envSchema>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvSchema {}
  }
}
export function validate(config: EnvSchema) {
  return envSchema.parse(config);
}
