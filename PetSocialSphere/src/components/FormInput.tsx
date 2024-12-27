import React from "react";
interface FormInputProps {
  name: string;
  labelName: string;
  placeholder: string;
}
const FormInput: React.FC<FormInputProps> = ({
  name,
  labelName,
  placeholder = "",
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {labelName}
      </label>
      <input
        type="text"
        name={name}
        id="name"
        className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
