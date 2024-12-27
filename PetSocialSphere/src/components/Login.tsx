import FormInput from "./FormInput";
import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginFormData, login } from "../http/auth";
interface SignupProps {
  toggleForm: () => void;
}

const Login: React.FC<SignupProps> = ({ toggleForm }) => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/feed");
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    mutate(data);
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="flex items-center justify-center p-6 bg-gray-900">
      {/* Adjusted width and responsive padding/margin */}
      <div className="w-full max-w-lg sm:max-w-md bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name Input (Only for Sign Up) */}
          <FormInput
            labelName="Email"
            name="email"
            placeholder="Please enter your email"
          />
          <FormInput
            labelName="Password"
            name="password"
            placeholder="Please enter your password"
            type={passwordVisible ? "text" : "password"}
            toggleVisibility={() => setPasswordVisible(!passwordVisible)}
            isVisible={passwordVisible}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={isPending}
          >
            {isPending ? "Logging In..." : "Login"}
          </button>
        </form>
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
            <>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                className="text-blue-500 hover:underline"
              >
                Sign up here
              </a>
            </>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
