import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Swords, User, Award, ArrowRight, Sparkles, Shield, Target, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DuelsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Generate stable background sword elements
  const backgroundSwords = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      width: `${Math.random() * 10 + 5}rem`,
      height: `${Math.random() * 10 + 5}rem`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotation: `rotate(${Math.random() * 360}deg)`,
      animationDelay: `${Math.random() * 5}s`
    }));
  }, []);

  // Generate stable duel IDs
  const duelIds = useMemo(() => {
    return {
      duel1: Math.floor(1000 + Math.random() * 9000),
      duel2: Math.floor(1000 + Math.random() * 9000),
      duel3: Math.floor(1000 + Math.random() * 9000),
      duel4: Math.floor(1000 + Math.random() * 9000),
      duel5: Math.floor(1000 + Math.random() * 9000),
      duel6: Math.floor(1000 + Math.random() * 9000),
      duel7: Math.floor(1000 + Math.random() * 9000),
      duel8: Math.floor(1000 + Math.random() * 9000),
      duel9: Math.floor(1000 + Math.random() * 9000)
    };
  }, []);
  
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
        
        // Fire animation for crossed swords
        gsap.to(".crossed-swords .sword-left", {
          rotate: 45,
          duration: 0.8,
          delay: 0.3,
          ease: "elastic.out(1, 0.3)"
        });
        
        gsap.to(".crossed-swords .sword-right", {
          rotate: -45,
          duration: 0.8,
          delay: 0.5,
          ease: "elastic.out(1, 0.3)"
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
      {/* Enhanced Background with more dynamic elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background-dark z-0"></div>
      
      {/* Dynamic Battle Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="battle-line battle-line-1"></div>
        <div className="battle-line battle-line-2"></div>
        <div className="battle-line battle-line-3"></div>
        
        {/* Battle Terrain */}
        <div className="battle-terrain"></div>
        
        {/* Animated swords background */}
        {backgroundSwords.map((sword) => (
          <Swords 
            key={sword.id}
            className="absolute text-white/5 animate-float-slow"
            style={{
              width: sword.width,
              height: sword.height,
              top: sword.top,
              left: sword.left,
              transform: sword.rotation,
              animationDelay: sword.animationDelay
            }}
          />
        ))}
        
        {/* Fire/Embers */}
        <div className="ember ember-1"></div>
        <div className="ember ember-2"></div>
        <div className="ember ember-3"></div>
        <div className="ember ember-4"></div>
        <div className="ember ember-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={titleRef} 
          className="text-center max-w-4xl mx-auto mb-16 duels-title"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {/* Enhanced Duels Title */}
          <div className="relative inline-block mb-6">
            <div className="crossed-swords absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 opacity-60">
              <div className="sword-left absolute w-32 h-32 left-0 top-0 rotate-0">
                <Swords className="w-full h-full text-primary" />
              </div>
              <div className="sword-right absolute w-32 h-32 left-0 top-0 rotate-0">
                <Swords className="w-full h-full text-accent" />
              </div>
            </div>
            
            <h2 className="duel-title text-5xl md:text-7xl font-extrabold uppercase relative z-10">
              <span className="mr-3 inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/70 duel-text-glow">1v1</span>
                <span className="absolute -top-1 -left-1 text-transparent bg-clip-text bg-white/5 blur-sm">1v1</span>
              </span>
              <span className="inline-block relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent/70 duel-text-glow">DUELS</span>
                <span className="absolute -top-1 -left-1 text-transparent bg-clip-text bg-white/5 blur-sm">DUELS</span>
                <Sparkles className="absolute -top-4 -right-4 w-5 h-5 text-accent animate-twinkle" />
              </span>
            </h2>
            
            {/* Animated Line Under Title */}
            <div className="h-1 w-0 bg-gradient-to-r from-primary via-accent to-primary mx-auto mt-4 animate-expand"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mt-8 font-medium drop-shadow-lg">
            Challenge other $DUEL holders to epic one-on-one battles. Stake your tokens and fight for glory and rewards!
          </p>
        </div>
        
        <div 
          ref={tabsRef} 
          className="duels-tabs flex justify-center mb-12"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <div className="bg-background-dark/80 backdrop-blur-md rounded-full p-1 inline-flex">
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'active' 
                  ? 'bg-primary text-white shadow-glow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTab('active')}
            >
              Active Duels
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'completed' 
                  ? 'bg-primary text-white shadow-glow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setSelectedTab('completed')}
            >
              Completed
            </button>
            <button 
              className={`px-6 py-2 rounded-full transition-all ${
                selectedTab === 'my' 
                  ? 'bg-primary text-white shadow-glow-sm' 
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
                duelId={duelIds.duel1}
                player1="CryptoKing"
                player2="WaitingForOpponent"
                amount={500}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                duelId={duelIds.duel2}
                player1="SolWarrior"
                player2="MoonShot"
                amount={1200}
                timeRemaining="03:45"
                status="active"
              />
              <DuelCard 
                duelId={duelIds.duel3}
                player1="DiamondHands"
                player2="WaitingForOpponent"
                amount={800}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                duelId={duelIds.duel4}
                player1="TradeMaster"
                player2="TokenWhale"
                amount={2500}
                timeRemaining="08:12"
                status="active"
              />
              <DuelCard 
                duelId={duelIds.duel5}
                player1="SolanaFan"
                player2="WaitingForOpponent"
                amount={350}
                timeRemaining="Wait for opponent"
                status="open"
              />
              <DuelCard 
                duelId={duelIds.duel6}
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
                duelId={duelIds.duel7}
                player1="SolWarrior"
                player2="MoonShot"
                amount={1200}
                winner="SolWarrior"
                status="completed"
              />
              <DuelCard 
                duelId={duelIds.duel8}
                player1="DiamondHands"
                player2="TokenWhale"
                amount={3600}
                winner="TokenWhale"
                status="completed"
              />
              <DuelCard 
                duelId={duelIds.duel9}
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
      
      {/* Enhanced Duel Section Styles */}
      <style jsx>{`
        .duel-title {
          letter-spacing: 2px;
        }
        
        .duel-text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        @keyframes expand {
          0% {
            width: 0;
          }
          100% {
            width: 100px;
          }
        }
        
        .animate-expand {
          animation: expand 1.5s forwards ease-out;
        }
        
        .shadow-glow-sm {
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.5);
        }
        
        .battle-line {
          position: absolute;
          height: 1px;
          width: 100%;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          opacity: 0.2;
        }
        
        .battle-line-1 {
          top: 25%;
          animation: line-move 20s infinite linear;
        }
        
        .battle-line-2 {
          top: 50%;
          animation: line-move 15s infinite linear reverse;
        }
        
        .battle-line-3 {
          top: 75%;
          animation: line-move 25s infinite linear;
        }
        
        @keyframes line-move {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }
        
        .battle-terrain {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: radial-gradient(ellipse at center, rgba(138, 43, 226, 0.1) 0%, transparent 70%);
        }
        
        .ember {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 69, 0, 0.8), transparent);
          filter: blur(1px);
          animation: float-ember 8s infinite ease-in-out;
        }
        
        .ember-1 {
          left: 20%;
          bottom: 20%;
          animation-delay: 0s;
        }
        
        .ember-2 {
          left: 40%;
          bottom: 30%;
          animation-delay: 2s;
        }
        
        .ember-3 {
          left: 60%;
          bottom: 25%;
          animation-delay: 4s;
        }
        
        .ember-4 {
          left: 80%;
          bottom: 15%;
          animation-delay: 1s;
        }
        
        .ember-5 {
          left: 30%;
          bottom: 40%;
          animation-delay: 3s;
        }
        
        @keyframes float-ember {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
          }
        }
        
        .duel-card {
          background: rgba(25, 25, 35, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .duel-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.5);
          border-color: rgba(138, 43, 226, 0.3);
        }
      `}</style>
    </section>
  );
};

interface DuelCardProps {
  duelId: number;  // Now passing specific IDs instead of generating random ones
  player1: string;
  player2: string;
  amount: number;
  timeRemaining?: string;
  winner?: string;
  status: 'open' | 'active' | 'completed';
}

const DuelCard: React.FC<DuelCardProps> = ({ duelId, player1, player2, amount, timeRemaining, winner, status }) => {
  // Enhanced card with status badges and player avatars
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
          <span className="font-bold">Duel #{duelId}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${
          status === 'active' ? 'bg-accent/20 text-accent border border-accent/30' : 
          status === 'completed' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 
          'bg-primary/20 text-primary border border-primary/30'
        }`}>
          {status === 'active' ? (
            <div className="flex items-center">
              <Flame className="w-3 h-3 mr-1" />
              In Progress
            </div>
          ) : status === 'completed' ? (
            <div className="flex items-center">
              <Shield className="w-3 h-3 mr-1" />
              Completed
            </div>
          ) : (
            <div className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              Open Challenge
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-background-light flex items-center justify-center mx-auto mb-2 border border-white/10 shadow-inner">
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
          <div className="w-12 h-12 rounded-full bg-background-light flex items-center justify-center mx-auto mb-2 border border-white/10 shadow-inner">
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
          <button className="btn-primary py-1 px-4 text-sm relative overflow-hidden group">
            <span className="relative z-10">Join Duel</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient-x transition-opacity duration-300"></div>
          </button>
        )}
        
        {status === 'active' && (
          <button className="btn-outline py-1 px-4 text-sm group">
            <Flame className="w-3 h-3 inline mr-1 text-accent" />
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
