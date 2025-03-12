import React from 'react';
import { Sword, Twitter, Globe, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="flex items-center mb-6 md:mb-0">
            <Sword className="w-8 h-8 text-primary mr-2" />
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">$</span>DUEL
            </span>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center transition-transform hover:transform hover:scale-110 hover:bg-background-light/80"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-white/70" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full bg-background-light flex items-center justify-center transition-transform hover:transform hover:scale-110 hover:bg-background-light/80"
              aria-label="Website"
            >
              <Globe className="w-5 h-5 text-white/70" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-lg font-bold mb-4">About $DUEL</h3>
              <p className="text-white/60 max-w-md">
                The premier battle memecoin on Solana where holders can duel for rewards. Join us for exciting 1v1 battles and massive jackpot draws.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Whitepaper</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>How to Buy</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Documentation</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Blog</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Twitter</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Telegram</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Discord</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/60 hover:text-primary flex items-center">
                    <span>Medium</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/40 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} $DUEL. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 text-sm hover:text-white/60">Terms of Service</a>
              <a href="#" className="text-white/40 text-sm hover:text-white/60">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
