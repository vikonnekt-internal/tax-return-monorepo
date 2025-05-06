import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "../../apps/api/src/schema.gql",
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
  generates: {
    "../../apps/front/src/generated/": {
      documents: ["../../apps/front/src/**/*.{tsx,ts}"],
      config: {
        scalars: {
          DateTime: "string",
          URL: "string",
        },
      },
      preset: "client",
    },
  },
};

export default config;
