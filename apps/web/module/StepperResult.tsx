import React from "react";
import { Box } from "../component/Box/Box";
import { GridRow } from "../component/Grid/GridRow/GridRow";
import { GridColumn } from "../component/Grid/GridColumn/GridColumn";
import { Text } from "../component/Text/Text";
import { Button } from "../component/Button/Button";

interface StepperResultProps {
  data: any;
  onEdit?: (section: string) => void;
}

const StepperResult: React.FC<StepperResultProps> = ({ data, onEdit }) => {
  // Extract data from the formData structure
  const personal = data[1] || {};
  const revenue = data[2] || {};
  const assets = data[3] || {};
  const interest = data[4]?.[0] || {};
  const debts = data[4]?.[1] || {};

  return (
    <Box>
      {/* Personal Info */}
      <Box
        padding={4}
        background="blue100"
        borderRadius="large"
        marginBottom={4}
      >
        <GridRow>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Text fontWeight="semiBold">Nafn</Text>
            <Text>{personal.nafn}</Text>
          </GridColumn>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Text fontWeight="semiBold">Kennitala</Text>
            <Text>{personal.kennitala}</Text>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Text fontWeight="semiBold">Heimilisfang</Text>
            <Text>{personal.heimilisfang}</Text>
          </GridColumn>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Text fontWeight="semiBold">Netfang</Text>
            <Text>{personal.netfang}</Text>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Text fontWeight="semiBold">Símanúmer</Text>
            <Text>{personal.simanumer}</Text>
          </GridColumn>
          <GridColumn span={["12/12", "6/12", "6/12"]}>
            <Box display="flex" justifyContent="flexEnd" height="full">
              <Button
                variant="ghost"
                size="small"
                icon="pencil"
                iconType="outline"
                onClick={() => onEdit?.("personal")}
              >
                Breyta
              </Button>
            </Box>
          </GridColumn>
        </GridRow>
      </Box>

      {/* Revenue Section */}
      <Box marginBottom={4}>
        <Box
          display="flex"
          justifyContent="spaceBetween"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Text variant="h3" as="h2">
              Tekjur ársins 2024
            </Text>
            <Text>Yfirlit yfir tekjur ársins 2024</Text>
          </Box>
          <Button
            variant="ghost"
            size="small"
            icon="pencil"
            iconType="outline"
            onClick={() => onEdit?.("revenue")}
          >
            Breyta
          </Button>
        </Box>
        {/* Income Table */}
        <Box
          background="blue100"
          borderRadius="large"
          padding={2}
          marginBottom={2}
        >
          <Text variant="h5" color="blue400" marginBottom={1}>
            Launatekjur og starfstengdar greiðslur
          </Text>
          <GridRow>
            <GridColumn span="8/12">
              <Text fontWeight="semiBold">Tekjur frá</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Upphæð kr.</Text>
            </GridColumn>
          </GridRow>
          {revenue.incomeItems?.map((item: any, idx: number) => (
            <GridRow key={idx}>
              <GridColumn span="8/12">
                <Text>{item.source}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text fontWeight="semiBold">{item.amount} kr.</Text>
              </GridColumn>
            </GridRow>
          ))}
        </Box>
        {/* Subsidy Table */}
        <Box background="blue100" borderRadius="large" padding={2}>
          <Text variant="h5" color="blue400" marginBottom={1}>
            Ökutækjastyrkur. Dagpeningar. Hlunnindi
          </Text>
          <GridRow>
            <GridColumn span="8/12">
              <Text fontWeight="semiBold">Tegund</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Upphæð kr.</Text>
            </GridColumn>
          </GridRow>
          {revenue.subsidyItems?.map((item: any, idx: number) => (
            <GridRow key={idx}>
              <GridColumn span="8/12">
                <Text>{item.type}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text fontWeight="semiBold">{item.amount} kr.</Text>
              </GridColumn>
            </GridRow>
          ))}
        </Box>
      </Box>

      {/* Assets Section */}
      <Box marginBottom={4}>
        <Box
          display="flex"
          justifyContent="spaceBetween"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Text variant="h3" as="h2">
              Eignir ársins 2024
            </Text>
            <Text>Yfirlit yfir eignir ársins 2024</Text>
          </Box>
          <Button
            variant="ghost"
            size="small"
            icon="pencil"
            iconType="outline"
            onClick={() => onEdit?.("assets")}
          >
            Breyta
          </Button>
        </Box>
        {/* Real Estate Table */}
        <Box
          background="blue100"
          borderRadius="large"
          padding={2}
          marginBottom={2}
        >
          <Text variant="h5" color="blue400" marginBottom={1}>
            Fasteignir
          </Text>
          <GridRow>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Fastanúmer</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Heimilisfang</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Fasteignamat</Text>
            </GridColumn>
          </GridRow>
          {assets.realEstate?.map((item: any, idx: number) => (
            <GridRow key={idx}>
              <GridColumn span="4/12">
                <Text>{item.fastanumer}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text>{item.heimilisfang}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text fontWeight="semiBold">{item.fasteign_mat} kr.</Text>
              </GridColumn>
            </GridRow>
          ))}
        </Box>
        {/* Vehicles Table */}
        <Box background="blue100" borderRadius="large" padding={2}>
          <Text variant="h5" color="blue400" marginBottom={1}>
            Bifreiðir
          </Text>
          <GridRow>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Númer</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Kaupár</Text>
            </GridColumn>
            <GridColumn span="4/12">
              <Text fontWeight="semiBold">Kaupverð</Text>
            </GridColumn>
          </GridRow>
          {assets.vehicles?.map((item: any, idx: number) => (
            <GridRow key={idx}>
              <GridColumn span="4/12">
                <Text>{item.numer}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text>{item.kaupar}</Text>
              </GridColumn>
              <GridColumn span="4/12">
                <Text fontWeight="semiBold">{item.kaupverd} kr.</Text>
              </GridColumn>
            </GridRow>
          ))}
        </Box>
      </Box>

      {/* Interest Expenses Section */}
      <Box marginBottom={4}>
        <Box
          display="flex"
          justifyContent="spaceBetween"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Text variant="h3" as="h2">
              Vaxtagjöld vegna íbúðarhúsnæðis til eigin nota
            </Text>
            <Text>Yfirlit yfir skuldir og vaxtagjöld ársins 2024</Text>
          </Box>
          <Button
            variant="ghost"
            size="small"
            icon="pencil"
            iconType="outline"
            onClick={() => onEdit?.("interest")}
          >
            Breyta
          </Button>
        </Box>
        {/* Key-value grid for interest expenses */}
        {Array.isArray(interest.interestExpenses) &&
          interest.interestExpenses.map((item: any, idx: number) => (
            <Box
              key={idx}
              background="blue100"
              borderRadius="large"
              padding={2}
              marginBottom={2}
            >
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Kaupár</Text>
                  <Text>{item.kaupár || "-"}</Text>
                </GridColumn>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Staðsetning íbúðarhúsnæðis</Text>
                  <Text>{item.staðsetning || "-"}</Text>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Lánveitandi</Text>
                  <Text>{item.lánveitandi || "-"}</Text>
                </GridColumn>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Kennitala lánveitanda</Text>
                  <Text>{item.kennitala_lánveitanda || "-"}</Text>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Lánsnúmer</Text>
                  <Text>{item.lánsnúmer || "-"}</Text>
                </GridColumn>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Lántökudagur</Text>
                  <Text>{item.lántökudagur || "-"}</Text>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Lánstími í árum</Text>
                  <Text>{item.lánstími || "-"}</Text>
                </GridColumn>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Heildargreiðslur ársins</Text>
                  <Text>{item.heildargreiðslur || "-"}</Text>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Afborgun á nafnverði</Text>
                  <Text>{item.afborgun || "-"}</Text>
                </GridColumn>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold">Vaxtagjöld</Text>
                  <Text>{item.vaxtagjöld || "-"}</Text>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn span="12/12">
                  <Text fontWeight="semiBold">Eftirstöðvar skulda</Text>
                  <Text>{item.eftirstöðvar || "-"}</Text>
                </GridColumn>
              </GridRow>
            </Box>
          ))}
      </Box>

      {/* Other Debts Section */}
      <Box marginBottom={4}>
        <Box
          display="flex"
          justifyContent="spaceBetween"
          alignItems="center"
          marginBottom={2}
        >
          <Box>
            <Text variant="h3" as="h2">
              Aðrar skuldir og vaxtagjöld
            </Text>
            <Text>Yfirlit yfir eignir ársins 2024</Text>
          </Box>
          <Button
            variant="ghost"
            size="small"
            icon="pencil"
            iconType="outline"
            onClick={() => onEdit?.("debts")}
          >
            Breyta
          </Button>
        </Box>
        <Box background="blue100" borderRadius="large" padding={2}>
          <GridRow>
            <GridColumn span="6/12">
              <Text fontWeight="semiBold">Skuld</Text>
            </GridColumn>
            <GridColumn span="3/12">
              <Text fontWeight="semiBold">Vaxtagjöld</Text>
            </GridColumn>
            <GridColumn span="3/12">
              <Text fontWeight="semiBold">Eftirstöðvar skulda</Text>
            </GridColumn>
          </GridRow>
          {debts.debtExpenses?.map((item: any, idx: number) => (
            <GridRow key={idx}>
              <GridColumn span="6/12">
                <Text>{item.tegund}</Text>
              </GridColumn>
              <GridColumn span="3/12">
                <Text fontWeight="semiBold">
                  {item.vaxtagjöld || item.upphæð || "0 kr."}
                </Text>
              </GridColumn>
              <GridColumn span="3/12">
                <Text fontWeight="semiBold">
                  {item.eftirstöðvar || "0 kr."}
                </Text>
              </GridColumn>
            </GridRow>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StepperResult;
