import React, { useState } from "react";
import FormInput from "./FormInput";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// type interface
import { SignupFormData } from "../http/auth.ts";
// signup function
import { signup } from "../http/auth.ts";

interface LoginProps {
  toggleForm: () => void;
}

const Signup: React.FC<LoginProps> = ({ toggleForm }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/feed");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignupFormData = {
      fname: formData.get("fname") as string,
      sname: formData.get("sname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("passwordConfirm") as string,
    };

    console.log(data);
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center p-6 bg-gray-900">
      {/* Adjusted width and responsive padding/margin */}
      <div className="w-full max-w-lg sm:max-w-md bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormInput
            name="fname"
            labelName="First Name"
            placeholder="Enter your first name."
          />
          <FormInput
            name="sname"
            labelName="Surname"
            placeholder="Enter your last name."
          />
          <FormInput
            name="email"
            labelName="Email"
            placeholder="Please enter your email"
          />
          <FormInput
            name="password"
            labelName="Password"
            placeholder="Please enter your password"
            type={passwordVisible ? "text" : "password"}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
            isVisible={passwordVisible}
          />
          <FormInput
            name="passwordConfirm"
            labelName="Confirm Password"
            placeholder="Please confirm your password."
            type={confirmPasswordVisible ? "text" : "password"}
            toggleVisibility={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
            isVisible={confirmPasswordVisible}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Signup"}
          </button>
        </form>
        {isError && (
          <div className="mt-4 p-2 text-center text-red-500">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred."}
          </div>
        )}
        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="#"
              onClick={toggleForm}
              className="text-blue-500 hover:underline"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
