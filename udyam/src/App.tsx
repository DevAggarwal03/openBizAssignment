import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AadharCardForm from './components/AadharCardForm';
import OtpCard from './components/OtpCard';
import PanCard from './components/PanCard';
import Navbar from './components/NavBar';
import ProgressTracker from './components/ProgressTracker';

export interface panDetailsInterface {
  orgType: string,
  panNumber: string,
  panHolderName: string,
  panDob: string,
  consent: boolean
}

function App() {
    const TOTAL_STEPS = 3;

    const [step, setStep] = useState(1); 
    const [aadNo, setAadNo] = useState('');
    const [name, setName] = useState('');

    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [panDetails, setPanDetails] = useState<panDetailsInterface>({
        orgType: '',
        panNumber: '',
        panHolderName: '',
        panDob: '',
        consent: false,
    });

    const AadharApi = async (aadhar: string, fullName: string) => {
      try {
        const response = await axios.post('http://localhost:8080/scrpe', {
          "aadharNo": parseInt(aadhar),
          "name": fullName 
        })
        return response.data; 
      } catch (error) {
        setError((error as Error).message || 'An unknown error occurred.');
        toast.error('something went wrong')
        return {
          success: false,
          message: error
        }
      }
      
    };

    const OtpApi = async (otpValue: string) => {
      const response = await axios.post('http://localhost:8080/aadharOtp', {
        "otp": parseInt(otpValue),
        "name": name
      });
      return response.data;
    };

    const PanApi = async (panDetails: panDetailsInterface) => {
      try {
        console.log(panDetails.orgType)
        console.log(panDetails.panNumber)
        console.log(panDetails.panHolderName)
        console.log(panDetails.panDob)
        console.log(name)
        const response = await axios.post('http://localhost:8080/scrpepan', {
          orgType: panDetails.orgType,
          pan: panDetails.panNumber,
          name: panDetails.panHolderName,
          dob: panDetails.panDob,
          userName: name,
          aadharNo: aadNo
        }) 

        return response.data;
      } catch (error) {
        toast.error('Server Error')
        setError((error as Error).message || 'An unknown error occurred.');
        return {
          success: false,
          message: error
        }
      }
    }

    const handleAadharSubmit = async () => {
        setError('');
        setLoading(true);
        
        const response = await AadharApi(aadNo, name);

        if (response.success) {
          setStep(2); 
        }else{
          toast.error('Invalid Details')
        }
        setLoading(false);
    };

    const handleOtpSubmit = async () => {
      setError('');
      setLoading(true);
      try {
        const responseData = await OtpApi(otp); // e.g. { success: true }

        if (responseData.success || JSON.stringify(responseData).includes('true')) {
          console.log('success');
          toast.success('Aadhar Validated');
          setStep(3);
        } else {
          console.log('fail');
          toast.error(responseData.message || 'Invalid Otp');
        }
      } catch (error) {
        toast.error('Server Error');
        setError((error as Error).message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
  };

    const handlePanSubmit = async () => {
      setError('');
      setLoading(true);
      const response = await PanApi(panDetails);

      if(response.success){
        toast.success('pan validated');
      }else{
        toast.error('invalid credentials')
      }
      setLoading(false)
    }
    

    const renderStep = () => {
      switch (step) {
            case 1:
                return <AadharCardForm name={name} aadNo={aadNo} setName={setName} setAadNo={setAadNo} onSubmit={handleAadharSubmit} loading={loading} error={error}/>;
            case 2:
                return <OtpCard otp={otp} setOtp={setOtp} onSubmit={handleOtpSubmit} loading={loading} error={error}/>;
            case 3:
                return <PanCard panDetails={panDetails} setPanDetails={setPanDetails} onSubmit={handlePanSubmit} loading={loading} error={error}/>;
            default:
                return <AadharCardForm name={name} aadNo={aadNo} setName={setName} setAadNo={setAadNo} onSubmit={handleAadharSubmit} loading={loading} error={error}/>;
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Navbar />
            <div className="bg-white shadow-sm">
                 <ProgressTracker currentStep={step} totalSteps={TOTAL_STEPS} />
            </div>
            <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{minHeight: 'calc(100vh - 64px)'}}>
                <div className="max-w-md w-full space-y-8">
                  {renderStep()}
                </div>
            </main>
        </div>
    );
}

export default App;