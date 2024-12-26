import FormInput from "./FormInput";
import React from "react";
interface LoginProps {
  toggleForm: () => void;
}
const Login: React.FC<LoginProps> = ({ toggleForm }) => {
  return (
    <div className="flex items-center justify-center p-6 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Login or Sign Up Form */}
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <form className="space-y-4">
          <FormInput
            labelName="First Name"
            placeholder="Enter your first name."
          />
          <FormInput labelName="Surname" placeholder="Enter your last name." />
          <FormInput labelName="Email" placeholder="Please enter your email" />
          <FormInput
            labelName="Password"
            placeholder="Please enter your password"
          />
          <FormInput
            labelName="Confirm Password"
            placeholder="Please confirm your password."
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
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
export default Login;
