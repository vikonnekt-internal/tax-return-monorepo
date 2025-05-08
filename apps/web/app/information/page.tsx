"use client";
import { GridColumn } from "../../component/Grid/GridColumn/GridColumn";
import { GridRow } from "../../component/Grid/GridRow/GridRow";
import { Stack } from "../../component/Stack/Stack";
import { Button } from "../../component/Button/Button";
import { Box } from "../../component/Box/Box";
import { Text } from "../../component/Text/Text";

import { Typography } from "../../component/Typography/Typography";
import Link from "next/link";
import { Breadcrumbs } from "../../component/core/Breadcrumb";
import StaticLayout from "../../component/layout/StaticLayout";
import InfoIcon from "../../icons/InfoIcon";

const InfoPage = () => {
  
  return (
    <StaticLayout
      main={
        <GridRow>
          <GridColumn
            span={["12/12", "12/12", "12/12", "12/12", "7/9"]}
            offset={[null, null, null, null, "1/9"]}
          >
            <Box marginBottom={4}>
              <Breadcrumbs label="hi">
                <Link href={"/"}>Ísland.is</Link>
                <Link href={"/"}>Fjármál og skattar</Link>
                <Link href={"/"}>Skattframtal einstaklinga</Link>
              </Breadcrumbs>
            </Box>
            <Box marginBottom={[3, 3, 3, 12]} marginTop={1}>
              <Stack space={3}>
                <Typography variant="h1" as="h1">
                  Skattframtal einstaklinga
                </Typography>

                <div className="w-full bg-blue-50 rounded-lg p-4 md:p-6">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="spaceBetween"
                  >
                    <Text variant="h3" color="blue600" marginBottom={1}>
                      Skattframtal einstaklinga
                    </Text>
                    <Link href="/tax" className="h-16 px-6 py-4 bg-blue-600 rounded-lg inline-flex justify-center items-center gap-2 text-white">
                      <span>Skoða framtöl</span>
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </Box>
                </div>
                <Text>
                  Einstaklingar geta hér nálgast framtöl sín, skilað inn nýju
                  framtali og skoðað eldri framtöl.
                </Text>
              </Stack>
            </Box>
          </GridColumn>
        </GridRow>
      }
      aside={
        <div className="flex flex-col gap-4">
          <Box
            className="flex items-center gap-4"
            background="purple100"
            padding={2}
          >
            <img src="/assets/iceland.svg" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4" color="purple600">
                  Þjónustuaðili
                </Text>
                <InfoIcon />
              </div>
              <Text variant="h5" color="purple600">
                Sýslumaður
              </Text>
            </div>
          </Box>

          <Box className="flex flex-col" background="blue100">
            <Link
              href={"/"}
              className="justify-center !text-blue-800 text-xl font-semibold leading-loose border-b border-b-[#CCDFFF] p-4 "
            >
              Efnisyfirlit
            </Link>
            <Link
              href={"/"}
              className="self-stretch justify-start !text-blue-600 text-lg font-semibold px-4 py-6"
            >
              Skattframtal einstaklinga
            </Link>
          </Box>
        </div>
      }
    />
  );
};

export default InfoPage;
