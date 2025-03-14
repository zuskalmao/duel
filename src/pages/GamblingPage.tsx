import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import JackpotSection from '../components/JackpotSection';
import DuelsSection from '../components/DuelsSection';
import { Swords, Zap, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const GamblingPage: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    
    // Title animation effect
    if (titleRef.current) {
      // Set up glowing border animation
      gsap.to(".title-border", {
        boxShadow: "0 0 20px rgba(138, 43, 226, 0.8), 0 0 40px rgba(255, 105, 180, 0.3)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Shine effect animation
      const createShineEffect = () => {
        const shine = document.createElement('div');
        shine.classList.add('title-shine');
        titleRef.current?.appendChild(shine);
        
        gsap.to(shine, {
          left: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            shine.remove();
            // Random delay before next shine
            setTimeout(createShineEffect, Math.random() * 3000 + 2000);
          }
        });
      };
      
      // Start shine effect with initial delay
      setTimeout(createShineEffect, 1000);
    }
    
    return () => {
      // Clean up animations if needed
      if (backgroundRef.current) {
        const swords = backgroundRef.current.querySelectorAll('.arena-sword');
        swords.forEach(sword => sword.remove());
      }
      
      // Kill all GSAP animations to prevent memory leaks
      gsap.killTweensOf(".title-border");
      gsap.killTweensOf(".title-shine");
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
      {/* Fixed z-index layering - ensure background is behind everything */}
      <div ref={backgroundRef} className="arena-background fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {/* Background layers will be added by JavaScript */}
        {/* Base layer with animated gradients - reduced opacity of pink orb */}
        <div className="fixed inset-0 bg-background-dark z-0">
          {/* Animated gradient orbs */}
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        
        {/* Lightning effect layer */}
        <div 
          ref={lightningRef} 
          className="lightning-effect fixed inset-0 bg-primary/20 mix-blend-color-dodge pointer-events-none opacity-0 z-0"
        >
          <Zap className="absolute text-white h-40 w-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      
      <div className="pt-20 relative z-10">
        {/* Page title */}
        <div className="bg-background-dark/80 backdrop-blur-md py-16 md:py-24 relative overflow-hidden">
          {/* Decorative swords around title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Swords className="w-60 h-60 text-primary/5 animate-slow-spin absolute transform -translate-y-1/2 -translate-x-1/2 blur-sm" />
            <Swords className="w-40 h-40 text-accent/5 animate-slow-spin-reverse absolute transform translate-y-1/3 translate-x-1/3 blur-sm" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-4 inline-block relative">
              {/* Enhanced title animation container */}
              <div className="title-container relative inline-block">
                {/* Glowing particles */}
                <div className="absolute inset-0 particles-container">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
                
                {/* Glowing borders */}
                <div className="title-border absolute -inset-3 rounded-3xl opacity-75"></div>
                
                {/* Main title with enhanced 3D effects */}
                <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 relative z-20 metal-text p-6">
                  <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-primary to-accent relative z-10 title-gradient-text">$DUEL</span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-white/10 blur-[2px] transform translate-y-[2px] translate-x-[2px] z-0">$DUEL</span>
                  </span>{" "}
                  <span className="relative inline-block animate-pulse-text">
                    <Sparkles className="absolute -left-6 -top-2 w-5 h-5 text-yellow-400 animate-twinkle" />
                    <span>Arena</span>
                    <Sparkles className="absolute -right-6 -top-2 w-5 h-5 text-yellow-400 animate-twinkle-delay" />
                  </span>
                </h1>
              </div>
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
            opacity: 0.2; /* Reduced opacity to fix flashing */
          }
          50% {
            transform: translate(35%, 25%) scale(1.2);
            opacity: 0.3; /* Reduced opacity to fix flashing */
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
            text-shadow: 0 0 30px rgba(138, 43, 226, 0.8), 0 0 50px rgba(138, 43, 226, 0.4);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes twinkle-delay {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-twinkle-delay {
          animation: twinkle-delay 2s ease-in-out infinite 1s;
        }
        
        .title-gradient-text {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
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
          pointer-events: none;
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
          background: radial-gradient(circle, rgba(255, 105, 180, 0.2) 0%, rgba(255, 105, 180, 0.05) 70%, transparent 100%);
          top: 60%;
          right: 30%;
          animation: orb-animation-2 20s ease-in-out infinite;
          z-index: 0; /* Ensure it stays behind other elements */
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
        
        /* Enhanced title effects */
        .metal-text {
          text-shadow: 
            0 1px 0 rgba(255,255,255,0.4),
            0 2px 0 rgba(255,255,255,0.3),
            0 3px 0 rgba(255,255,255,0.2),
            0 4px 0 rgba(255,255,255,0.1),
            0 5px 8px rgba(0,0,0,0.8);
        }
        
        .title-border {
          border: 2px solid transparent;
          border-image: linear-gradient(45deg, #8a2be2, #ff69b4, #8a2be2) 1;
          border-radius: 16px;
        }
        
        .title-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
          z-index: 15;
        }
        
        .particles-container {
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, #8a2be2, transparent);
          border-radius: 50%;
          opacity: 0.6;
          pointer-events: none;
          animation: float-particle 3s ease-in-out infinite;
        }
        
        .particle:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 20%; left: 80%; animation-delay: 0.5s; }
        .particle:nth-child(3) { top: 80%; left: 20%; animation-delay: 1s; }
        .particle:nth-child(4) { top: 70%; left: 70%; animation-delay: 1.5s; }
        .particle:nth-child(5) { top: 30%; left: 30%; animation-delay: 2s; }
        .particle:nth-child(6) { top: 60%; left: 10%; animation-delay: 2.5s; }
        .particle:nth-child(7) { top: 40%; left: 60%; animation-delay: 3s; }
        .particle:nth-child(8) { top: 90%; left: 40%; animation-delay: 3.5s; }
        .particle:nth-child(9) { top: 5%; left: 95%; animation-delay: 4s; }
        .particle:nth-child(10) { top: 50%; left: 50%; animation-delay: 4.5s; }
      `}</style>
    </motion.div>
  );
};

export default GamblingPage;
