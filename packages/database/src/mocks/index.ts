import { PrismaClient } from "@prisma/client";
import { DeepMockProxy } from "jest-mock-extended";
import { parse } from "url";
import { user } from "./user";
import { PrismaModelName } from "../database.types";

// Order is important here
export const mocks = {
  user: user,
};

function getDatabaseNameFromPostgresURI(uri: string) {
  const parsed = parse(uri);
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.hostname || "";
  const port = parsed.port ? ":" + parsed.port : "";
  const pathname = parsed.pathname || "";
  const parts = pathname.split("/");
  const database = parts[1] || "";

  return {
    database,
    port,
    host,
    auth,
  };
}

export async function checkLocalhost() {
  const { host, database } = getDatabaseNameFromPostgresURI(
    process.env.DATABASE_URL || ""
  );
  const localhost = "127.0.0.1";
  const CI_HOST = "postgres";
  if (
    host != localhost &&
    host != CI_HOST &&
    database !== "subscription-monitoring-testing"
  ) {
    throw new Error(
      `You are not connected to testing database ${localhost}:${database} or ${CI_HOST} but on ${host}`
    );
  }
}

const mockEntities = (
  databaseService: DeepMockProxy<PrismaClient>,
  entities: PrismaModelName[],
  options?: {
    disableCheck: boolean;
  }
) => {
  return new Promise((resolve, reject) => {
    try {
      if (!options?.disableCheck) {
        checkLocalhost();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      entities.forEach((entity: string) => {
        const element = { ...mocks[entity][0] };
        //TODO: Add other mocking functions
        databaseService[entity].findMany.mockResolvedValue(mocks[entity]);
        databaseService[entity].findFirst.mockResolvedValue(element);
        databaseService[entity].create.mockResolvedValue(element);
        databaseService[entity].count.mockResolvedValue(mocks[entity].length);
        databaseService[entity].update.mockResolvedValue(element);
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

export { user, mockEntities };
