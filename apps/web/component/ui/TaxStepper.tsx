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

const GET_TAX_REPORT_DETAILED = gql`
  query GetTaxReportDetailed($id: Int!) {
    taxReportDetailed(id: $id) {
      id
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
      assets {
        id
        assetType
        taxReturnId
        taxpayerId
        dateCreated
        dateModified
        realEstate {
          id
          address
          propertyValue
          purchaseYear
          taxpayerId
          dateCreated
          dateModified
        }
        vehicle {
          id
          purchasePrice
          purchaseYear
          registrationNumber
          taxpayerId
          dateCreated
          dateModified
        }
      }
      debts {
        id
        debtType
        creditorName
        taxReturnId
        taxYear
        taxpayerId
        createdAt
        updatedAt
        housingLoan {
          id
          annualPayments
          interestExpenses
          lenderId
          lenderName
          loanDate
          loanNumber
          loanTermYears
          principalRepayment
          propertyAddress
          remainingBalance
          taxYear
          taxpayerId
          dateCreated
          dateModified
        }
        otherDebt {
          id
          creditorName
          debtIdentifier
          debtType
          interestExpenses
          remainingBalance
          taxYear
          taxpayerId
          dateCreated
          dateModified
        }
      }
      benefits {
        id
        amount
        benefitType
        description
        providerName
        taxReturnId
        taxYear
        taxpayerId
        createdAt
        updatedAt
      }
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

  // Get detailed data for the first tax report if available
  const { data: detailedData } = useQuery(GET_TAX_REPORT_DETAILED, {
    variables: {
      id: taxReportsData?.taxReports?.data[0]?.id
    },
    skip: !taxReportsData?.taxReports?.data[0]?.id
  })

  if (loading) return <div>Loading...</div>
  if (error) {
    console.error('Error fetching tax reports:', error)
    return <div>Error loading tax reports</div>
  }

  console.log('Basic Tax Reports Data:', taxReportsData)
  console.log('Detailed Tax Report Data:', detailedData)

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
    content = (
      <DataCollectionForm
        onNext={handleNext}
        
        onBack={handleBack}
      />
    )
  } else if (step === 2) {
    content = (
      <RevenueForm
        onNext={handleNext}
        onBack={handleBack}
      />
    )
  } else if (step === 3) {
    content = (
      <AssetsForm
        onNext={handleNext}
        initialData={formData[3]}
        onBack={handleBack}
      />
    )
  } else if (step === 4) {
    if (subStep === 0) {
      content = (
        <InterestExpensesForm
          onNext={handleNext}
          initialData={formData[4]?.[0]}
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
