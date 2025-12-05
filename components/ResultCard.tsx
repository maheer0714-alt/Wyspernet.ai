import React from 'react';
import { Tip } from '../types';
import { Lightbulb, Shield, Key, Swords } from 'lucide-react';

interface ResultCardProps {
  tip: Tip;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ tip, index }) => {
  
  const getIcon = (category: string) => {
    switch (category) {
      case 'Strategy': return <Swords className="w-5 h-5 text-red-400" />;
      case 'Secret': return <Key className="w-5 h-5 text-yellow-400" />;
      case 'Mechanic': return <Shield className="w-5 h-5 text-blue-400" />;
      default: return <Lightbulb className="w-5 h-5 text-brand-400" />;
    }
  };

  const getColorClass = (category: string) => {
     switch (category) {
      case 'Strategy': return 'border-red-500/20 bg-red-500/5 hover:border-red-500/40';
      case 'Secret': return 'border-yellow-500/20 bg-yellow-500/5 hover:border-yellow-500/40';
      case 'Mechanic': return 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40';
      default: return 'border-brand-500/20 bg-brand-500/5 hover:border-brand-500/40';
    }
  };

  return (
    <div 
      className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getColorClass(tip.category)}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-bold text-lg text-slate-100 pr-4 leading-tight">
          {tip.title}
        </h3>
        <div className="p-2 rounded-lg bg-slate-900/50 backdrop-blur-sm shadow-inner">
          {getIcon(tip.category)}
        </div>
      </div>
      
      <p className="text-slate-300 text-sm leading-relaxed">
        {tip.description}
      </p>

      <div className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 uppercase tracking-wide">
        {tip.category}
      </div>
    </div>
  );
};