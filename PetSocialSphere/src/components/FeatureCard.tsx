import React from 'react';

interface CTAButtonProps {
  title: string;
}
const FeatureCard:React.FC<CTAButtonProps> = ({ title }) => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-2xl transform hover:scale-105 transition">
      <div className="mb-6">
        <svg
          className="h-16 w-16 text-teal-600 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  );
};

export default FeatureCard;
