import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, gql } from '@apollo/client'

import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Box } from '../component/Box/Box'
import { Divider } from '../component/Divider/Divider'
import { GridColumn } from '../component/Grid/GridColumn/GridColumn'
import { GridRow } from '../component/Grid/GridRow/GridRow'
import { Icon } from '../component/IconRC/Icon'
import { Input } from '../component/Input/Input'
import { Select } from '../component/Select/Select'
import { Text } from '../component/Text/Text'
import NextSubmit from '../component/ui/NextSubmit'

const incomeItemSchema = z.object({
  source: z
    .string()
    .min(1, { message: 'Vinsamlegast fylltu út uppruna tekna' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'Upphæð verður að vera tala' }),
})

const subsidyItemSchema = z.object({
  type: z.string().min(1, { message: 'Vinsamlegast veldu tegund' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'Upphæð verður að vera tala' }),
})

const pensionItemSchema = z.object({
  source: z
    .string()
    .min(1, { message: 'Vinsamlegast fylltu út uppruna greiðslu' }),
  amount: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'Upphæð verður að vera tala' }),
})

const formSchema = z.object({
  incomeItems: z.array(incomeItemSchema).min(1),
  subsidyItems: z.array(subsidyItemSchema),
  pensionItems: z.array(pensionItemSchema)
})

type FormData = z.infer<typeof formSchema>

interface RevenueFormProps {
  onNext?: (data: FormData) => void
  initialData?: Partial<FormData>
  onBack?: () => void
}

const CREATE_INCOME_SOURCE = gql`
  mutation CreateIncomeSource($input: CreateIncomeSourceInput!) {
    createIncomeSource(input: $input) {
      id
      sourceName
      amount
      incomeType
      sourceIdNumber
      taxReturnId
      taxYear
      dateCreated
      dateModified
    }
  }
`

const CREATE_BENEFIT = gql`
  mutation CreateBenefit($input: CreateBenefitInput!) {
    createBenefit(createBenefitInput: $input) {
      id
      amount
      benefitType
      providerName
      taxReturnId
      taxYear
      taxpayerId
    }
  }
`

