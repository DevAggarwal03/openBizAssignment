import { type ReactNode } from "react"

export interface formBtnInterface {
  onClick : () => void,
  children: ReactNode,
  disabled: boolean
}

// Reusable Button component
const FormButton = ({ onClick, children, disabled = false }: formBtnInterface) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
    >
        {disabled ? 'Processing...' : children}
    </button>
);

export default FormButton