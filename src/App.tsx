import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import DuelsSection from './components/DuelsSection';
import JackpotSection from './components/JackpotSection';
import Footer from './components/Footer';

function App() {
  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.cursor-dot') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-background text-white overflow-hidden">
      {/* Custom cursor */}
      <div className="cursor-dot fixed w-6 h-6 rounded-full bg-primary/30 backdrop-blur-sm z-50 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 mix-blend-screen hidden md:block"></div>
      
      <Header />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <DuelsSection />
        <JackpotSection />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
