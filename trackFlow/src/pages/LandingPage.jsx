import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LandingPage = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex h-screen">
      {/* Left side - Hero Section with Diagonal Separator */}
      <div className="relative w-3/5 bg-gradient-to-br from-blue-600 to-emerald-400 flex flex-col items-center justify-center text-white z-20 clip-diagonal">
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
          onClick={props.onLogin}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full text-lg shadow-lg flex items-center"
        >
          Get Started
          <ArrowRight className="ml-2" />
        </motion.button>
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

export default LandingPage;
