import type { ReactNode } from "react";

interface formSelectInterface {
  id: string,
  name: string,
  value: string,
  setFn: (value: string) => void,
  disabled: boolean,
  children: ReactNode
}

// Reusable Select component
const FormSelect = ({ id, name, value, setFn, disabled, children }: formSelectInterface) => {
    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFn(e.target.value);
    };
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                Type of Organisation / संगठन के प्रकार
            </label>
            <div className="mt-1">
                <select
                    id={id}
                    name={name}
                    value={value}
                    onChange={selectHandler}
                    disabled={disabled}
                    className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-50"
                >
                    {children}
                </select>
            </div>
        </div>
    );
};

export default FormSelect