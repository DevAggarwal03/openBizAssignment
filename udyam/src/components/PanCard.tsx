import type { panDetailsInterface } from "../App";
import FormButton from "../ui/FormButton";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";


interface panCardProps {
  panDetails: panDetailsInterface,
  setPanDetails: (value: any) => any,
  onSubmit: () => void,
  loading: boolean,
  error: string
}

// PAN Card Component
const PanCard = ({ panDetails, setPanDetails, onSubmit, loading, error }: panCardProps) => {
    const handleInputChange = (field: string, value: string | boolean) => {
        setPanDetails((prev: any) => ({ ...prev, [field]: value }));
    };

    const orgTypes = [
        { value: "1", label: "Proprietary / एकल स्वामित्व" },
        { value: "2", label: "Hindu Undivided Family / हिंदू अविभाजित परिवार (एचयूएफ)" },
        { value: "3", label: "Partnership / पार्टनरशिप" },
        { value: "4", label: "Co-Operative / सहकारी" },
        { value: "5", label: "Private Limited Company / प्राइवेट लिमिटेड कंपनी" },
        { value: "6", label: "Public Limited Company / पब्लिक लिमिटेड कंपनी" },
        { value: "7", label: "Self Help Group / स्वयं सहायता समूह" },
        { value: "9", label: "Limited Liability Partnership / सीमित दायित्व भागीदारी" },
        { value: "10", label: "Society / सोसाइटी" },
        { value: "11", label: "Trust / ट्रस्ट" },
        { value: "8", label: "Others / अन्य" },
    ];

    return (
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
            <div className="mb-6">
                <div className="bg-green-600 text-white font-bold py-2 px-4 rounded-t-lg -mx-6 -mt-8 sm:-mx-10 mb-6">
                    PAN Verification
                </div>
                <h2 className="text-2xl font-bold text-gray-900 text-center">PAN Details</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">Please provide your PAN information.</p>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect id="orgType" name="orgType" value={panDetails.orgType} setFn={(val) => handleInputChange('orgType', val)} disabled={loading}>
                        <option value="">Type of Organisation / संगठन के प्रकार</option>
                        {orgTypes.map(org => (
                            <option key={org.value} value={org.value}>{org.label}</option>
                        ))}
                    </FormSelect>
                    <FormInput id="pan" name="pan" type="text" placeholder="ENTER PAN NUMBER" value={panDetails.panNumber} setFn={(val) => handleInputChange('panNumber', val.toUpperCase())} disabled={loading}/>
                    <FormInput id="panHolderName" name="panHolderName" type="text" placeholder="Name as per PAN" value={panDetails.panHolderName} setFn={(val) => handleInputChange('panHolderName', val)} disabled={loading}/>
                    <FormInput id="panDob" name="panDob" type="text" placeholder="DD/MM/YYYY" value={panDetails.panDob} setFn={(val) => handleInputChange('panDob', val)} disabled={loading}/>
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            checked={panDetails.consent}
                            onChange={(e) => handleInputChange('consent', e.target.checked)}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            disabled={loading}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="consent" className="font-medium text-gray-700">I hereby give my consent...</label>
                        <p className="text-gray-500 text-xs">...to Ministry of MSME, for using my data for MSME classification and other official purposes.</p>
                    </div>
                </div>

                {error && <p className="text-xs text-red-600 text-center">{error}</p>}
                <FormButton onClick={onSubmit} disabled={loading || !panDetails.consent}> PAN Validate </FormButton>
            </div>
        </div>
    );
};

export default PanCard 