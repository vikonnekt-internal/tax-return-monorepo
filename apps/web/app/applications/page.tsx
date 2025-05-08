"use client";
import { Box } from "../../component/Box/Box";
import { GridColumn } from "../../component/Grid/GridColumn/GridColumn";
import { GridRow } from "../../component/Grid/GridRow/GridRow";
import { Stack } from "../../component/Stack/Stack";
import { Text } from "../../component/Text/Text";

import Link from "next/link";
import { Breadcrumbs } from "../../component/core/Breadcrumb";
import StaticLayout from "../../component/layout/StaticLayout";
import { Typography } from "../../component/Typography/Typography";
import InfoIcon from "../../icons/InfoIcon";
import ApplicationBox from "../../component/ApplicationBox";

const ApplicationsPage = () => {
  
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
                <Link href={"/"}>Yfirlit</Link>
                <Link href={"/"}>Fjármál</Link>
                <Link href={"/"}>Skattframtal</Link>
              </Breadcrumbs>
            </Box>
            <Box marginBottom={[3, 3, 3, 12]} marginTop={1}>
              <Stack space={3}>
                <Typography variant="h1" as="h1">
                  Skattframtal einstaklinga
                </Typography>
                <Text>
                  Hér er nýjasta framtal þitt ásamt eldri framtölum
                </Text>
                <div className="w-full flex flex-col gap-4"> 
                    <ApplicationBox date="8/05/2025" status="Framtali skilað" title="Skattframtal einstaklinga 2024" description="Hér er nýjasta framtal þitt ásamt eldri framtölum" progress={50} buttonText="Opna framtal" />
                    <ApplicationBox date="14/06/2024" status="Framtali skilað" title="Skattframtal einstaklinga 2024" description="Hér er nýjasta framtal þitt ásamt eldri framtölum" progress={50} buttonText="Opna framtal" />
                    <ApplicationBox date="14/03/2024" status="Framtali skilað" title="Skattframtal einstaklinga 2024" description="Hér er nýjasta framtal þitt ásamt eldri framtölum" progress={50} buttonText="Opna framtal" />
                </div>
              </Stack>
            </Box>
          </GridColumn>
        </GridRow>
      }
      aside={
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
      }
    />
  );
};

export default ApplicationsPage;
