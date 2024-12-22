import Logo from "../assets/Logo Only.png";
import React from "react";
import NavigationLink from "./NavigationLink";

const Header = () => {
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
        <NavigationLink to="/login">Login</NavigationLink>
      </div>
    </header>
  );
};

export default Header;
