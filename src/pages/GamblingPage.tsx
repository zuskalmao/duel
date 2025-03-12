import React from 'react';
import { motion } from 'framer-motion';
import JackpotSection from '../components/JackpotSection';
import DuelsSection from '../components/DuelsSection';

const GamblingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-20">
        {/* Page title */}
        <div className="bg-background-dark py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-primary">$DUEL</span> Arena
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Stake your tokens, challenge opponents, and win big in our jackpot events
              and one-on-one duels.
            </p>
          </div>
        </div>
        
        <JackpotSection />
        <DuelsSection />
      </div>
    </motion.div>
  );
};

export default GamblingPage;
