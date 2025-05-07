import prisma from "./instance";
import { PrismaModelName } from "../database.types";
import { checkLocalhost, mocks } from "../mocks";

function capitalizeFirstLetter(char: string) {
  return char.charAt(0).toUpperCase() + char.slice(1);
}

export async function autoIncrementAdd(entity: PrismaModelName) {
  const name = capitalizeFirstLetter(entity);

  // First, check if the table exists with the correct case
  const tableExists = await prisma.$queryRawUnsafe<[{ exists: boolean }]>(
    `SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = '${name}'
    ) as exists;`
  );

  if (!tableExists[0]?.exists) {
    console.log(`Table ${name} does not exist`);
    return;
  }

  // Get primary key column name for this table
  const primaryKeyColumn = await prisma.$queryRawUnsafe<
    [{ column_name: string }]
  >(
    `SELECT a.attname as column_name
     FROM pg_index i
     JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = ANY(i.indkey)
     WHERE i.indrelid = '"${name}"'::regclass
     AND i.indisprimary;`
  );

  if (!primaryKeyColumn?.[0]) {
    console.log(`Could not find primary key for ${name}`);
    return;
  }

  const idColumnName = primaryKeyColumn[0]?.column_name;

  // Check if the primary key is auto-incremented (has a sequence)
  try {
    await prisma.$queryRawUnsafe(
      `SELECT pg_get_serial_sequence('"${name}"', '${idColumnName}')`
    );

    // If we get here, the sequence exists, so reset it
    await prisma.$queryRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"${name}"', '${idColumnName}'), coalesce(max("${idColumnName}")+1, 1), false) FROM "${name}";`
    );

    console.log(`Successfully reset sequence for ${name}.${idColumnName}`);
  } catch (error) {
    // Either the table doesn't use a sequence (e.g., UUID primary key) or some other error
    console.log(
      `Model ${name} does not have an auto-increment sequence on ${idColumnName}`
    );
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
