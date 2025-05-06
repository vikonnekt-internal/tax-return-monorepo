import prisma from "./instance";
import { PrismaModelName } from "../database.types";
import { checkLocalhost, mocks } from "../mocks";

function capitalizeFirstLetter(char: string) {
  return char.charAt(0).toUpperCase() + char.slice(1);
}

export async function autoIncrementAdd(entity: PrismaModelName) {
  const name = capitalizeFirstLetter(entity);

  const hasIdColumn = await prisma.$queryRawUnsafe<{ exists: boolean }>(
    `SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = '${name.toLowerCase()}'
          AND column_name = 'id'
    ) as exists;`
  );

  if (hasIdColumn.exists) {
    await prisma.$queryRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${name}"', 'id'), coalesce(max(id)+1, 1), false) FROM "${name}";`
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Model ${name} does not have an id column`);
  }
}

const cleanModels = async (models: PrismaModelName[]) => {
  for (const model of [...models].reverse()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma[model] as any).deleteMany();
  }
};

export const safelyCleanModels = async (models: PrismaModelName[]) => {
  await checkLocalhost();
  await cleanModels(models);
};

type ExcludedCommonPrisma = PrismaModelName;

export async function seedTestDatabase(entities: ExcludedCommonPrisma[]) {
  await checkLocalhost();
  await cleanModels(entities);

  for (const entity of entities) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await prisma[entity as string].createMany({ data: mocks[entity] });
    await autoIncrementAdd(entity);
    // eslint-disable-next-line no-console
  }
}
