import React from 'react';
import { Gamepad2, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-8 flex justify-between items-center border-b border-brand-900/50 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.reload()}>
        <div className="relative">
          <Gamepad2 className="w-8 h-8 text-brand-400 group-hover:text-neon-cyan transition-colors" />
          <Zap className="w-4 h-4 text-neon-purple absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-100 to-neon-purple">
          WYSPERNET.AI
        </h1>
      </div>
      <nav>
        <a 
          href="#" 
          className="text-sm font-medium text-slate-400 hover:text-brand-300 transition-colors hidden sm:block"
        >
          v1.0.0 // ONLINE
        </a>
      </nav>
    </header>
  );
};