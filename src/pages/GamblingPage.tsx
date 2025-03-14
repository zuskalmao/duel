import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import JackpotSection from '../components/JackpotSection';
import DuelsSection from '../components/DuelsSection';
import { Swords, Zap } from 'lucide-react';
import gsap from 'gsap';

const GamblingPage: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create dynamic sword animations in the background
    if (backgroundRef.current) {
      // Create random swords in the background
      const swordElements = Array.from({ length: 20 }).map((_, index) => {
        const swordEl = document.createElement('div');
        swordEl.classList.add('arena-sword');
        swordEl.style.setProperty('--index', index.toString());
        swordEl.style.setProperty('--rotation', `${Math.random() * 360}deg`);
        swordEl.style.setProperty('--size', `${Math.random() * 60 + 40}px`);
        swordEl.style.setProperty('--x', `${Math.random() * 100}vw`);
        swordEl.style.setProperty('--y', `${Math.random() * 100}vh`);
        swordEl.style.setProperty('--delay', `${Math.random() * 10}s`);
        swordEl.style.setProperty('--duration', `${Math.random() * 10 + 15}s`);
        
        const swordIcon = document.createElement('div');
        swordIcon.classList.add('sword-icon');
        swordEl.appendChild(swordIcon);
        
        return swordEl;
      });
      
      swordElements.forEach(el => backgroundRef.current?.appendChild(el));
    }
    
    // Lightning animation effect
    if (lightningRef.current) {
      const createLightning = () => {
        // Random interval to add randomness to the effect
        const interval = Math.random() * 5000 + 2000;
        
        const flash = () => {
          if (!lightningRef.current) return;
          
          // Create flash effect
          gsap.to(lightningRef.current, {
            opacity: 0.2,
            duration: 0.05,
            onComplete: () => {
              // Second flash
              gsap.to(lightningRef.current, {
                opacity: 0,
                duration: 0.05,
                delay: 0.1,
                onComplete: () => {
                  // Third flash
                  gsap.to(lightningRef.current, {
                    opacity: 0.3,
                    duration: 0.05,
                    delay: 0.2,
                    onComplete: () => {
                      gsap.to(lightningRef.current, {
                        opacity: 0,
                        duration: 0.3,
                      });
                    }
                  });
                }
              });
            }
          });
        };
        
        flash();
        
        // Schedule next lightning
        setTimeout(createLightning, interval);
      };
      
      // Start the lightning effect with initial delay
      setTimeout(createLightning, 2000);
    }
    
    return () => {
      // Clean up animations if needed
      if (backgroundRef.current) {
        const swords = backgroundRef.current.querySelectorAll('.arena-sword');
        swords.forEach(sword => sword.remove());
      }
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Dynamic Background */}
      <div ref={backgroundRef} className="arena-background absolute inset-0 overflow-hidden">
        {/* Background layers will be added by JavaScript */}
        {/* Base layer with animated gradients */}
        <div className="absolute inset-0 bg-background-dark">
          {/* Animated gradient orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        
        {/* Lightning effect layer */}
        <div 
          ref={lightningRef} 
          className="lightning-effect absolute inset-0 bg-primary/20 mix-blend-color-dodge pointer-events-none opacity-0"
        >
          <Zap className="absolute text-white h-40 w-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="pt-20 relative z-10">
        {/* Page title */}
        <div className="bg-background-dark py-16 md:py-24 relative overflow-hidden">
          {/* Decorative swords around title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Swords className="w-60 h-60 text-primary/5 animate-slow-spin absolute transform -translate-y-1/2 -translate-x-1/2 blur-sm" />
            <Swords className="w-40 h-40 text-accent/5 animate-slow-spin-reverse absolute transform translate-y-1/3 translate-x-1/3 blur-sm" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-4 inline-block relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-50 blur-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-gradient-text">$DUEL</span>{" "}
                <span className="animate-pulse-text">Arena</span>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Stake your tokens, challenge opponents, and win big in our jackpot events
              and one-on-one duels.
            </p>
          </div>
        </div>
        
        <JackpotSection />
        <DuelsSection />
      </div>
      
      {/* Add this style to create the animations */}
      <style jsx>{`
        @keyframes float-sword {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-20px) rotate(calc(var(--rotation) + 10deg));
          }
        }
        
        @keyframes orb-animation-1 {
          0%, 100% {
            transform: translate(-30%, -30%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-35%, -40%) scale(1.2);
            opacity: 0.5;
          }
        }
        
        @keyframes orb-animation-2 {
          0%, 100% {
            transform: translate(30%, 20%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(35%, 25%) scale(1.2);
            opacity: 0.4;
          }
        }
        
        @keyframes orb-animation-3 {
          0%, 100% {
            transform: translate(10%, -40%) scale(0.8);
            opacity: 0.2;
          }
          50% {
            transform: translate(15%, -35%) scale(1);
            opacity: 0.3;
          }
        }
        
        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes slow-spin-reverse {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes pulse-text {
          0%, 100% {
            text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(138, 43, 226, 0.8);
          }
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        
        .animate-pulse-text {
          animation: pulse-text 3s ease infinite;
        }
        
        .animate-slow-spin {
          animation: slow-spin 40s linear infinite;
        }
        
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 30s linear infinite;
        }
        
        .arena-sword {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--size);
          height: var(--size);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float-sword var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          opacity: 0.1;
          pointer-events: none;
        }
        
        .sword-icon {
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14.5 17.5L3 6V3h3l11.5 11.5'/%3E%3Cpath d='M13 19l6-6'/%3E%3Cpath d='M16 16l4 4'/%3E%3Cpath d='M19 21l2-2'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
          transform: rotate(var(--rotation));
        }
        
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        
        .orb-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(138, 43, 226, 0.1) 70%, transparent 100%);
          top: 40%;
          left: 30%;
          animation: orb-animation-1 15s ease-in-out infinite;
        }
        
        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, rgba(255, 105, 180, 0.1) 70%, transparent 100%);
          top: 60%;
          right: 30%;
          animation: orb-animation-2 20s ease-in-out infinite;
        }
        
        .orb-3 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 223, 0, 0.2) 0%, rgba(255, 223, 0, 0.05) 70%, transparent 100%);
          bottom: 20%;
          left: 50%;
          animation: orb-animation-3 25s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default GamblingPage;
