import React, { useState } from "react";
import pets from "../assets/pets.png";
import Header from "../components/Header";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-900 text-gray-100 h-screen flex flex-col">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="grid grid-cols-2 flex-grow">
          {/* Left Image Section */}
          <div className="relative">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={pets}
              alt="Pets"
            />
          </div>
          {/* Right Section */}
          <div className="flex items-center justify-center p-6 bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
              {/* Login or Sign Up Form */}
              <h2 className="text-2xl font-bold mb-6 text-center">
                {isSignUp ? "Sign Up" : "Login"}
              </h2>
              <form className="space-y-4">
                {/* Name Input (Only for Sign Up) */}
                {isSignUp && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
                    placeholder="Enter your email"
                  />
                </div>
                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-100 focus:outline-none focus:ring focus:ring-gray-500"
                    placeholder="Enter your password"
                  />
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  {isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>
              {/* Toggle Link */}
              <div className="mt-6 text-center text-gray-400">
                <p className="text-sm">
                  {isSignUp ? (
                    <>
                      Already have an account?{" "}
                      <a
                        href="#"
                        onClick={toggleForm}
                        className="text-blue-500 hover:underline"
                      >
                        Login here
                      </a>
                    </>
                  ) : (
                    <>
                      Don't have an account?{" "}
                      <a
                        href="#"
                        onClick={toggleForm}
                        className="text-blue-500 hover:underline"
                      >
                        Sign up here
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
