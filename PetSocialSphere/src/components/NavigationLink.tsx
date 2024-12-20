import { NavLink } from "react-router-dom";
import React from "react";

interface NavigationLinkProps {
  className?: string;
  children: string;
  to: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ className = "", children, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        `text-xl font-medium text-gray-600 hover:text-primary transition-colors ${
          isActive ? "underline" : ""
        } ${className}`
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;