const RevenueForm: React.FC<RevenueFormProps> = ({
  onNext,
  initialData,
  onBack,
}) => {
  const [createIncomeSource] = useMutation(CREATE_INCOME_SOURCE)
  const [createBenefit] = useMutation(CREATE_BENEFIT)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      incomeItems: [{ source: '', amount: '' }],
      subsidyItems: [],
      pensionItems: [],
    },
  });

  const { fields: incomeFields, append: appendIncome } = useFieldArray({
    control,
    name: 'incomeItems',
  })

  const { fields: subsidyFields, append: appendSubsidy } = useFieldArray({
    control,
    name: 'subsidyItems',
  })

  const { fields: pensionFields, append: appendPension } = useFieldArray({
    control,
    name: 'pensionItems',
  })

  const subsidyOptions = [
    { label: 'Ferðaskrifstofan', value: 'Ferðaskrifstofan' },
    { label: 'Ökutækjastyrkur', value: 'Ökutækjastyrkur' },
    { label: 'Dagpeningar', value: 'Dagpeningar' },
    { label: 'Bifreiðahlunnindi', value: 'Bifreiðahlunnindi' },
    { label: 'Húsnæðishlunnindi', value: 'Húsnæðishlunnindi' },
    { label: 'Annað, hvað?', value: 'Annað, hvað?' },
  ]

  const pensionOptions = [
    { label: 'Íþróttastyrkur', value: 'Íþróttastyrkur' },
    { label: 'Starfsmenntastyrkur', value: 'Starfsmenntastyrkur' },
    { label: 'Lífeyrisstyrkur', value: 'Lífeyrisstyrkur' },
    { label: 'Sjúkrastyrkur', value: 'Sjúkrastyrkur' }
  ]

  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data)
    
    try {
      // Create income sources
      const incomeSourcePromises = data.incomeItems.map(item => 
        createIncomeSource({
          variables: {
            input: {
              sourceName: item.source,
              amount: parseFloat(item.amount),
              incomeType: 'SALARY', // Default type, you might want to make this configurable
              taxYear: new Date().getFullYear(),
              // taxReturnId will be set by the backend if needed
            }
          }
        })
      )

      // Create subsidy benefits
      const subsidyBenefitPromises = data.subsidyItems.map(item =>
        createBenefit({
          variables: {
            input: {
              amount: parseFloat(item.amount),
              benefitType: item.type,
              providerName: item.type, // Using type as provider name for subsidies
              taxYear: new Date().getFullYear(),
              // taxReturnId and taxpayerId will be set by the backend if needed
            }
          }
        })
      )

      // Create pension benefits
      const pensionBenefitPromises = data.pensionItems.map(item =>
        createBenefit({
          variables: {
            input: {
              amount: parseFloat(item.amount),
              benefitType: 'PENSION',
              providerName: item.source,
              taxYear: new Date().getFullYear(),
              // taxReturnId and taxpayerId will be set by the backend if needed
            }
          }
        })
      )

      const [incomeResults, subsidyResults, pensionResults] = await Promise.all([
        Promise.all(incomeSourcePromises),
        Promise.all(subsidyBenefitPromises),
        Promise.all(pensionBenefitPromises)
      ])

      console.log('Created income sources:', incomeResults)
      console.log('Created subsidy benefits:', subsidyResults)
      console.log('Created pension benefits:', pensionResults)

      if (onNext) {
        onNext(data)
      }
    } catch (error) {
      console.error('Error creating records:', error)
      // You might want to show an error message to the user here
    }
  }

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
                  <GridColumn span={['12/12', '12/12', '6/12']}>
                    <Controller
                      name={`incomeItems.${index}.source`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          backgroundColor="blue100"
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
                  <GridColumn span={['12/12', '12/12', '6/12']}>
                    <Controller
                      name={`incomeItems.${index}.amount`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          backgroundColor="blue100"
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
              <span
                onClick={() => appendIncome({ source: '', amount: '' })}
                className='flex gap-2 items-center'
              >
                <Icon type='outline' icon='add' color='blue400' />
                <Text fontWeight='semiBold' color='blue400'>Bæta við línu</Text>
              </span>
            </Box>
          </Box>

          <Divider />

          <Box marginY={4}>
            <Text variant="h3" as="h2">
              Ökutækjastyrkur. Dagpeningar. Hlunnindi
            </Text>

            {subsidyFields.length > 0 ? (
              subsidyFields.map((field, index) => (
                <Box key={field.id} marginY={2}>
                  <GridRow>
                    <GridColumn span={['12/12', '12/12', '6/12']}>
                      <Controller
                        name={`subsidyItems.${index}.type`}
                        control={control}
                        render={({ field: { onChange, value, ...field } }) => (
                          <Select
                            {...field}
                            label="Tegund"
                            options={subsidyOptions}
                            placeholder="Veldu tegund"
                            hasError={!!errors.subsidyItems?.[index]?.type}
                            errorMessage={
                              (errors.subsidyItems?.[index]?.type as any)?.message || ''
                            }
                            value={
                              subsidyOptions.find(
                                (option) => option.value === value,
                              ) || null
                            }
                            onChange={(option) => onChange(option?.value || '')}
                          />
                        )}
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '12/12', '6/12']}>
                      <Controller
                        name={`subsidyItems.${index}.amount`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            backgroundColor="blue100"
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
              ))
            ) : (
              <Box marginY={2}>
                <Text color="dark400">Engir styrkir eða hlunnindi skráð</Text>
              </Box>
            )}

            <Box display="flex" justifyContent="flexEnd" marginTop={2}>
              <span
                onClick={() => appendSubsidy({ type: '', amount: '' })}
                className='flex gap-2 items-center'
              >
                <Icon type='outline' icon='add' color='blue400' />
                <Text fontWeight='semiBold' color='blue400'>Bæta við línu</Text>
              </span>
            </Box>
          </Box>

          <Divider />

          <Box marginY={4}>
            <Text variant="h3" as="h2">
              Lífeyrisgreiðslur. Greiðslur frá Tryggingastofnun. Aðrar bótagreiðslur, styrkir o.fl.
            </Text>

            {pensionFields.length > 0 ? (
              pensionFields.map((field, index) => (
                <Box key={field.id} marginY={2}>
                  <GridRow>
                    <GridColumn span={['12/12', '12/12', '6/12']}>
                      <Controller
                        name={`pensionItems.${index}.source`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            backgroundColor="blue100"
                            {...field}
                            label="Greiðslur frá"
                            placeholder="Nafn stofnunar eða samtaka"
                            hasError={!!errors.pensionItems?.[index]?.source}
                            errorMessage={
                              errors.pensionItems?.[index]?.source?.message
                            }
                            required
                          />
                        )}
                      />
                    </GridColumn>
                    <GridColumn span={['12/12', '12/12', '6/12']}>
                      <Controller
                        name={`pensionItems.${index}.amount`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            backgroundColor="blue100"
                            {...field}
                            label="Upphæð kr."
                            placeholder="0"
                            hasError={!!errors.pensionItems?.[index]?.amount}
                            errorMessage={
                              errors.pensionItems?.[index]?.amount?.message
                            }
                            required
                          />
                        )}
                      />
                    </GridColumn>
                  </GridRow>
                </Box>
              ))
            ) : (
              <Box marginY={2}>
                <Text color="dark400">Engar lífeyrisgreiðslur eða styrkir skráðir</Text>
              </Box>
            )}

            <Box display="flex" justifyContent="flexEnd" marginTop={2}>
              <span
                onClick={() => appendPension({ source: '', amount: '' })}
                className='flex gap-2 items-center'
              >
                <Icon type='outline' icon='add' color='blue400' />
                <Text fontWeight='semiBold' color='blue400'>Bæta við línu</Text>
              </span>
            </Box>
          </Box>

          <Box marginTop={4}>
            <NextSubmit
              handleBack={onBack || (() => { })}
              handleNext={handleSubmit(onSubmit)}
              disabled={false}
            />
          </Box>
        </form>
    </Box>
  )
}

export default RevenueForm