import { Button } from "../Button/Button"

const NextSubmit = ({
  handleBack,
  handleNext,
  disabled=false
}: {
  handleBack: () => void
  handleNext: () => void
  disabled: boolean
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Button onClick={handleBack} variant="ghost">
        Til baka
      </Button>
      <div className='flex items-center gap-4'>
      <Button disabled={disabled} onClick={handleNext} variant='ghost'>
        Vista framtal
      </Button>
      <Button disabled={disabled} onClick={handleNext} icon="arrowForward">
        Áfram
      </Button>
      </div>
    </div>
  )
}

export default NextSubmit
