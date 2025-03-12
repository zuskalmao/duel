import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sword, Gamepad2 } from 'lucide-react';
import gsap from 'gsap';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const battleRef = useRef<HTMLSpanElement>(null);
  const backgroundBubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && titleRef.current && subtitleRef.current) {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-buttons button", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: "power3.out"
      }, "-=0.3")
      .from(".hero-coin", {
        scale: 0.5,
        opacity: 0,
        rotation: "-45deg",
        duration: 1.2,
        ease: "elastic.out(1, 0.4)"
      }, "-=0.6");
      
      // Animate the "Battle" text glow effect
      if (battleRef.current) {
        gsap.to(battleRef.current, {
          filter: "drop-shadow(0 0 15px rgba(138, 43, 226, 0.8))",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut"
        });
      }
    }
  }, []);
  
  // Parallax effect ONLY for the hero coin
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-coin", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Independent background bubble animation
  useEffect(() => {
    if (backgroundBubblesRef.current) {
      // Create fixed background bubbles with predefined positions
      const bubbles = [];
      const bubbleCount = 10;
      
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'absolute rounded-full bg-primary/5';
        
        // Set fixed initial positions that won't change
        const size = Math.random() * 20 + 5;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5;
        
        bubble.style.width = `${size}rem`;
        bubble.style.height = `${size}rem`;
        bubble.style.top = `${top}%`;
        bubble.style.left = `${left}%`;
        bubble.style.opacity = opacity.toString();
        
        backgroundBubblesRef.current.appendChild(bubble);
        bubbles.push(bubble);
      }
      
      // Animate each bubble independently
      bubbles.forEach((bubble, index) => {
        // Create a unique animation for each bubble
        gsap.to(bubble, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-30, 30),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(8, 15),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });
      
      return () => {
        // Clean up bubbles on unmount
        bubbles.forEach(bubble => {
          if (backgroundBubblesRef.current?.contains(bubble)) {
            backgroundBubblesRef.current.removeChild(bubble);
          }
        });
      };
    }
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-background-light via-background to-background-dark"></div>
      
      {/* Animated background elements with ref for direct DOM manipulation */}
      <div 
        ref={backgroundBubblesRef}
        className="absolute inset-0 overflow-hidden"
      ></div>

      <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="gradient-text battle-text" ref={battleRef}>Battle</span> Your Way to <span className="text-primary">Victory</span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-6 text-xl md:text-2xl text-white/70 max-w-2xl mx-auto lg:mx-0"
          >
            The first Solana memecoin with real dueling utility. Stake your $DUEL tokens and challenge others in 1v1 battles or compete for massive jackpots.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 hero-buttons justify-center lg:justify-start">
            <button 
              className="btn-primary text-lg group"
              onClick={() => navigate('/gambling')}
            >
              Enter The Arena
              <Gamepad2 className="ml-2 w-5 h-5" />
            </button>
            <button 
              className="btn-outline text-lg"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 flex justify-center mb-10 lg:mb-0 mt-10 lg:mt-0">
          <div className="hero-coin relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary via-primary-light to-accent flex items-center justify-center border-4 border-white/10 animate-float shadow-lg shadow-primary/20">
            <Sword className="w-32 h-32 md:w-40 md:h-40 text-white" />
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse-slow"></div>
            <div className="absolute -inset-4 rounded-full border border-white/10 animate-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
