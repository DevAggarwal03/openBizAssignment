import React from "react";

const ProgressTracker = ({ currentStep , totalSteps }: {
  currentStep: number,
  totalSteps: number
}) => {
    const steps = [
        { number: 1, title: 'Aadhar' },
        { number: 2, title: 'OTP' },
        { number: 3, title: 'PAN Details' },
    ];

    return (
        <div className="w-full py-4 px-4">
            <div className="max-w-md mx-auto">
                <div className="flex items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                        currentStep >= step.number ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
                                    }`}
                                >
                                    {currentStep > step.number ? '✓' : step.number}
                                </div>
                                <p className={`mt-2 text-xs text-center ${currentStep >= step.number ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>{step.title}</p>
                            </div>
                            {index < totalSteps - 1 && (
                                <div
                                    className={`flex-auto mb-5 border-t-2 transition-colors duration-500 ease-in-out ${
                                        currentStep > index + 1 ? 'border-indigo-600' : 'border-gray-300'
                                    }`}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default ProgressTracker