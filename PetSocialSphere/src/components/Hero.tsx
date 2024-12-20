import React from 'react';
import CTAButton from './CTAButton';
import heroImg from '../assets/hero-img.jpeg';

const Hero = () => {
  return (
    <div className="bg-gray-700 overflow-hidden min-h-screen flex flex-col justify-end relative">
  {/* Black overlay */}
  <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

  {/* Hero image */}
  <img 
    src={heroImg}
    alt="Hero Image" 
    className="absolute inset-0 w-full h-full object-cover object-center z-0"
  />

  {/* Text content */}
  <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-36 relative z-20">
    <h1 className="text-4xl font-extrabold text-gray-100 sm:text-5xl lg:text-6xl drop-shadow-lg">
      Connect with Pet Lovers Worldwide
    </h1>
    <p className="mt-4 text-lg text-gray-200 drop-shadow-lg">
      Share posts, discover new friends, and join a community centered around pets.
    </p>
    <CTAButton text="Get Started" link="#" />
  </div>
</div>


  );
};

export default Hero;
