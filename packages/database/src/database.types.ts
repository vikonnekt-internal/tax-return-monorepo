import { PrismaClient } from '@prisma/client';

type IgnorePrismaBuiltins<S extends string | symbol> = string extends S
  ? string
  : S extends ''
    ? S
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      S extends `$${infer T}`
      ? never
      : S;

export type PrismaModelName = Exclude<
  IgnorePrismaBuiltins<keyof PrismaClient>,
  symbol
>;
