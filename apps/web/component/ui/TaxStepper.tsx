'use client'
import { useState, useEffect } from 'react'
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
import EndStepper from '../../module/EndStepper'

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
  { name: 'Yfirlit' },
  { name: 'Samþykki' },
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
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [showSidebar, setShowSidebar] = useState<boolean>(true)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setShowSidebar(window.innerWidth >= 768)
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    if (!assets || !Array.isArray(assets)) {
      return { 
        realEstate: [{ fastanumer: '', heimilisfang: '', fasteign_mat: '' }],
        vehicles: [{ numer: '', kaupar: '', kaupverd: '' }]
      }
    }

    const realEstate = assets
      .filter(asset => asset.assetType === 'REAL_ESTATE' && asset.realEstate)
      .map(asset => ({
        fastanumer: asset.realEstate.id,
        heimilisfang: asset.realEstate.address,
        fasteign_mat: asset.realEstate.propertyValue.toString()
      }))

    const vehicles = assets
      .filter(asset => asset.assetType === 'VEHICLE' && asset.vehicle)
      .map(asset => ({
        numer: asset.vehicle.registrationNumber,
        kaupar: asset.vehicle.purchaseYear?.toString() || '',
        kaupverd: asset.vehicle.purchasePrice.toString()
      }))

    return {
      realEstate: realEstate.length > 0 ? realEstate : [{ fastanumer: '', heimilisfang: '', fasteign_mat: '' }],
      vehicles: vehicles.length > 0 ? vehicles : [{ numer: '', kaupar: '', kaupverd: '' }]
    }
  }

  // Helper function to map debts to interest expenses
  const mapDebtsToInterestExpenses = (debts: any[] | undefined) => {
    if (!debts || !Array.isArray(debts)) {
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
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
        taxpayerId={detailedData?.taxReportDetailed?.taxpayer?.id || ''}
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
     <EndStepper onNext={handleNext} onBack={handleBack}/> 
    )
  } else if (step === 6) {
    content = <StepperResult data={formData} />
  }

  return (
    <Box background={'purple100'} paddingBottom={8} paddingTop={8}>
      <SectionWrapper>
        {/* Mobile View - Toggle Button for Sidebar */}
        {isMobile && (
          <div className="mb-4">
            <Button 
              onClick={toggleSidebar} 
              variant="secondary"
              size="sm"
              className="w-full"
            >
              {showSidebar ? 'Fela skref' : 'Sýna skref'}
            </Button>
          </div>
        )}

        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Main Content Area */}
          <div className={`w-full bg-white p-4 md:p-8 order-2 md:order-1 ${showSidebar && isMobile ? 'mt-4' : ''}`}>
            {content}
          </div>

          {/* Sidebar/Stepper */}
          {showSidebar && (
            <div className="order-1 md:order-2 w-full md:w-auto md:min-w-[320px]">
              <FormStepper
                sections={sections}
                activeSection={getStepIndex(step, subStep)}
                activeSubSection={step === 4 ? subStep : 0}
              />
            </div>
          )}
        </div>
      </SectionWrapper>
    </Box>
  )
}

export default TaxStepper