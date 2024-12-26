import React from "react";
interface FormInputProps {
    labelName: string;
    placeholder: string;
  }
const FormInput:React.FC<FormInputProps> = ({labelName, placeholder=""}) => {
return (
    <div>
        <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-300"
        >
        {labelName}
        </label>
        <input
        type="text"
        id="name"
        className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
        placeholder={placeholder}
        />
    </div>);
}

export default FormInput;