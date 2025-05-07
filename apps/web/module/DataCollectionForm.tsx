"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box } from "../component/Box/Box";
import { Input } from "../component/Input/Input";
import { Text } from "../component/Text/Text";
import { Stack } from "../component/Stack/Stack";
import NextSubmit from "../component/ui/NextSubmit";
import { useQuery, gql } from '@apollo/client';

const formSchema = z.object({
  nafn: z
    .string()
    .min(2, { message: "Nafn þarf að vera að minnsta kosti 2 stafir" }),
  kennitala: z
    .string()
    .length(10, { message: "Kennitala þarf að vera 10 tölustafir" })
    .regex(/^\d+$/, { message: "Kennitala þarf að vera eingöngu tölustafir" }),
  simanumer: z
    .string()
    .min(7, { message: "Símanúmer þarf að vera að minnsta kosti 7 tölustafir" })
    .regex(/^\d+$/, { message: "Símanúmer þarf að vera eingöngu tölustafir" }),
  netfang: z.string().email({ message: "Ógilt netfang" }),
  heimilisfang: z
    .string()
    .min(5, { message: "Heimilisfang þarf að vera að minnsta kosti 5 stafir" }),
});

type FormData = z.infer<typeof formSchema>;

interface DataCollectionFormProps {
  onNext?: (data: FormData) => void;
  initialData?: Partial<FormData>;
  onBack?: () => void;
}


const DataCollectionForm: React.FC<DataCollectionFormProps> = ({
  onNext,
  initialData,
  onBack,
}) => {

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nafn: initialData?.nafn || "",
      kennitala: initialData?.kennitala  || "",
      simanumer: initialData?.simanumer  || "",
      netfang: initialData?.netfang  || "",
      heimilisfang: initialData?.heimilisfang || "",
    },
  });


  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data);

      if (onNext) {
        onNext(data);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        reset();
        alert("Skráning tókst!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Villa kom upp við skráningu. Vinsamlegast reynið aftur.");
    }
  };

  const formContent = (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack space={3}>
          <Box>
            <Text variant="h2" as="h1">
              Skráningarform
            </Text>
            <Text>Vinsamlegast leiðréttið eftirfarandi ef þörf er á</Text>
          </Box>
          <div className="w-full flex gap-4">
            <Controller
              name="nafn"
              control={control}
              render={({ field }) => (
                <Input
                  containerClassName="w-full"
                  {...field}
                  label="Nafn"
                  placeholder="Fullt nafn"
                  hasError={!!errors.nafn}
                  errorMessage={errors.nafn?.message}
                  required
                />
              )}
            />

            <Controller
              name="kennitala"
              control={control}
              render={({ field }) => (
                <Input
                  containerClassName="w-full"
                  {...field}
                  label="Kennitala"
                  placeholder="Kennitala (10 tölustafir)"
                  hasError={!!errors.kennitala}
                  errorMessage={errors.kennitala?.message}
                  required
                />
              )}
            />
          </div>
          <div className="flex gap-4">
            <Controller
              name="simanumer"
              control={control}
              render={({ field }) => (
                <Input
                  containerClassName="w-full"
                  {...field}
                  label="Símanúmer"
                  placeholder="Símanúmer"
                  hasError={!!errors.simanumer}
                  errorMessage={errors.simanumer?.message}
                  required
                />
              )}
            />

            <Controller
              name="netfang"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Netfang"
                  containerClassName="w-full"
                  placeholder="Netfang"
                  hasError={!!errors.netfang}
                  errorMessage={errors.netfang?.message}
                  required
                />
              )}
            />
          </div>

          <Controller
            name="heimilisfang"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Heimilisfang"
                placeholder="Heimilisfang"
                hasError={!!errors.heimilisfang}
                errorMessage={errors.heimilisfang?.message}
                required
              />
            )}
          />

          <Box marginTop={3}>
            <NextSubmit
              handleBack={onBack || (() => {})}
              handleNext={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            />
          </Box>
        </Stack>
      </form>
    </div>
  );

  return formContent;
};

export default DataCollectionForm;
