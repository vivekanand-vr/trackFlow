import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, ChartBar, CheckCircle } from 'lucide-react';

const starsArray = Array.from({ length: 10 }); // 10 stars or any number you want

const LandingPage = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex h-screen">
      {/* Left side - Hero Section */}
      <div className="relative w-3/5 bg-gradient-to-br from-maroon-800 to-maroon-600 flex flex-col items-center justify-center text-white z-20 clip-diagonal overflow-hidden">
        
        {/* Moving Stars */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {starsArray.map((_, index) => (
            <motion.div
              key={index}
              className="absolute bg-white rounded-full opacity-70"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ['0%', '100%'],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold mb-4 text-center"
        >
          Track Flow
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl mb-6 text-center"
        >
          Streamline your job search journey
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl mb-8 max-w-2xl text-center"
        >
          Track Flow helps you manage your job applications effortlessly. Add, update, and delete application statuses with ease, all in one place.
        </motion.div>
        
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          className="bg-white text-maroon-800 font-semibold py-3 px-6 rounded-full text-lg shadow-lg flex items-center"
        >
          Get Started <ArrowRight className="ml-2" />
        </motion.button>

        <div className="mt-12 flex justify-center space-x-8">
          <FeatureIcon icon={Briefcase} text="Organize Applications" delay={1} />
          <FeatureIcon icon={ChartBar} text="Track Progress" delay={1.2} />
          <FeatureIcon icon={CheckCircle} text="Achieve Goals" delay={1.4} />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="w-2/5 flex items-center justify-center relative z-10">
        <img
          src="laptop-img.jpg"
          alt="Job search illustration"
          className="object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

const FeatureIcon = ({ icon: Icon, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="flex flex-col items-center"
  >
    <Icon size={32} className="mb-2" />
    <span className="text-sm">{text}</span>
  </motion.div>
);

export default LandingPage;
