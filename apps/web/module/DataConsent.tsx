import React, { useState } from 'react'
import NextSubmit from '../component/ui/NextSubmit'
import { Checkbox } from '../component/Checkbox/Checkbox'
import { Link } from '../component/Link/Link'
import { Box } from '../component/Box/Box'
import { Stack } from '../component/Stack/Stack'
import { Text } from '../component/Text/Text'
import { Icon } from '../component/IconRC/Icon'

interface DataConsentProps {
  onNext?: () => void
  onBack?: () => void
}

const DataRetrievalConsent: React.FC<DataConsentProps> = ({
  onNext,
  onBack,
}) => {
  const [consentChecked, setConsentChecked] = useState(false)
  
  const handleNext = () => {
    if (consentChecked && onNext) {
      onNext()
    }
  }
  
  return (
    <Box paddingY={4}>
      <Stack space={4}>
        {/* Heading */}
        <Text variant="h2" fontWeight="semiBold">
          Gagnaöflun
        </Text>
        
        {/* Info line with icon - made responsive */}
        <div className='w-full flex flex-col sm:flex-row items-start sm:items-center gap-2'>
          <div className="flex-shrink-0">
            <Icon type='outline' icon='archive' color='blue400' />
          </div>
          <div className="text-slate-900 text-xl font-semibold leading-loose sm:w-[660px]">
            Eftirfarandi gögn verða sótt rafrænt með þínu samþykki.
          </div>
        </div>
        
        {/* Data source information */}
        <Box>
          <Text variant="h4" color="blue400" marginBottom={1}>
            Upplýsingar úr gagnagrunni Skattsins
          </Text>
          <Text>
            Til þess að forskrá upplýsingar og auðvelda þér að fylla út
            framtalið
          </Text>
        </Box>
        
        {/* Consent checkbox in a blue background box - made responsive */}
        <div className="w-full px-4 sm:px-6 py-6 bg-sky-50 rounded-lg border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            <Checkbox
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              label="Ég skil að persónuupplýsinga verði aflað"
              hasError={!consentChecked}
            />
          </div>
          <div className="w-full sm:w-auto text-right">
            <Link href="#" color="blue400">
              Skilmálar um persónuupplýsingar
            </Link>
          </div>
        </div>
        
        <Box marginTop={4}>
          <NextSubmit
            handleBack={onBack || (() => {})}
            handleNext={handleNext}
            disabled={!consentChecked}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default DataRetrievalConsent