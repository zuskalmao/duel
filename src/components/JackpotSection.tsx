import React, { useRef, useEffect, useState } from 'react';
import { Clock, TrendingUp, Users, Zap } from 'lucide-react';
import gsap from 'gsap';

const JackpotSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 12, seconds: 45 });
  const [participants, setParticipants] = useState(187);
  const [jackpotAmount, setJackpotAmount] = useState(24500);
  
  // Simulated countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          // Reset timer when it hits zero
          return { minutes: 30, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Simulate growing jackpot and participants
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 100);
      setJackpotAmount(prev => prev + randomAmount);
      
      if (Math.random() > 0.7) {
        setParticipants(prev => prev + 1);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation
  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(".jackpot-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
      
      gsap.from(".jackpot-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: ".jackpot-content",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
      
      gsap.from(".stat-card", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        delay: 0.6,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }
  }, []);
  
  return (
    <section id="jackpot" ref={sectionRef} className="py-20 md:py-32 bg-background-dark relative">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-background-dark to-background-dark opacity-75 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 jackpot-title">
          <h2 className="section-title">
            Massive <span className="text-primary">Jackpot</span> Duels
          </h2>
          <p className="text-lg md:text-xl text-white/70 mt-4">
            Join our community-wide PvE jackpot duels that occur every 30 minutes. The more tokens you stake, the better your chances to win big!
          </p>
        </div>
        
        <div className="jackpot-content">
          <div className="jackpot-card max-w-4xl mx-auto bg-gradient-to-br from-background-light to-background-dark p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl shadow-primary/5 relative overflow-hidden">
            {/* Animated glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl animate-pulse-slow"></div>
            
            <div className="relative">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-3xl font-bold">Current Jackpot</h3>
                  <div className="text-5xl md:text-6xl font-bold mt-2 gradient-text animate-pulse-slow">
                    {jackpotAmount.toLocaleString()} $DUEL
                  </div>
                </div>
                
                <div className="bg-background-dark rounded-xl p-4 text-center border border-white/10">
                  <div className="text-sm text-white/70 mb-2">Next Jackpot Draw In</div>
                  <div className="text-4xl font-bold text-white">
                    {String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-10">
                <div className="text-lg">
                  <span className="text-white/70">Current Participants:</span> <span className="font-bold text-white">{participants}</span>
                </div>
                <div className="text-lg">
                  <span className="text-white/70">Min Entry:</span> <span className="font-bold text-white">100 $DUEL</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="number" 
                  placeholder="Enter amount to stake" 
                  className="flex-1 bg-background-dark border border-white/20 text-white p-3 rounded-lg focus:outline-none focus:border-primary"
                />
                <button className="btn-primary py-3 text-lg">
                  Enter Jackpot
                </button>
              </div>
              
              <div className="mt-6 text-sm text-white/50">
                * The more tokens you stake, the higher your chances of winning. All entries remain locked until the draw is complete.
              </div>
            </div>
          </div>
          
          <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <StatCard 
              icon={<Clock className="w-6 h-6 text-primary" />}
              title="Every 30 Minutes"
              description="Regular jackpot draws keep the excitement going all day"
            />
            <StatCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Growing Jackpots"
              description="Jackpot size increases as more participants join"
            />
            <StatCard 
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Community Event"
              description="Connect with fellow token holders in exciting duels"
            />
            <StatCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Instant Rewards"
              description="Winners receive payouts immediately after each draw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, description }) => {
  return (
    <div className="stat-card bg-background-light p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-background hover:border-white/20">
      <div className="flex items-start">
        <div className="mr-4 mt-1">{icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-white/60 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default JackpotSection;
