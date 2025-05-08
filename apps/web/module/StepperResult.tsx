import React from "react";
import { Box } from "../component/Box/Box";
import { GridRow } from "../component/Grid/GridRow/GridRow";
import { GridColumn } from "../component/Grid/GridColumn/GridColumn";
import { Text } from "../component/Text/Text";
import { Button } from "../component/Button/Button";
import { Divider } from "../component/Divider/Divider";
import html2pdf from 'html2pdf.js';

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

  const hasPersonalData = personal.nafn || personal.kennitala || personal.heimilisfang || personal.netfang || personal.simanumer;
  const hasRevenueData = revenue.incomeItems?.length > 0 || revenue.subsidyItems?.length > 0 || revenue.pensionItems?.length > 0;
  const hasAssetsData = assets.realEstate?.length > 0 || assets.vehicles?.length > 0;
  const hasInterestData = interest.interestExpenses?.length > 0;
  const hasDebtsData = debts.debtExpenses?.length > 0;

  // PDF download handler
  const handleDownloadPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 10,
      filename: 'niðurstöður-skýrsla.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    if (element) {
      html2pdf().set(opt).from(element).save();
    }
  };

  const SectionHeader = ({ title, subtitle, onEdit }: { title: string; subtitle: string; onEdit?: () => void }) => (
    <Box marginBottom={4}>
      <Box
        display="flex"
        justifyContent="spaceBetween"
        alignItems="center"
        marginBottom={2}
      >
        <Box>
          <Text variant="h3" as="h2" marginBottom={1}>
            {title}
          </Text>
          <Text color="blue400">{subtitle}</Text>
        </Box>
      </Box>
      <Box marginY={2}>
        <Divider />
      </Box>
    </Box>
  );

  const DataTable = ({ children }: { children: React.ReactNode }) => (
    <Box
      background="blue100"
      borderRadius="large"
      padding={4}
      marginBottom={4}
    >
      {children}
    </Box>
  );

  return (
    <Box padding={4}>
      <Box id="report-content">
        {/* Personal Info */}
        {hasPersonalData && (
          <>
            <SectionHeader
              title="Persónuupplýsingar"
              subtitle="Yfirlit yfir persónuupplýsingar"
              onEdit={() => onEdit?.("personal")}
            />
            <DataTable>
              <GridRow>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Text fontWeight="semiBold" color="blue400">Nafn</Text>
                  <Text marginBottom={2}>{personal.nafn}</Text>
                </GridColumn>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Text fontWeight="semiBold" color="blue400">Kennitala</Text>
                  <Text marginBottom={2}>{personal.kennitala}</Text>
                </GridColumn>
              </GridRow>
              <Box marginY={2}>
                <Divider />
              </Box>
              <GridRow>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Text fontWeight="semiBold" color="blue400">Heimilisfang</Text>
                  <Text marginBottom={2}>{personal.heimilisfang}</Text>
                </GridColumn>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Text fontWeight="semiBold" color="blue400">Netfang</Text>
                  <Text marginBottom={2}>{personal.netfang}</Text>
                </GridColumn>
              </GridRow>
              <Box marginY={2}>
                <Divider />
              </Box>
              <GridRow>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Text fontWeight="semiBold" color="blue400">Símanúmer</Text>
                  <Text>{personal.simanumer}</Text>
                </GridColumn>
              </GridRow>
            </DataTable>
          </>
        )}

        {/* Revenue Section */}
        {hasRevenueData && (
          <>
            <SectionHeader
              title="Tekjur ársins 2024"
              subtitle="Yfirlit yfir tekjur ársins 2024"
              onEdit={() => onEdit?.("revenue")}
            />
            
            {/* Income Items */}
            {revenue.incomeItems?.length > 0 && (
              <DataTable>
                <Text variant="h5" color="blue400" marginBottom={3}>Launatekjur og starfstengdar greiðslur</Text>
                <GridRow>
                  <GridColumn span="8/12">
                    <Text fontWeight="semiBold" color="blue400">Tekjur frá</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Upphæð kr.</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {revenue.incomeItems.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
                    <GridColumn span="8/12">
                      <Text>{item.source}</Text>
                    </GridColumn>
                    <GridColumn span="4/12">
                      <Text fontWeight="semiBold">{item.amount} kr.</Text>
                    </GridColumn>
                  </GridRow>
                ))}
              </DataTable>
            )}

            {/* Subsidy Items */}
            {revenue.subsidyItems?.length > 0 && (
              <DataTable>
                <Text variant="h5" color="blue400" marginBottom={3}>Ökutækjastyrkur. Dagpeningar. Hlunnindi</Text>
                <GridRow>
                  <GridColumn span="8/12">
                    <Text fontWeight="semiBold" color="blue400">Tegund</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Upphæð kr.</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {revenue.subsidyItems.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
                    <GridColumn span="8/12">
                      <Text>{item.type}</Text>
                    </GridColumn>
                    <GridColumn span="4/12">
                      <Text fontWeight="semiBold">{item.amount} kr.</Text>
                    </GridColumn>
                  </GridRow>
                ))}
              </DataTable>
            )}

            {/* Pension Items */}
            {revenue.pensionItems?.length > 0 && (
              <DataTable>
                <Text variant="h5" color="blue400" marginBottom={3}>Lífeyrisgreiðslur</Text>
                <GridRow>
                  <GridColumn span="8/12">
                    <Text fontWeight="semiBold" color="blue400">Heimild</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Upphæð kr.</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {revenue.pensionItems.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
                    <GridColumn span="8/12">
                      <Text>{item.source}</Text>
                    </GridColumn>
                    <GridColumn span="4/12">
                      <Text fontWeight="semiBold">{item.amount} kr.</Text>
                    </GridColumn>
                  </GridRow>
                ))}
              </DataTable>
            )}
          </>
        )}

        {/* Assets Section */}
        {hasAssetsData && (
          <>
            <SectionHeader
              title="Eignir ársins 2024"
              subtitle="Yfirlit yfir eignir ársins 2024"
              onEdit={() => onEdit?.("assets")}
            />
            
            {/* Real Estate */}
            {assets.realEstate?.length > 0 && (
              <DataTable>
                <Text variant="h5" color="blue400" marginBottom={3}>Fasteignir</Text>
                <GridRow>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Fastanúmer</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Heimilisfang</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Fasteignamat</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {assets.realEstate.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
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
              </DataTable>
            )}

            {/* Vehicles */}
            {assets.vehicles?.length > 0 && (
              <DataTable>
                <Text variant="h5" color="blue400" marginBottom={3}>Bifreiðir</Text>
                <GridRow>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Númer</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Kaupár</Text>
                  </GridColumn>
                  <GridColumn span="4/12">
                    <Text fontWeight="semiBold" color="blue400">Kaupverð</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {assets.vehicles.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
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
              </DataTable>
            )}
          </>
        )}

        {/* Interest Expenses Section */}
        {hasInterestData && (
          <>
            <SectionHeader
              title="Vaxtagjöld vegna íbúðarhúsnæðis"
              subtitle="Yfirlit yfir skuldir og vaxtagjöld ársins 2024"
              onEdit={() => onEdit?.("interest")}
            />
            {interest.interestExpenses?.map((item: any, idx: number) => (
              <DataTable key={idx}>
                <GridRow>
                  <GridColumn span="6/12">
                    <Text fontWeight="semiBold" color="blue400">Lánshluti</Text>
                    <Text marginBottom={2}>{item.lánshluti}</Text>
                  </GridColumn>
                  <GridColumn span="6/12">
                    <Text fontWeight="semiBold" color="blue400">Vextir</Text>
                    <Text marginBottom={2}>{item.vextir} kr.</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                <GridRow>
                  <GridColumn span="12/12">
                    <Text fontWeight="semiBold" color="blue400">Dagsetning</Text>
                    <Text>{item.dagsetning}</Text>
                  </GridColumn>
                </GridRow>
              </DataTable>
            ))}
          </>
        )}

        {/* Other Debts Section */}
        {hasDebtsData && (
          <>
            <SectionHeader
              title="Aðrar skuldir og vaxtagjöld"
              subtitle="Yfirlit yfir aðrar skuldir og vaxtagjöld"
              onEdit={() => onEdit?.("debts")}
            />
            <DataTable>
              <GridRow>
                <GridColumn span="6/12">
                  <Text fontWeight="semiBold" color="blue400">Skuld</Text>
                  </GridColumn>
                  <GridColumn span="3/12">
                    <Text fontWeight="semiBold" color="blue400">Vaxtagjöld</Text>
                  </GridColumn>
                  <GridColumn span="3/12">
                    <Text fontWeight="semiBold" color="blue400">Eftirstöðvar skulda</Text>
                  </GridColumn>
                </GridRow>
                <Box marginY={2}>
                  <Divider />
                </Box>
                {debts.debtExpenses?.map((item: any, idx: number) => (
                  <GridRow key={idx} marginBottom={2}>
                    <GridColumn span="6/12">
                      <Text>{item.tegund}</Text>
                    </GridColumn>
                    <GridColumn span="3/12">
                      <Text fontWeight="semiBold">{item.vaxtagjöld || item.upphæð || "0"} kr.</Text>
                    </GridColumn>
                    <GridColumn span="3/12">
                      <Text fontWeight="semiBold">{item.eftirstöðvar || "0"} kr.</Text>
                    </GridColumn>
                  </GridRow>
                ))}
              </DataTable>
            </>
          )}
      </Box>
      
      {/* Download PDF Button - Outside the report-content div */}
      <Box display="flex" justifyContent="center" marginTop={6} marginBottom={4}>
        <Button 
          variant="primary" 
          size="large" 
          onClick={handleDownloadPDF}
        >
          Sækja PDF skýrslu
        </Button>
      </Box>
    </Box>
  );
};

export default StepperResult;