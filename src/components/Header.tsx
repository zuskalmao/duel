import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sword, Wallet } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-background/90 backdrop-blur-md shadow-lg' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo - Left Side */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Sword className="w-7 h-7 text-primary mr-2" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">$</span>DUEL
          </span>
        </div>

        {/* Navigation Links - Center */}
        <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className="flex items-center space-x-10">
            <a 
              href="/#about" 
              className="text-white/80 hover:text-primary transition-colors text-base font-medium"
            >
              About
            </a>
            <div 
              className={`cursor-pointer text-white/80 hover:text-primary transition-colors text-base font-medium ${
                location.pathname === '/gambling' ? 'text-primary' : ''
              }`}
              onClick={() => navigate('/gambling')}
            >
              Arena
            </div>
          </div>
        </nav>

        {/* Connect Wallet - Right Side */}
        <div className="hidden md:block">
          <button className="btn-primary whitespace-nowrap">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-[300px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="/#about" 
            className="text-white/80 hover:text-primary transition-colors py-2"
          >
            About
          </a>
          <div 
            className={`cursor-pointer text-white/80 hover:text-primary transition-colors py-2 ${
              location.pathname === '/gambling' ? 'text-primary' : ''
            }`}
            onClick={() => navigate('/gambling')}
          >
            Arena
          </div>
          <button className="btn-primary w-full">
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
