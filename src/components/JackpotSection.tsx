import React, { useRef, useEffect, useState } from 'react';
import { Clock, TrendingUp, Users, Zap, Calendar } from 'lucide-react';
import gsap from 'gsap';

const JackpotSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [participants, setParticipants] = useState(453);
  const [jackpotAmount, setJackpotAmount] = useState(92500);
  
  // Calculate time until 8PM EST
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      
      // Convert current time to EST (UTC-5)
      const estTime = new Date(now.getTime() - (now.getTimezoneOffset() + 300) * 60000);
      const targetHour = 20; // 8PM in 24-hour format
      
      // Create target time at 8PM EST
      let targetTime = new Date(estTime);
      targetTime.setHours(targetHour, 0, 0, 0);
      
      // If it's already past 8PM EST, set target to 8PM tomorrow
      if (estTime.getHours() >= targetHour) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      
      // Convert back to local time for countdown
      const targetInLocalTime = new Date(targetTime.getTime() + (now.getTimezoneOffset() + 300) * 60000);
      
      // Calculate difference
      const diff = targetInLocalTime.getTime() - now.getTime();
      
      // Convert to hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({
        hours,
        minutes,
        seconds
      });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate growing jackpot and participants
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 240);
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
      {/* Enhanced background with sword patterns */}
      <div className="absolute inset-0 bg-gradient-radial from-background-dark to-background-dark opacity-75 z-0"></div>
      <div className="absolute inset-0 bg-pattern z-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 jackpot-title">
          <div className="inline-block relative mb-4">
            <h2 className="daily-jackpot-text section-title uppercase relative z-10">
              <span className="relative inline-block">
                D<span className="text-primary">aily</span>
              </span>{" "}
              <span className="relative inline-block">
                J<span className="text-accent">ackpot</span>
              </span>
            </h2>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse-slow z-0"></div>
          </div>
          <p className="text-lg md:text-xl text-white/70 mt-4">
            Join our massive daily jackpot event at 8PM EST! Stake your tokens to win the largest pot in the $DUEL ecosystem.
          </p>
        </div>        <div className="jackpot-content">
          <div className="jackpot-card max-w-4xl mx-auto bg-gradient-to-br from-background-light to-background-dark p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl shadow-primary/5 relative overflow-hidden">
            {/* Animated glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl animate-pulse-slow"></div>
            
            {/* Floating stars/particles in the background */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="jackpot-particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 5 + 5}s`
                  }}
                ></div>
              ))}
            </div>
            
            <div className="relative">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <h3 className="text-3xl font-bold">Today's Jackpot</h3>
                  <div className="text-5xl md:text-6xl font-bold mt-2 gradient-text animate-pulse-slow inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-primary to-accent">
                      {jackpotAmount.toLocaleString()} $DUEL
                    </span>
                  </div>
                </div>
                
                <div className="bg-background-dark rounded-xl p-6 text-center border border-white/10 daily-countdown">
                  <div className="text-sm text-white/70 mb-2 flex items-center justify-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Next Draw at 8PM EST</span>
                  </div>
                  <div className="countdown-timer flex justify-center gap-2 mt-3">
                    <div className="countdown-segment">
                      <div className="text-3xl font-bold text-white">{String(timeRemaining.hours).padStart(2, '0')}</div>
                      <div className="text-xs text-white/50">HOURS</div>
                    </div>
                    <div className="text-2xl font-bold text-white/30 flex items-center pb-4">:</div>
                    <div className="countdown-segment">
                      <div className="text-3xl font-bold text-white">{String(timeRemaining.minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-white/50">MINUTES</div>
                    </div>
                    <div className="text-2xl font-bold text-white/30 flex items-center pb-4">:</div>
                    <div className="countdown-segment">
                      <div className="text-3xl font-bold text-white">{String(timeRemaining.seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-white/50">SECONDS</div>
                    </div>
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
                <button className="btn-primary py-3 text-lg group relative overflow-hidden">
                  <span className="relative z-10">Enter Jackpot</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient-x z-0"></div>
                </button>
              </div>
              
              <div className="mt-6 text-sm text-white/50">
                * The more tokens you stake, the higher your chances of winning. Entries remain locked until the daily 8PM EST draw.
              </div>
            </div>
          </div>
          
          <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <StatCard 
              icon={<Clock className="w-6 h-6 text-primary" />}
              title="Daily at 8PM EST"
              description="One massive jackpot draw every day at a fixed time"
            />
            <StatCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Massive Prize Pool"
              description="Growing jackpots that accumulate throughout the day"
            />
            <StatCard 
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Community Event"
              description="Connect with fellow token holders at draw time"
            />
            <StatCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Instant Rewards"
              description="Winners receive payouts immediately after the draw"
            />
          </div>
        </div>
      </div>
      
      {/* Jackpot section styles */}
      <style jsx>{`
        .daily-jackpot-text {
          text-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
          position: relative;
        }
        
        .daily-jackpot-text::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          border-radius: 3px;
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.017 13.735L50 12.5l-4.017 1.235.764-4.274-3.234-2.695 4.316-.627L50 2.5l2.171 3.639 4.316.627-3.234 2.695.764 4.274zm-44 .765L46 14.5l-4.017-1.235.764 4.274-3.234 2.695 4.316.627L46 24.5l2.171-3.639 4.316-.627-3.234-2.695.764-4.274zm-8-8L42 6.5l-4.017-1.235.764 4.274-3.234 2.695 4.316.627L42 16.5l2.171-3.639 4.316-.627-3.234-2.695.764-4.274z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translate(10px, -20px) rotate(45deg);
            opacity: 0.8;
          }
        }
        
        .jackpot-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: radial-gradient(circle, var(--color-primary), transparent);
          border-radius: 50%;
          animation: float-particle 5s ease-in-out infinite;
          opacity: 0.4;
        }
        
        .countdown-segment {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          padding: 4px 10px;
          min-width: 70px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .daily-countdown {
          position: relative;
          overflow: hidden;
        }
        
        .daily-countdown::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
          animation: pulse-background 5s ease-in-out infinite;
        }
        
        @keyframes pulse-background {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        @keyframes gradient-x {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 0%;
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
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
