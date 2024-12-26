import React, { useState } from "react";
import pets from "../assets/pets.png";
import Header from "../components/Header";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 flex-grow relative">
          {/* Left Image Section */}
          <div className="relative md:block">
            <img className="w-full h-full object-cover" src={pets} alt="Pets" />
          </div>
          {/* Right Section */}
          <div className="flex justify-center items-center p-4 bg-gray-900 bg-opacity-60">
            {isSignUp ? (
              <Signup toggleForm={toggleForm} />
            ) : (
              <Login toggleForm={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
