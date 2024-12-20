import React from 'react';

interface CTAButtonProps {
    text: string;
    link: string;
  }
const CTAButton: React.FC<CTAButtonProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      className="inline-block mt-6 px-6 py-3 bg-teal-600 text-white font-semibold text-lg rounded-md hover:bg-teal-700 transition transform hover:scale-105"
    >
      {text}
    </a>
  );
};

export default CTAButton;
