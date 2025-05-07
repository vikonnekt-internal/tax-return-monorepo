'use client'
import { useState } from 'react'
import AssetsForm from '../../module/AssetsForm'
import DataCollectionForm from '../../module/DataCollectionForm'
import DataRetrievalConsent from '../../module/DataConsent'
import InterestExpensesForm from '../../module/InterestExpensesForm'
import OtherDebtsExpenses from '../../module/OtherDebtsExpenses'
import RevenueForm from '../../module/RevenueForm'
import StepperResult from '../../module/StepperResult'
import SectionWrapper from '../layout/SectionWrapper'
import { Box } from '../Box/Box'
import Button from '../core/Button'
import { FormStepper } from '../FormStepper/FormStepper'
import { useQuery, gql } from '@apollo/client'
import { Text } from '../Text/Text'
import React from 'react'

type FormDataMap = {
  [key: number]: any
}

type IncomeSource = {
  id: string
  sourceName: string
  amount: number
  incomeType: string
  sourceIdNumber?: string
  taxReturnId?: number
  taxYear: number
  taxpayerId: string
  dateCreated: string
  dateModified: string
}

type Benefit = {
  id: string
  amount: number
  benefitType: string
  providerName: string
  taxReturnId?: number
  taxYear: number
  taxpayerId: string
  createdAt: string
  updatedAt: string
}

type Asset = {
  id: string
  assetType: string
  realEstate?: {
    address: string
    propertyValue: number
    id: string
  }
  vehicle?: {
    registrationNumber: string
    purchasePrice: number
    purchaseYear?: number
  }
}

type Debt = {
  id: string
  debtType: string
  housingLoan?: {
    interestExpenses: number
    lenderName: string
    loanDate: string
  }
  otherDebt?: {
    interestExpenses: number
    creditorName: string
    debtType: string
  }
}

const steps = [
  { name: 'Gagnaöflun' },
  { name: 'Samskiptaupplýsingar' },
  { name: 'Tekjur ársins 2024' },
  { name: 'Eignir ársins 2024' },
  {
    name: 'Skuldir og vaxtagjöld 2024',
    subSteps: [
      { name: 'Vaxtagjöld vegna íbúðarhús..' },
      { name: 'Aðrar skuldir og vaxtagjöld' },
    ],
  },
  { name: 'Samþykki' },
  { name: 'Yfirlit' },
]

const getStepIndex = (step: number, subStep: number) => {
  if (step < 4) return step
  if (step === 4) return 4
  return step
}

const GET_TAX_REPORTS = gql`
  query GetTaxReports($paginationInput: PaginationInput) {
    taxReports(paginationInput: $paginationInput) {
      data {
        id
        taxYear
        status
        totalIncome
        totalDeductions
        totalTaxableIncome
        totalTaxes
        totalOwed
        totalRefund
        submissionDate
        dateCreated
        dateModified
        notes
        userId
        taxpayerId
        taxpayer {
          id
          firstName
          lastName
          email
          phoneNumber
          city
          postalCode
          streetAddress
          fullAddress
          taxYear
          dateCreated
          dateModified
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`

const GET_BENEFITS = gql`
  query GetBenefits($taxYear: Int!) {
    benefits(taxYear: $taxYear) {
      data {
        id
        amount
        benefitType
        providerName
        taxReturnId
        taxYear
        taxpayerId
      }
      totalCount
    }
  }
`

const GET_ASSETS = gql`
  query GetAssets($taxYear: Int!) {
    assets(taxYear: $taxYear) {
      data {
        id
        assetType
        realEstate {
          address
          propertyValue
          id
        }
        vehicle {
          registrationNumber
          purchasePrice
          purchaseYear
        }
      }
      totalCount
    }
  }
`

const GET_DEBTS = gql`
  query GetDebts($taxYear: Int!) {
    debts(taxYear: $taxYear) {
      data {
        id
        debtType
        housingLoan {
          interestExpenses
          lenderName
          loanDate
        }
        otherDebt {
          interestExpenses
          creditorName
          debtType
        }
      }
      totalCount
    }
  }
`

