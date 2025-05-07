import MainLayout from "../../component/layout/MainLayout";

import TaxStepper from "../../component/ui/TaxStepper";
const TaxPage = () => {
  return (
    <MainLayout loggedIn={true}>
      <TaxStepper />
    </MainLayout>
  );
};

export default TaxPage;
