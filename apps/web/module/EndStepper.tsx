import { Icon } from "../component/IconRC/Icon";
import { Text } from "../component/Text/Text";
import NextSubmit from "../component/ui/NextSubmit";
export default function TaxDeclarationPage({
    onNext,
    onBack,
}: {
    onNext: () => void,
    onBack: () => void,
}) {
    return (
        <div className="max-w-screen-lg mx-auto p-4 bg-white border border-gray-200 rounded-md">

          <Text variant="h1" as="h1" marginBottom={3} marginTop={3}>Skattframtal einstaklinga</Text>
            <div className="w-full p-4 bg-teal-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-teal-100 inline-flex justify-start items-center gap-4">
                <Icon color="mint400" type="filled" icon="checkmark" />
                <div className="self-stretch justify-center text-slate-900 text-sm font-normal leading-normal">Framtal þitt er móttekið og þú munt fá tilkynningu um álagningu eftir um það bil þrjá mánuði</div>
            </div>

            <div className="flex justify-center items-center py-12">
                <img src="/final.png" alt="Tax Declaration Page" />
            </div>
            <NextSubmit handleBack={onBack} handleNext={onNext} disabled={false} />
        </div>
    );
}