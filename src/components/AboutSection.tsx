import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sword, Shield, Flame, Trophy, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featureGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up animations with a delay to ensure DOM elements are properly rendered
    const setupAnimations = () => {
      if (sectionRef.current && textRef.current && featureGridRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 50 });
        gsap.set(".feature-card", { opacity: 0, y: 30 });
        
        ScrollTrigger.refresh();
        
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });

        gsap.to(".feature-card", {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: featureGridRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
    };

    // Allow time for DOM to render properly
    const timeoutId = setTimeout(setupAnimations, 100);
    
    return () => {
      clearTimeout(timeoutId);
      // Clean up any ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-background-dark">
      <div className="container mx-auto px-4">
        <div ref={textRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-primary">Ultimate</span> Memecoin Battle Platform
          </h2>
          <p className="text-lg md:text-xl text-white/70 mt-4">
            $DUEL is not just another memecoin. It's a battle platform where you can challenge others, win big, and showcase your skills in epic duels on the Solana blockchain.
          </p>
        </div>

        <div ref={featureGridRef} className="features-grid grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <FeatureCard 
            icon={<Sword className="w-8 h-8 text-primary" />}
            title="1v1 Battles"
            description="Challenge any holder to a duel and bet your $DUEL tokens. Winner takes all in these exciting head-to-head battles."
          />
          <FeatureCard 
            icon={<Trophy className="w-8 h-8 text-primary" />}
            title="Jackpot Duels"
            description="Join the regularly scheduled jackpot duels that happen every 30 minutes. The more you stake, the better your chances."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-primary" />}
            title="Secure Platform"
            description="Built on Solana for lightning-fast transactions and minimal fees. Every duel is secured by the blockchain."
          />
          <FeatureCard 
            icon={<Flame className="w-8 h-8 text-primary" />}
            title="Community Driven"
            description="Governance through token holdings. The community decides on new features and upgrades to the platform."
          />
        </div>

        <div className="mt-16 text-center">
          <button 
            className="btn-primary text-lg group"
            onClick={() => navigate('/gambling')}
          >
            Enter The Arena
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card card-hover bg-background p-8 rounded-2xl border border-white/10 transition-all duration-300">
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-background-light mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default AboutSection;
