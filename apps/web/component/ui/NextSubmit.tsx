import { Button } from "../Button/Button";

const NextSubmit = ({
  handleBack,
  handleNext,
}: {
  handleBack: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <Button onClick={handleBack} variant="utility">
        Til baka
      </Button>
      <Button onClick={handleNext} icon="arrowForward">
        Áfram
      </Button>
    </div>
  );
};

export default NextSubmit;
