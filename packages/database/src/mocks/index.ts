import { PrismaClient } from "@prisma/client";
import { DeepMockProxy } from "jest-mock-extended";
import { parse } from "url";
import { user } from "./user";
import { taxpayer } from "./taxpayer";
import { taxReturn } from "./taxReturn";
import { incomeSource } from "./incomeSource";
import { asset } from "./asset";
import { realEstate } from "./realEstate";
import { vehicle } from "./vehicle";
import { debt } from "./debt";
import { housingLoan } from "./housingLoan";
import { otherDebt } from "./otherDebt";
import { benefit } from "./benefit";
import { govIncomeSource } from "./govIncomeSource";
import { govAsset } from "./govAsset";
import { govRealEstate } from "./govRealEstate";
import { govVehicle } from "./govVehicle";
import { govDebt } from "./govDebt";
import { govHousingLoan } from "./govHousingLoan";
import { govOtherDebt } from "./govOtherDebt";
import { govBenefit } from "./govBenefit";
import { PrismaModelName } from "../database.types";

// Correct seeding order based on schema.prisma relationships
export const mocks = {
  // Independent base entities
  taxpayer, // No foreign key dependencies - must be first

  // Government data sources - depend on taxpayer
  govIncomeSource, // Depends on taxpayer
  govAsset, // Depends on taxpayer
  govDebt, // Depends on taxpayer
  govBenefit, // Depends on taxpayer

  // Government child records
  govRealEstate, // Depends on govAsset
  govVehicle, // Depends on govAsset
  govHousingLoan, // Depends on govDebt
  govOtherDebt, // Depends on govDebt

  // First level of dependencies
  user, // Depends on taxpayer
  taxReturn, // Depends on user and taxpayer

  // Second level that depend on taxpayer and optionally taxReturn
  incomeSource, // Depends on taxpayer and optionally taxReturn
  asset, // Depends on taxpayer and optionally taxReturn
  debt, // Depends on taxpayer and optionally taxReturn
  benefit, // Depends on taxpayer and optionally taxReturn

  // Asset children - must be after asset
  realEstate, // Depends on asset (requires matching assetId)
  vehicle, // Depends on asset (requires matching assetId)

  // Debt children - must be after debt
  housingLoan, // Depends on debt (requires matching debtId)
  otherDebt, // Depends on debt (requires matching debtId)
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

export {
  user,
  taxpayer,
  taxReturn,
  incomeSource,
  asset,
  realEstate,
  vehicle,
  debt,
  housingLoan,
  otherDebt,
  benefit,
  govIncomeSource,
  govAsset,
  govRealEstate,
  govVehicle,
  govDebt,
  govHousingLoan,
  govOtherDebt,
  govBenefit,
  mockEntities,
};
