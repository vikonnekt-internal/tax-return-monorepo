import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import NextSubmit from "../component/ui/NextSubmit";
import { Icon } from "../component/IconRC/Icon";
import { Box } from "../component/Box/Box";
import { Text } from "../component/Text/Text";
import { Button } from "../component/Button/Button";
import { Input } from "../component/Input/Input";
import { Select } from "../component/Select/Select";
import { GridRow } from "../component/Grid/GridRow/GridRow";
import { GridColumn } from "../component/Grid/GridColumn/GridColumn";
import { Divider } from "../component/Divider/Divider";

// Define the validation schema using Zod
const incomeItemSchema = z.object({
  source: z
    .string()
    .min(1, { message: "Vinsamlegast fylltu út uppruna tekna" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Upphæð verður að vera tala" }),
});

const subsidyItemSchema = z.object({
  type: z.string().min(1, { message: "Vinsamlegast veldu tegund" }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Upphæð verður að vera tala" }),
});

const formSchema = z.object({
  incomeItems: z.array(incomeItemSchema).min(1),
  subsidyItems: z.array(subsidyItemSchema),
});

// Define the form data type
type FormData = z.infer<typeof formSchema>;

interface RevenueFormProps {
  onNext?: (data: FormData) => void;
  initialData?: Partial<FormData>;
  onBack?: () => void;
}

const RevenueForm: React.FC<RevenueFormProps> = ({
  onNext,
  initialData,
  onBack,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      incomeItems: [
        { source: "Norðurljós Software ehf", amount: "9.360.000" },
        { source: "Mús & Merki ehf.", amount: "900.000" },
      ],
      subsidyItems: [{ type: "Ferðaskrifstofan", amount: "900.000" }],
    },
  });

  const { fields: incomeFields, append: appendIncome } = useFieldArray({
    control,
    name: "incomeItems",
  });

  const { fields: subsidyFields, append: appendSubsidy } = useFieldArray({
    control,
    name: "subsidyItems",
  });

  const [subsidyDropdownOpen, setSubsidyDropdownOpen] = useState(false);

  const subsidyOptions = [
    { label: "Ferðaskrifstofan", value: "Ferðaskrifstofan" },
    { label: "Ökutækjastyrkur", value: "Ökutækjastyrkur" },
    { label: "Dagpeningar", value: "Dagpeningar" },
    { label: "Bifreiðahlunnindi", value: "Bifreiðahlunnindi" },
    { label: "Húsnæðishlunnindi", value: "Húsnæðishlunnindi" },
    { label: "Annað, hvað?", value: "Annað, hvað?" },
  ];

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    if (onNext) {
      onNext(data);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box marginBottom={4}>
          <Text variant="h3" as="h2">
            Launatekjur og starfstengdar greiðslur
          </Text>

          {incomeFields.map((field, index) => (
            <Box key={field.id} marginY={2}>
              <GridRow>
                <GridColumn span={["12/12", "12/12", "6/12"]}>
                  <Controller
                    name={`incomeItems.${index}.source`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Tekjur frá"
                        placeholder="Nafn fyrirtækis eða stofnunar"
                        hasError={!!errors.incomeItems?.[index]?.source}
                        errorMessage={
                          errors.incomeItems?.[index]?.source?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
                <GridColumn span={["12/12", "12/12", "6/12"]}>
                  <Controller
                    name={`incomeItems.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Upphæð kr."
                        placeholder="0"
                        hasError={!!errors.incomeItems?.[index]?.amount}
                        errorMessage={
                          errors.incomeItems?.[index]?.amount?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <Box display="flex" justifyContent="flexEnd" marginTop={2}>
            <Button
              variant="ghost"
              onClick={() => appendIncome({ source: "", amount: "" })}
              icon="add"
              iconType="outline"
              size="small"
            >
              Bæta við línu
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box marginY={4}>
          <Text variant="h3" as="h2">
            Ökutækjastyrkur. Dagpeningar. Hlunnindi
          </Text>

          {subsidyFields.map((field, index) => (
            <Box key={field.id} marginY={2}>
              <GridRow>
                <GridColumn span={["12/12", "12/12", "6/12"]}>
                  <Box marginBottom={1}>
                    <Text variant="small" color="blue400">
                      Tegund fyrirtækis
                    </Text>
                  </Box>
                  <Controller
                    name={`subsidyItems.${index}.type`}
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Select
                        {...field}
                        label=""
                        options={subsidyOptions}
                        placeholder="Veldu tegund"
                        hasError={!!errors.subsidyItems?.[index]?.type}
                        errorMessage={
                          errors.subsidyItems?.[index]?.type?.message
                        }
                        value={
                          subsidyOptions.find(
                            (option) => option.value === value
                          ) || null
                        }
                        onChange={(option) => onChange(option?.value || "")}
                      />
                    )}
                  />
                </GridColumn>
                <GridColumn span={["12/12", "12/12", "6/12"]}>
                  <Controller
                    name={`subsidyItems.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Upphæð kr."
                        placeholder="0"
                        hasError={!!errors.subsidyItems?.[index]?.amount}
                        errorMessage={
                          errors.subsidyItems?.[index]?.amount?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
              </GridRow>
            </Box>
          ))}

          <Box display="flex" justifyContent="flexEnd" marginTop={2}>
            <span
              onClick={() => appendSubsidy({ type: "", amount: "" })}
              className="flex gap-2 items-center"
            >
              <Icon type="outline" icon="add" />
              <Text fontWeight="semiBold" color="blue400">
                Bæta við línu
              </Text>
            </span>
          </Box>
        </Box>

        <Box marginTop={4}>
          <NextSubmit
            handleBack={onBack || (() => {})}
            handleNext={handleSubmit(onSubmit)}
          />
        </Box>
      </form>
    </Box>
  );
};

export default RevenueForm;