const GET_TAX_REPORT_DETAILED = gql`
  query GetTaxReportDetailed($id: Int!) {
    taxReportDetailed(id: $id) {
      id
      taxpayerId
      taxpayer {
        id
        firstName
        lastName
        email
        phoneNumber
        fullAddress
        city
        postalCode
        streetAddress
        taxYear
        dateCreated
        dateModified
      }
      incomeSources {
        id
        sourceName
        amount
        incomeType
        sourceIdNumber
        taxReturnId
        taxYear
        taxpayerId
        dateCreated
        dateModified
      }
      dateCreated
      dateModified
      status
      taxYear
    }
  }
`

const TaxStepper = () => {
  const [step, setStep] = useState<number>(0)
  const [subStep, setSubStep] = useState<number>(0)
  const [formData, setFormData] = useState<FormDataMap>({})
  const { data: taxReportsData, loading, error } = useQuery(GET_TAX_REPORTS, {
    variables: {
      paginationInput: {
        limit: 10
      }
    }
  })

  // Get benefits data
  const { data: benefitsData, loading: benefitsLoading, error: benefitsError } = useQuery(GET_BENEFITS, {
    variables: {
      taxYear: taxReportsData?.taxReports?.data[0]?.taxYear || new Date().getFullYear()
    },
    skip: !taxReportsData?.taxReports?.data[0]?.taxYear
  })

  // Get assets data
  const { data: assetsData, loading: assetsLoading, error: assetsError } = useQuery(GET_ASSETS, {
    variables: {
      taxYear: taxReportsData?.taxReports?.data[0]?.taxYear || new Date().getFullYear()
    },
    skip: !taxReportsData?.taxReports?.data[0]?.taxYear
  })

  // Get debts data
  const { data: debtsData, loading: debtsLoading, error: debtsError } = useQuery(GET_DEBTS, {
    variables: {
      taxYear: taxReportsData?.taxReports?.data[0]?.taxYear || new Date().getFullYear()
    },
    skip: !taxReportsData?.taxReports?.data[0]?.taxYear
  })

  // Get detailed data for the first tax report if available
  const { data: detailedData } = useQuery(GET_TAX_REPORT_DETAILED, {
    variables: {
      id: taxReportsData?.taxReports?.data[0]?.id ? parseInt(taxReportsData.taxReports.data[0].id) : undefined
    },
    skip: !taxReportsData?.taxReports?.data[0]?.id
  })

  if (loading || assetsLoading || benefitsLoading || debtsLoading) return <div>Loading...</div>
  if (error) {
    console.error('Error fetching tax reports:', error)
    return <div>Error loading tax reports</div>
  }
  if (assetsError) {
    console.error('Error fetching assets:', assetsError)
    return <div>Error loading assets</div>
  }
  if (benefitsError) {
    console.error('Error fetching benefits:', benefitsError)
    return <div>Error loading benefits</div>
  }
  if (debtsError) {
    console.error('Error fetching debts:', debtsError)
    return <div>Error loading debts</div>
  }

  console.log('Tax Year:', taxReportsData?.taxReports?.data[0]?.taxYear)
  console.log('Raw Assets Data:', assetsData)
  console.log('Raw Debts Data:', debtsData)
  console.log('Assets Data Structure:', assetsData?.assets?.data)
  console.log('Debts Data Structure:', debtsData?.debts?.data)
  console.log('Detailed Data:', detailedData)
  console.log('Benefits Data:', benefitsData)

  // Helper function to map benefits to subsidy items
  const mapBenefitsToSubsidies = (benefits: any[] | undefined) => {
    if (!benefits) return []
    
    return benefits.map(benefit => ({
      type: benefit.benefitType || 'Annað, hvað?',
      amount: benefit.amount.toString()
    }))
  }

  // Helper function to map benefits to pension items
  const mapBenefitsToPensions = (benefits: any[] | undefined) => {
    if (!benefits) return []
    
    return benefits.map(benefit => ({
      source: benefit.providerName || 'Annað, hvað?',
      amount: benefit.amount.toString()
    }))
  }

  // Helper function to map assets to form data
  const mapAssetsToFormData = (assets: any[] | undefined) => {
    console.log('Mapping assets:', assets)
    if (!assets || !Array.isArray(assets)) {
      console.log('No assets or invalid assets array')
      return { 
        realEstate: [{ fastanumer: '', heimilisfang: '', fasteign_mat: '' }],
        vehicles: [{ numer: '', kaupar: '', kaupverd: '' }]
      }
    }

    const realEstate = assets
      .filter(asset => {
        console.log('Checking asset:', asset)
        return asset.assetType === 'REAL_ESTATE' && asset.realEstate
      })
      .map(asset => ({
        fastanumer: asset.realEstate.id,
        heimilisfang: asset.realEstate.address,
        fasteign_mat: asset.realEstate.propertyValue.toString()
      }))

    const vehicles = assets
      .filter(asset => {
        console.log('Checking vehicle:', asset)
        return asset.assetType === 'VEHICLE' && asset.vehicle
      })
      .map(asset => ({
        numer: asset.vehicle.registrationNumber,
        kaupar: asset.vehicle.purchaseYear?.toString() || '',
        kaupverd: asset.vehicle.purchasePrice.toString()
      }))

    console.log('Mapped real estate:', realEstate)
    console.log('Mapped vehicles:', vehicles)

    return {
      realEstate: realEstate.length > 0 ? realEstate : [{ fastanumer: '', heimilisfang: '', fasteign_mat: '' }],
      vehicles: vehicles.length > 0 ? vehicles : [{ numer: '', kaupar: '', kaupverd: '' }]
    }
  }

  // Helper function to map debts to interest expenses
  const mapDebtsToInterestExpenses = (debts: any[] | undefined) => {
    console.log('Mapping debts:', debts)
    if (!debts || !Array.isArray(debts)) {
      console.log('No debts or invalid debts array')
      return [{
        lánshluti: 'Húsnæðislán',
        vextir: '',
        dagsetning: ''
      }]
    }

    const interestExpenses = debts.map(debt => {
      if (debt.debtType === 'HOUSING_LOAN' && debt.housingLoan) {
        return {
          lánshluti: 'Húsnæðislán',
          vextir: debt.housingLoan.interestExpenses.toString(),
          dagsetning: debt.housingLoan.loanDate
        }
      } else if (debt.debtType === 'OTHER_DEBT' && debt.otherDebt) {
        return {
          lánshluti: debt.otherDebt.debtType === 'CAR_LOAN' ? 'Bílalán' : 'Persónulán',
          vextir: debt.otherDebt.interestExpenses.toString(),
          dagsetning: new Date().toISOString().split('T')[0] // Default to current date if not available
        }
      }
      return {
        lánshluti: 'Húsnæðislán',
        vextir: '',
        dagsetning: ''
      }
    })

    console.log('Mapped interest expenses:', interestExpenses)
    return interestExpenses.length > 0 ? interestExpenses : [{
      lánshluti: 'Húsnæðislán',
      vextir: '',
      dagsetning: ''
    }]
  }

  const subsidyItems = mapBenefitsToSubsidies(benefitsData?.benefits?.data)
  const pensionItems = mapBenefitsToPensions(benefitsData?.benefits?.data)
  const mappedAssetsData = mapAssetsToFormData(assetsData?.assets?.data)
  const mappedDebtsData = mapDebtsToInterestExpenses(debtsData?.debts?.data)

  console.log('Final mapped assets data:', mappedAssetsData)
  console.log('Final mapped debts data:', mappedDebtsData)

  const handleNext = (data: any) => {
    let newFormData = { ...formData }
    if (step === 4) {
      if (!newFormData[step]) newFormData[step] = {}
      newFormData[step][subStep] = data
    } else {
      newFormData[step] = data
    }
    setFormData(newFormData)

    if (step === 4) {
      if (subStep === 0) {
        setSubStep(1)
      } else {
        setStep(step + 1)
        setSubStep(0)
      }
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step === 0) return
    if (step === 4 && subStep === 1) {
      setSubStep(0)
    } else if (step === 4 && subStep === 0) {
      setStep(3)
      setSubStep(0)
    } else {
      setStep(step - 1)
      setSubStep(0)
    }
  }

  const sections = steps.map((s, i) =>
    s.subSteps
      ? {
          name: s.name,
          type: 'form',
          children: s.subSteps.map((ss, j) => ({
            name: ss.name,
            onClick: () => {
              setStep(i)
              setSubStep(j)
            },
          })),
        }
      : {
          name: s.name,
          type: 'form',
          children: [
            {
              name: s.name,
              onClick: () => {
                setStep(i)
                setSubStep(0)
              },
            },
          ],
        },
  )

  let content = null
  if (step === 0) {
    content = (
      <DataRetrievalConsent onNext={() => setStep(1)} onBack={handleBack} />
    )
  } else if (step === 1) {
    console.log('Taxpayer Data for Form:', detailedData?.taxReportDetailed?.taxpayer)
    content = (
      <DataCollectionForm
        onNext={handleNext}
        initialData={{
          nafn: detailedData?.taxReportDetailed?.taxpayer?.firstName 
            ? `${detailedData.taxReportDetailed.taxpayer.firstName} ${detailedData.taxReportDetailed.taxpayer.lastName}`
            : '',
          kennitala: detailedData?.taxReportDetailed?.taxpayer?.id || '',
          simanumer: detailedData?.taxReportDetailed?.taxpayer?.phoneNumber || '',
          netfang: detailedData?.taxReportDetailed?.taxpayer?.email || '',
          heimilisfang: detailedData?.taxReportDetailed?.taxpayer?.fullAddress || '',
        }}
        onBack={handleBack}
      />
    )
  } else if (step === 2) {
    content = (
      <RevenueForm
        onNext={handleNext}
        initialData={{
          incomeItems: detailedData?.taxReportDetailed?.incomeSources?.map((source: IncomeSource) => ({
            source: source.sourceName,
            amount: source.amount.toString()
          })) || [{ source: '', amount: '' }],
          subsidyItems: subsidyItems,
          pensionItems: pensionItems
        }}
        onBack={handleBack}
      />
    )
  } else if (step === 3) {
    content = (
      <AssetsForm
        onNext={handleNext}
        initialData={mappedAssetsData}
        onBack={handleBack}
      />
    )
  } else if (step === 4) {
    if (subStep === 0) {
      content = (
        <InterestExpensesForm
          onNext={handleNext}
          initialData={{
            interestExpenses: mappedDebtsData
          }}
          onBack={handleBack}
        />
      )
    } else {
      content = (
        <OtherDebtsExpenses
          onNext={handleNext}
          initialData={formData[4]?.[1]}
          onBack={handleBack}
        />
      )
    }
  } else if (step === 5) {
    content = (
      <Box padding={4}>
        <Text variant="h2">Samþykki</Text>
        <Text>
          Staðfestu að allar upplýsingar séu réttar og smelltu á "Áfram".
        </Text>
        <Button onClick={() => setStep(6)}>Áfram</Button>
      </Box>
    )
  } else if (step === 6) {
    content = <StepperResult data={formData} />
  }

  return (
    <Box background={'purple100'} paddingBottom={8} paddingTop={8}>
      <SectionWrapper>
        <div className="w-full flex gap-8">
          <div className="w-full bg-white p-8">{content}</div>
          <div style={{ minWidth: 320 }}>
            <FormStepper
              sections={sections}
              activeSection={getStepIndex(step, subStep)}
              activeSubSection={step === 4 ? subStep : 0}
            />
          </div>
        </div>
      </SectionWrapper>
    </Box>
  )
}

export default TaxStepper
