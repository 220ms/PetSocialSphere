import FormInput from "./FormInput";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../http/auth.ts";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  toggleForm: () => void;
}

interface SignupFormData {
  fname: string;
  sname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup: React.FC<LoginProps> = ({ toggleForm }) => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/feed");
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: SignupFormData = {
      fname: formData.get("firstName") as string,
      sname: formData.get("surname") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      passwordConfirm: formData.get("confirmPassword") as string,
    };

    console.log(data);

    mutate(data);
  }

  return (
    <div className="flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Login or Sign Up Form */}
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput
            name="firstName"
            labelName="First Name"
            placeholder="Enter your first name."
          />
          <FormInput
            name="surname"
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
          />
          <FormInput
            name="confirmPassword"
            labelName="Confirm Password"
            placeholder="Please confirm your password."
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isPending ? "Submitting..." : "Signup"}
          </button>
        </form>
        {/* Error Message */}
        {isError && (
          <div className="mt-4 p-2 text-center text-red-500">
            {error instanceof Error
              ? error.message
              : "An unknown error occurred."}
          </div>
        )}
        {/* Toggle Link */}
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
