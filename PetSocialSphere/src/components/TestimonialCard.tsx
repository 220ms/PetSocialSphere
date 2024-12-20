import React from 'react';
interface TestimonialCardProps {
    name: string;
    text: string;
    imgSrc: string;
  }
const TestimonialCard:React.FC<TestimonialCardProps> = ({ name, text, imgSrc }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
      <div className="mb-4 flex justify-center">
        <img src={imgSrc} alt={`${name}'s avatar`} className="h-16 w-16 rounded-full" />
      </div>
      <p className="text-gray-300 italic">{text}</p>
      <p className="mt-4 text-teal-500 font-semibold">{name}</p>
    </div>
  );
};

export default TestimonialCard;
