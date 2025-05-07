import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import NextSubmit from "../component/ui/NextSubmit";
import { Box } from "../component/Box/Box";
import { Stack } from "../component/Stack/Stack";
import { Text } from "../component/Text/Text";
import { Select } from "../component/Select/Select";
import { Input } from "../component/Input/Input";
import { DatePicker } from "../component/DatePicker/DatePicker";
import { GridRow } from "../component/Grid/GridRow/GridRow";
import { GridColumn } from "../component/Grid/GridColumn/GridColumn";
import { Button } from "../component/Button/Button";

// Define Zod schema for form validation
const interestExpenseSchema = z.object({
  lánshluti: z.string().min(1, { message: "Lánshluti er nauðsynlegt" }),
  vextir: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Upphæð verður að vera tala" }),
  dagsetning: z.string().min(1, { message: "Dagsetning er nauðsynlegt" }),
});

const formSchema = z.object({
  interestExpenses: z.array(interestExpenseSchema).min(1),
});

type FormValues = z.infer<typeof formSchema>;

interface InterestExpensesFormProps {
  onNext?: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  onBack?: () => void;
}

const InterestExpensesForm: React.FC<InterestExpensesFormProps> = ({
  onNext,
  initialData,
  onBack,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      interestExpenses: [
        {
          lánshluti: "Húsnæðislán",
          vextir: "1.200.000",
          dagsetning: "2024-01-01",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "interestExpenses",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    if (onNext) {
      onNext(data);
    }
  };

  return (
    <Box paddingY={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space={4}>
          {fields.map((field, index) => (
            <Box key={field.id} marginY={2}>
              <GridRow>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Box marginBottom={1}>
                    <Text variant="small" color="blue400">
                      Lánshluti
                    </Text>
                  </Box>
                  <Controller
                    name={`interestExpenses.${index}.lánshluti`}
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => {
                      const options = [
                        { label: "Húsnæðislán", value: "Húsnæðislán" },
                        { label: "Bílalán", value: "Bílalán" },
                        { label: "Persónulán", value: "Persónulán" },
                      ];
                      return (
                        <Select
                          {...field}
                          label="Lánshluti"
                          placeholder="Veldu lánshluta"
                          options={options}
                          hasError={
                            !!errors.interestExpenses?.[index]?.lánshluti
                          }
                          errorMessage={
                            errors.interestExpenses?.[index]?.lánshluti?.message
                          }
                          value={
                            options.find((option) => option.value === value) ||
                            null
                          }
                          onChange={(option) => onChange(option?.value || "")}
                          required
                        />
                      );
                    }}
                  />
                </GridColumn>
                <GridColumn span={["12/12", "6/12", "6/12"]}>
                  <Box marginBottom={1}>
                    <Text variant="small" color="blue400">
                      Vextir
                    </Text>
                  </Box>
                  <Controller
                    name={`interestExpenses.${index}.vextir`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Vextir"
                        placeholder="0"
                        hasError={!!errors.interestExpenses?.[index]?.vextir}
                        errorMessage={
                          errors.interestExpenses?.[index]?.vextir?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
              </GridRow>

              <Box marginTop={2}>
                <Box marginBottom={1}>
                  <Text variant="small" color="blue400">
                    Dagsetning
                  </Text>
                </Box>
                <Controller
                  name={`interestExpenses.${index}.dagsetning`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Dagsetning"
                      placeholderText="Veldu dagsetningu"
                      locale="is"
                      hasError={!!errors.interestExpenses?.[index]?.dagsetning}
                      errorMessage={
                        errors.interestExpenses?.[index]?.dagsetning?.message
                      }
                      onSelect={(date) => field.onChange(date)}
                      required
                    />
                  )}
                />
              </Box>
            </Box>
          ))}

          <Box display="flex" justifyContent="flexEnd" marginTop={2}>
            <Button
              variant="ghost"
              onClick={() =>
                append({ lánshluti: "", vextir: "", dagsetning: "" })
              }
              icon="add"
              iconType="outline"
              size="small"
            >
              Bæta við línu
            </Button>
          </Box>

          <Box marginTop={4}>
            <NextSubmit
              handleBack={onBack || (() => {})}
              handleNext={handleSubmit(onSubmit)}
            />
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default InterestExpensesForm;
