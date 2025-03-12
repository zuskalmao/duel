import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';

const JackpotBanner: React.FC = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 0, seconds: 0 });
  const [jackpotAmount, setJackpotAmount] = useState(25000);
  
  // Calculate time until next half-hour mark
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      // Calculate minutes and seconds until next 30-minute mark
      let minutesUntilNext;
      if (minutes < 30) {
        minutesUntilNext = 30 - minutes - 1;
      } else {
        minutesUntilNext = 60 - minutes - 1;
      }
      
      const secondsUntilNext = 60 - seconds;
      
      setTimeRemaining({
        minutes: minutesUntilNext,
        seconds: secondsUntilNext
      });
    };
    
    // Initial calculation
    calculateTimeRemaining();
    
    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate growing jackpot
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAmount = Math.floor(Math.random() * 150);
      setJackpotAmount(prev => prev + randomAmount);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-gradient-to-r from-background-dark via-background to-background-dark border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-primary">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm md:text-base font-medium">Next Jackpot:</span>
            </div>
            <div className="text-white font-bold">
              {String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 ml-auto mr-4">
            <div className="flex items-center text-primary">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm md:text-base font-medium">Current Pot:</span>
            </div>
            <div className="text-white font-bold animate-pulse">
              {jackpotAmount.toLocaleString()} $DUEL
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/gambling')}
            className="btn-primary btn-sm py-1 flex items-center group"
          >
            Join Now
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JackpotBanner;
