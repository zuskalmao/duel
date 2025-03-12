import React, { useRef, useEffect, useState } from 'react';
import { Swords, User, Award, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DuelsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Initialize animations once when component mounts
  useEffect(() => {
    // Preload any duel cards that might be shown initially to prevent loading issues
    const preloadCards = document.querySelectorAll('.duel-card');
    if (preloadCards.length > 0) {
      gsap.set(preloadCards, { opacity: 0, y: 40 });
    }

    // Set up animations with delay to ensure DOM is ready
    const setupAnimations = () => {
      if (titleRef.current && tabsRef.current && contentRef.current) {
        ScrollTrigger.refresh();
        
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
        
        gsap.to(tabsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
        
        gsap.to(".duel-card", {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
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
    <section id="duels" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-light z-0"></div>
      
      {/* Animated swords background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Swords 
            key={i}
            className="absolute text-white/5 animate-pulse-slow"
            style={{
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={titleRef} 
          className="text-center max-w-3xl mx-auto mb-16 duels-title"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h2 className="section-title">
            1v1 <span className="text-primary">Duels</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 mt-4">
            Challenge other $DUEL holders to exciting one-on-one battles. Stake your tokens and battle for glory and rewards!
          </p>
        </div>
        
        <div 
          ref={tabsRef} 
          className="duels-tabs flex justify-center mb-12"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <div className="bg-background-dark rounded-full p-1 inline-flex">
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'active' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTab('active')}
            >
              Active Duels
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'completed' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTab('completed')}
            >
              Completed
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'my' 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTab('my')}
            >
              My Duels
            </button>
          </div>
        </div>
        
        <div ref={contentRef} className="duels-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTab === 'active' && (
            <>
              <DuelCard 
                player1="CryptoKing"
                player2="WaitingForOpponent"
                amount={500}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                player1="SolWarrior"
                player2="MoonShot"
                amount={1200}
                timeRemaining="03:45"
                status="active"
              />
              <DuelCard 
                player1="DiamondHands"
                player2="WaitingForOpponent"
                amount={800}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                player1="TradeMaster"
                player2="TokenWhale"
                amount={2500}
                timeRemaining="08:12"
                status="active"
              />
              <DuelCard 
                player1="SolanaFan"
                player2="WaitingForOpponent"
                amount={350}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                player1="BlockchainBaron"
                player2="CryptoNinja"
                amount={1800}
                timeRemaining="01:30"
                status="active"
              />
            </>
          )}
          
          {selectedTab === 'completed' && (
            <>
              <DuelCard 
                player1="SolWarrior"
                player2="MoonShot"
                amount={1200}
                winner="SolWarrior"
                status="completed"
              />
              <DuelCard 
                player1="DiamondHands"
                player2="TokenWhale"
                amount={3600}
                winner="TokenWhale"
                status="completed"
              />
              <DuelCard 
                player1="CryptoKing"
                player2="BlockchainBaron"
                amount={950}
                winner="CryptoKing" 
                status="completed"
              />
            </>
          )}
          
          {selectedTab === 'my' && (
            <div className="col-span-full text-center py-10">
              <p className="text-white/70 mb-4">Connect your wallet to view your duels</p>
              <button className="btn-primary mx-auto">
                Connect Wallet
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <button className="btn-outline group">
            View All Duels
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface DuelCardProps {
  player1: string;
  player2: string;
  amount: number;
  timeRemaining?: string;
  winner?: string;
  status: 'open' | 'active' | 'completed';
}

const DuelCard: React.FC<DuelCardProps> = ({ player1, player2, amount, timeRemaining, winner, status }) => {
  return (
    <div className="duel-card bg-background-dark border border-white/10 rounded-2xl p-6 card-hover overflow-hidden transition-all duration-300 relative">
      <div className={`absolute -top-1 -right-1 -left-1 h-1 rounded-t-2xl ${
        status === 'active' ? 'bg-accent' : 
        status === 'completed' ? 'bg-green-500' : 
        'bg-primary'
      }`}></div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Swords className="w-5 h-5 text-primary mr-2" />
          <span className="font-bold">Duel #{Math.floor(Math.random() * 10000)}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${
          status === 'active' ? 'bg-accent/20 text-accent' : 
          status === 'completed' ? 'bg-green-500/20 text-green-500' : 
          'bg-primary/20 text-primary'
        }`}>
          {status === 'active' ? 'In Progress' : 
           status === 'completed' ? 'Completed' : 
           'Open Challenge'}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-background-light flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6 text-white/70" />
          </div>
          <p className="text-sm font-medium truncate max-w-[100px]">{player1}</p>
          {status === 'completed' && winner === player1 && (
            <Award className="w-5 h-5 text-yellow-500 mx-auto mt-1" />
          )}
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold text-primary">{amount}</div>
          <div className="text-xs text-white/50">$DUEL</div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-background-light flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6 text-white/70" />
          </div>
          <p className="text-sm font-medium truncate max-w-[100px]">{player2}</p>
          {status === 'completed' && winner === player2 && (
            <Award className="w-5 h-5 text-yellow-500 mx-auto mt-1" />
          )}
        </div>
      </div>
      
      <div className="mt-4 border-t border-white/10 pt-4 flex justify-between items-center">
        {status === 'completed' ? (
          <div className="text-sm text-white/70">
            Winner: <span className="text-green-500 font-medium">{winner}</span>
          </div>
        ) : (
          <div className="text-sm text-white/70">
            {status === 'active' ? 'Ends in:' : 'Status:'} <span className="text-white font-medium">{timeRemaining}</span>
          </div>
        )}
        
        {status === 'open' && (
          <button className="btn-primary py-1 px-4 text-sm">
            Join Duel
          </button>
        )}
        
        {status === 'active' && (
          <button className="btn-outline py-1 px-4 text-sm">
            Watch
          </button>
        )}
        
        {status === 'completed' && (
          <button className="btn-outline py-1 px-4 text-sm">
            Details
          </button>
        )}
      </div>
    </div>
  );
};

export default DuelsSection;
