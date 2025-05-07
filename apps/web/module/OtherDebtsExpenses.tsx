import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import NextSubmit from "../component/ui/NextSubmit";
import { Box } from "../component/Box/Box";
import { Text } from "../component/Text/Text";
import { Button } from "../component/Button/Button";
import { Input } from "../component/Input/Input";
import { Select } from "../component/Select/Select";
import { GridRow } from "../component/Grid/GridRow/GridRow";
import { GridColumn } from "../component/Grid/GridColumn/GridColumn";

// Define the validation schema using Zod
const debtExpenseSchema = z.object({
  tegund: z.string().min(1, { message: "Tegund er nauðsynlegt" }),
  upphæð: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: "Upphæð verður að vera tala" }),
});

const formSchema = z.object({
  debtExpenses: z.array(debtExpenseSchema).min(1),
});

// Define the form data type
type FormValues = z.infer<typeof formSchema>;

interface OtherDebtsExpensesProps {
  onNext?: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  onBack?: () => void;
}

const OtherDebtsExpenses: React.FC<OtherDebtsExpensesProps> = ({
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
      debtExpenses: [
        { tegund: "Kreditkort", upphæð: "150.000" },
        { tegund: "Persónulán", upphæð: "500.000" },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "debtExpenses",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    if (onNext) {
      onNext(data);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Box key={field.id} marginY={2}>
            <GridRow>
              <GridColumn span={["12/12", "6/12", "6/12"]}>
                <Box marginBottom={1}>
                  <Text variant="small" color="blue400">
                    Tegund
                  </Text>
                </Box>
                <Controller
                  name={`debtExpenses.${index}.tegund`}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Tegund"
                      placeholder="Veldu tegund"
                      options={[
                        { label: "Kreditkort", value: "Kreditkort" },
                        { label: "Persónulán", value: "Persónulán" },
                        { label: "Aðrar skuldir", value: "Aðrar skuldir" },
                      ]}
                      value={
                        field.value
                          ? { label: field.value, value: field.value }
                          : undefined
                      }
                      onChange={(option) => field.onChange(option?.value)}
                      hasError={!!errors.debtExpenses?.[index]?.tegund}
                      errorMessage={
                        errors.debtExpenses?.[index]?.tegund?.message
                      }
                      required
                    />
                  )}
                />
              </GridColumn>
              <GridColumn span={["12/12", "6/12", "6/12"]}>
                <Box marginBottom={1}>
                  <Text variant="small" color="blue400">
                    Upphæð
                  </Text>
                </Box>
                <Controller
                  name={`debtExpenses.${index}.upphæð`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Upphæð"
                      placeholder="0"
                      hasError={!!errors.debtExpenses?.[index]?.upphæð}
                      errorMessage={
                        errors.debtExpenses?.[index]?.upphæð?.message
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
            onClick={() => append({ tegund: "", upphæð: "" })}
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
      </form>
    </Box>
  );
};

export default OtherDebtsExpenses;
