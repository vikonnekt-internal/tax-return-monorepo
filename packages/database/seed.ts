import { autoIncrementAdd, mocks, PrismaModelName } from "./src";
import prisma from "./src/utils/instance";

const models = Object.keys(mocks);
async function cleanModels() {
  for (const model of [...models].reverse()) {
    // eslint-disable-next-line no-console
    console.log(`Cleaning ${model} in progress`);
    await prisma[model].deleteMany();
    // eslint-disable-next-line no-console
    console.log("Completed Cleaning", model);
  }
}

async function main() {
  if (process.env.NODE_ENV === "development") {
    await cleanModels();
    for (const model of models) {
      await prisma[model].createMany({
        data: mocks[model],
      });
      await autoIncrementAdd(model as PrismaModelName);
      // eslint-disable-next-line no-console
      console.log("Completed seeding", model, mocks[model].length, "Row");
    }
  } else {
    // eslint-disable-next-line no-console
    console.error(`Cannot run seed in ${process.env.NODE_ENV} environment`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
