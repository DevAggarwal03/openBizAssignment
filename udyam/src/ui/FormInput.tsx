import React from "react";

export interface formInputInterface {
  id: string,
  name: string, 
  type: string,
  placeholder: string,
  value: string,
  setFn: (value: string) => void,
  disabled: boolean
}

// Reusable Input component
const FormInput = ({ id, name, type, placeholder, value, setFn, disabled = false }: formInputInterface) => { 
    const inputHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const temp = e.target.value;
        setFn(temp);
    }
    return <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {placeholder}
        </label>
        <div className="mt-1">
            <input
                id={id}
                name={name}
                type={type}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50"
                placeholder={placeholder}
                value={value}
                onChange={inputHandeler}
                disabled={disabled}
            />
        </div>
    </div>
};

export default FormInput