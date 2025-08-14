const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ValidationSuccessCard = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="w-full max-w-md place-self-center p-8 space-y-6 bg-white rounded-2xl shadow-lg text-center">
        <div className="flex justify-center">
          <CheckIcon />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Validated!
        </h1>
        <p className="text-slate-600 text-md">
          Your PAN and Aadhaar details have been successfully verified. You can now proceed.
        </p>
        <div className="pt-4">
          <button
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
    </div>
  );
};


export default ValidationSuccessCard