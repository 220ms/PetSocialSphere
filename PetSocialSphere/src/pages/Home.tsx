import React from 'react';
import Header from '../components/Header'; // Assuming you've designed this component already
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import CTAButton from '../components/CTAButton';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const features = [
    { title: 'Share Posts' },
    { title: 'Join Communities' },
    { title: 'Discover New Friends' },
  ];

  const testimonials = [
    {
      name: 'Sarah J.',
      text: 'Pet Social Sphere helped me connect with so many pet lovers! It’s a great platform to share my pet’s adventures.',
      imgSrc: 'https://randomuser.me/api/portraits/women/81.jpg',
    },
    {
      name: 'Mike D.',
      text: 'A fantastic way to meet like-minded pet owners. I’ve made so many new friends and shared tons of tips.',
      imgSrc: 'https://randomuser.me/api/portraits/men/82.jpg',
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-teal-500">Why Pet Social Sphere?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} title={feature.title} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-700 py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-teal-500">What Our Users Say</h2>
          <div className="mt-8 flex flex-col md:flex-row gap-8 justify-center">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={testimonial.name} text={testimonial.text} imgSrc={testimonial.imgSrc} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-teal-600 py-16">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">Join the Ultimate Pet Lover Community</h2>
          <CTAButton text="Sign Up Now" link="#" />
        </div>
      </div>
    </div>
  );
};

export default Home;
