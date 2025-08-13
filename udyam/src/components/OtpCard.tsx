import FormButton from "../ui/FormButton";
import FormInput from "../ui/FormInput";

export interface otpCardProps {
  otp: string,
  setOtp: (value: string) => void,
  onSubmit: () => void,
  loading: boolean,
  error: string 
}
// OTP Input Card Component
const OtpCard = ({ otp, setOtp, onSubmit, loading, error }: otpCardProps) => (
     <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
        <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Enter OTP</h2>
            <p className="mt-2 text-sm text-gray-600">An OTP has been sent to your registered mobile number.</p>
        </div>
        <div className="space-y-6">
            <FormInput
                id="otp"
                name="otp"
                type="text"
                placeholder="6-Digit OTP"
                value={otp}
                setFn={setOtp}
                disabled={loading}
            />
             {error && <p className="text-xs text-red-600 text-center">{error}</p>}
            <FormButton onClick={onSubmit} disabled={loading}>
                Verify OTP
            </FormButton>
        </div>
    </div>
);


export default OtpCard
