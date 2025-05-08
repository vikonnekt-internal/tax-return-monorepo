import React from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation, gql } from '@apollo/client'

import NextSubmit from '../component/ui/NextSubmit'
import { GridRow } from '../component/Grid/GridRow/GridRow'
import { Box } from '../component/Box/Box'
import { GridColumn } from '../component/Grid/GridColumn/GridColumn'
import { Divider } from '../component/Divider/Divider'
import { Icon } from '../component/IconRC/Icon'
import { Input } from '../component/Input/Input'
import { Text } from '../component/Text/Text'

const realEstateSchema = z.object({
  fastanumer: z.string().regex(/^\d+(-\d+)?$/, { message: 'Ógilt fastanúmer' }),
  heimilisfang: z.string().min(1, { message: 'Heimilisfang er nauðsynlegt' }),
  fasteign_mat: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'Upphæð verður að vera tala' }),
})

const vehicleSchema = z.object({
  numer: z.string().min(1, { message: 'Skráningarnúmer er nauðsynlegt' }),
  kaupar: z
    .string()
    .regex(/^\d{4}$/, { message: 'Ártal verður að vera 4 tölustafir' }),
  kaupverd: z
    .string()
    .regex(/^\d+(\.\d+)?$/, { message: 'Upphæð verður að vera tala' }),
})

const formSchema = z.object({
  realEstate: z.array(realEstateSchema).min(1),
  vehicles: z.array(vehicleSchema),
})

type FormData = z.infer<typeof formSchema>

interface AssetsFormProps {
  onNext?: (data: FormData) => void
  initialData?: Partial<FormData>
  onBack?: () => void
  taxpayerId: string
}

const CREATE_REAL_ESTATE = gql`
  mutation CreateRealEstate($input: CreateRealEstateInput!) {
    createRealEstate(createRealEstateInput: $input) {
      id
      address
      propertyValue
      purchaseYear
      taxpayerId
      dateCreated
      dateModified
    }
  }
`

const CREATE_VEHICLE = gql`
  mutation CreateVehicle($input: CreateVehicleInput!) {
    createVehicle(input: $input) {
      id
      registrationNumber
      purchasePrice
      purchaseYear
      taxpayerId
      dateCreated
      dateModified
    }
  }
`

