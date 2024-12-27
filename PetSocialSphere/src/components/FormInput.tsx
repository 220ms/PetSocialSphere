import React from "react";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

interface FormInputProps {
  name: string;
  labelName: string;
  placeholder: string;
  type?: string;
  toggleVisibility?: () => void;
  isVisible?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  labelName,
  placeholder = "",
  type = "text",
  toggleVisibility,
  isVisible,
}) => {
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {labelName}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          className="w-full sm:w-[400px] mt-1 p-3 pr-10 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
          placeholder={placeholder}
        />
        {toggleVisibility && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-200"
            style={{ height: "100%" }}
          >
            <Icon icon={isVisible ? eyeOff : eye} size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
