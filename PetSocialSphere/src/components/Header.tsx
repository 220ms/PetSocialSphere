import React, { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import Logo from "../assets/Logo Only.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/checkAuth",
          {
            method: "GET",
            credentials: "include", // This sends the JWT cookie with the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUser(data.data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []); // Runs once when the component mounts

  // Handle logout
  const handleLogout = async () => {
    try {
      // Send a POST request to logout
      const response = await fetch(
        "http://localhost:8000/api/v1/users/logout",
        {
          method: "POST",
          credentials: "include", // Include cookies in the request
        }
      );

      if (response.ok) {
        // Clear the authentication state
        setIsLoggedIn(false);
        setUser(null);

        // Redirect immediately after state update
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <header className="bg-white shadow-lg px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <img
          src={Logo}
          className="h-16 w-16 object-contain"
          alt="Pet Social Sphere Logo"
        />
      </div>

      <nav className="flex gap-x-8">
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/about">About</NavigationLink>
        <NavigationLink to="/contact">Contact</NavigationLink>
        <NavigationLink to="/feed">Feed</NavigationLink>
      </nav>

      <div className="flex gap-x-6">
        {isLoggedIn ? (
          <>
            <span>Welcome, {user?.fname}!</span>
            <button onClick={handleLogout} className="text-blue-600">
              Logout
            </button>
          </>
        ) : (
          <NavigationLink to="/login">Login</NavigationLink>
        )}
      </div>
    </header>
  );
};

export default Header;
