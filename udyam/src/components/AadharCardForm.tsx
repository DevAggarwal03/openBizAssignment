import FormButton from "../ui/FormButton";
import FormInput from "../ui/FormInput";

interface aadharCardProps {
  name: string,
  aadNo: string,
  setName: (value: string) => void,
  setAadNo: (value: string) => void,
  onSubmit: () => void,
  loading: boolean,
  error: string
}

const AadharCardForm = ({ name, aadNo, setName, setAadNo, onSubmit, loading, error }: aadharCardProps) => (
    <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
        <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Aadhar Verification</h2>
            <p className="mt-2 text-sm text-gray-600">Please enter your details to proceed.</p>
        </div>
        <div className="space-y-6">
            <FormInput
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                value={name}
                setFn={setName}
                disabled={loading}
            />
            <FormInput
                id="aadhar"
                name="aadhar"
                type="text" // Use text to allow for formatting and prevent number parsing issues
                placeholder="12-Digit Aadhar Number"
                value={aadNo}
                setFn={setAadNo}
                disabled={loading}
            />
            {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <FormButton onClick={onSubmit} disabled={loading}>
                Send OTP
            </FormButton>
        </div>
    </div>
);

export default AadharCardForm