const AssetsForm: React.FC<AssetsFormProps> = ({
  onNext,
  initialData,
  onBack,
  taxpayerId,
}) => {
  const [createRealEstate] = useMutation(CREATE_REAL_ESTATE)
  const [createVehicle] = useMutation(CREATE_VEHICLE)

  if (!taxpayerId) {
    return (
      <Box>
        <Text>Vinsamlegast skráðu þig inn til að halda áfram</Text>
      </Box>
    )
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      realEstate: [
        {
          fastanumer: '210-9876',
          heimilisfang: 'Bláfjallagata 12',
          fasteign_mat: '52.000.000',
        },
      ],
      vehicles: [
        { numer: 'KB-521', kaupar: '2021', kaupverd: '3.100.000' },
        { numer: 'JU-329', kaupar: '2012', kaupverd: '430.000' },
      ],
    },
  })

  const { fields: realEstateFields, append: appendRealEstate } = useFieldArray({
    control,
    name: 'realEstate',
  })

  const { fields: vehicleFields, append: appendVehicle } = useFieldArray({
    control,
    name: 'vehicles',
  })

  const onSubmit = async (data: FormData) => {
    console.log('Form data:', data)
    
    try {
      // Create real estate assets
      const realEstatePromises = data.realEstate.map(item =>
        createRealEstate({
          variables: {
            input: {
              address: item.heimilisfang.trim(),
              propertyId: item.fastanumer.trim(),
              propertyValue: parseFloat(item.fasteign_mat.replace(/[^\d]/g, '')),
              taxYear: new Date().getFullYear(),
              purchaseYear: undefined, // Optional field
              taxpayerId
            }
          }
        })
      )

      // Create vehicle assets
      const vehiclePromises = data.vehicles.map(item =>
        createVehicle({
          variables: {
            input: {
              registrationNumber: item.numer.trim(),
              purchasePrice: parseFloat(item.kaupverd.replace(/[^\d]/g, '')),
              purchaseYear: item.kaupar ? parseInt(item.kaupar) : undefined,
              taxYear: new Date().getFullYear(),
              taxpayerId
            }
          }
        })
      )

      const [realEstateResults, vehicleResults] = await Promise.all([
        Promise.all(realEstatePromises),
        Promise.all(vehiclePromises)
      ])

      console.log('Created real estate assets:', realEstateResults)
      console.log('Created vehicle assets:', vehicleResults)

      if (onNext) {
        onNext(data)
      }
    } catch (error) {
      console.error('Error creating assets:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Real Estate Section */}
        <Box marginBottom={4}>
          {realEstateFields.map((field, index) => (
            <Box key={field.id} marginY={2}>
              <GridRow>
                <GridColumn span={['12/12', '6/12', '6/12']}>
                  <Controller
                    name={`realEstate.${index}.fastanumer`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Fastanúmer"
                        placeholder="000-0000"
                        hasError={!!errors.realEstate?.[index]?.fastanumer}
                        errorMessage={
                          errors.realEstate?.[index]?.fastanumer?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
                <GridColumn span={['12/12', '6/12', '6/12']}>
                  <Controller
                    name={`realEstate.${index}.heimilisfang`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Heimilisfang"
                        placeholder="Heimilisfang fasteignar"
                        hasError={!!errors.realEstate?.[index]?.heimilisfang}
                        errorMessage={
                          errors.realEstate?.[index]?.heimilisfang?.message
                        }
                        required
                      />
                    )}
                  />
                </GridColumn>
              </GridRow>

              <Box marginTop={2}>
                <Controller
                  name={`realEstate.${index}.fasteign_mat`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Fasteignamat"
                      placeholder="0"
                      hasError={!!errors.realEstate?.[index]?.fasteign_mat}
                      errorMessage={
                        errors.realEstate?.[index]?.fasteign_mat?.message
                      }
                      required
                    />
                  )}
                />
              </Box>
            </Box>
          ))}

          <Box display="flex" justifyContent="flexEnd" marginTop={2}>
            <span
              onClick={() =>
                appendRealEstate({
                  fastanumer: '',
                  heimilisfang: '',
                  fasteign_mat: '',
                })
              }
              className='flex gap-2 items-center'
            >
              <Icon type='outline' icon='add' color='blue400' />
              <Text fontWeight='semiBold' color='blue400'>Bæta við línu</Text>
            </span>
          </Box>
        </Box>

        <Divider />

        {/* Vehicles Section */}
        <Box marginY={4}>
          <Text variant="h3" as="h2">
            Bifreiðir
          </Text>

          {vehicleFields.map((field, index) => (
            <Box key={field.id} marginY={2}>
              <GridRow>
                <GridColumn span={['12/12', '4/12', '4/12']}>
                  <Controller
                    name={`vehicles.${index}.numer`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Númer"
                        placeholder="XX-000"
                        hasError={!!errors.vehicles?.[index]?.numer}
                        errorMessage={errors.vehicles?.[index]?.numer?.message}
                        required
                      />
                    )}
                  />
                </GridColumn>
                <GridColumn span={['12/12', '4/12', '4/12']}>
                  <Controller
                    name={`vehicles.${index}.kaupar`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Kaupár"
                        placeholder="YYYY"
                        hasError={!!errors.vehicles?.[index]?.kaupar}
                        errorMessage={errors.vehicles?.[index]?.kaupar?.message}
                        required
                      />
                    )}
                  />
                </GridColumn>
                <GridColumn span={['12/12', '4/12', '4/12']}>
                  <Controller
                    name={`vehicles.${index}.kaupverd`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Kaupverð"
                        placeholder="0"
                        hasError={!!errors.vehicles?.[index]?.kaupverd}
                        errorMessage={
                          errors.vehicles?.[index]?.kaupverd?.message
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
              onClick={() =>
                appendVehicle({ numer: '', kaupar: '', kaupverd: '' })
              }
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

export default AssetsForm
