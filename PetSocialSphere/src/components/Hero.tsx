import React from 'react';
import CTAButton from './CTAButton';
import heroImg from '../assets/hero-img.jpeg';

const Hero = () => {
  return (
    <div className="bg-gray-700 overflow-hidden min-h-screen flex flex-col justify-end relative">
      <img 
        src={heroImg}
        alt="Hero Image" 
        className="absolute inset-0 w-full h-full object-cover filter grayscale object-center z-0"
      />
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-36 relative z-10">
        <h1 className="text-4xl font-extrabold text-gray-700 sm:text-5xl lg:text-6xl drop-shadow-lg">
          Connect with Pet Lovers Worldwide
        </h1>
        <p className="mt-4 text-lg text-gray-700 drop-shadow-lg">
          Share posts, discover new friends, and join a community centered around pets.
        </p>
        <CTAButton text="Get Started" link="#" />
      </div>
    </div>
  );
};

export default Hero;
