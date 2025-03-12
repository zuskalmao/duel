import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GamblingPage from './pages/GamblingPage';
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; opacity: number }[]>([]);
  const [isPointerOverClickable, setIsPointerOverClickable] = useState(false);

  // Enhanced cursor effect with trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });

      // Add new position to trail with full opacity
      setCursorTrail(prev => {
        const newTrail = [{ x: clientX, y: clientY, opacity: 1 }, ...prev.slice(0, 10)];
        // Decrease opacity of older trail items
        return newTrail.map((point, index) => ({
          ...point,
          opacity: Math.max(0, 1 - index * 0.09)
        }));
      });
      
      // Check if mouse is over clickable element
      const element = document.elementFromPoint(clientX, clientY);
      const isClickable = element?.closest('a, button, [role="button"], .cursor-pointer') !== null;
      setIsPointerOverClickable(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-background text-white overflow-hidden">
      {/* Enhanced custom cursor with trail effect */}
      <div 
        className={`cursor-dot fixed w-6 h-6 rounded-full backdrop-blur-sm z-50 pointer-events-none mix-blend-screen hidden md:block ${
          isPointerOverClickable ? 'bg-primary scale-125' : 'bg-primary/50'
        }`}
        style={{ 
          left: `${cursorPosition.x}px`, 
          top: `${cursorPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px 5px rgba(138, 43, 226, 0.4)',
          transition: 'background-color 0.2s, transform 0.2s'
        }}
      >
        <div className="absolute inset-0 rounded-full border border-white/40 animate-ping"></div>
      </div>
      
      {/* Cursor trail */}
      {cursorTrail.map((point, index) => (
        <div 
          key={index}
          className="fixed rounded-full pointer-events-none hidden md:block"
          style={{ 
            left: `${point.x}px`, 
            top: `${point.y}px`,
            width: `${Math.max(5, 20 - index * 1.5)}px`,
            height: `${Math.max(5, 20 - index * 1.5)}px`,
            opacity: point.opacity * 0.6,
            backgroundColor: index % 2 ? 'rgba(138, 43, 226, 0.4)' : 'rgba(255, 105, 180, 0.4)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.1s ease',
            zIndex: 49 - index
          }}
        />
      ))}
      
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content with padding for fixed header */}
      <div className="pt-32">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/gambling" element={<GamblingPage />} />
          </Routes>
        </AnimatePresence>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
