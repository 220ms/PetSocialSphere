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
          {isSignUp && <Signup toggleForm={toggleForm} />}
          {!isSignUp && <Login toggleForm={toggleForm} />}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
