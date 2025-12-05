import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (gameName: string) => void;
  isLoading: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-12 relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-neon-purple rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900 ring-1 ring-slate-800 rounded-xl flex items-center shadow-2xl overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Roblox game name (e.g., Blox Fruits, Doors)..."
            className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder:text-slate-500 font-sans text-lg h-16"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="h-16 px-8 flex items-center justify-center bg-transparent text-brand-400 hover:text-white hover:bg-brand-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-l border-slate-800"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>
      
      {/* Suggestions or Flavor Text */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center text-xs text-slate-400">
        <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-yellow-500"/> Popular:</span>
        <button type="button" onClick={() => { setQuery('Blox Fruits'); onSearch('Blox Fruits'); }} className="hover:text-brand-300 underline decoration-dotted">Blox Fruits</button>
        <span className="text-slate-700">•</span>
        <button type="button" onClick={() => { setQuery('Adopt Me!'); onSearch('Adopt Me!'); }} className="hover:text-brand-300 underline decoration-dotted">Adopt Me!</button>
        <span className="text-slate-700">•</span>
        <button type="button" onClick={() => { setQuery('Doors'); onSearch('Doors'); }} className="hover:text-brand-300 underline decoration-dotted">Doors</button>
        <span className="text-slate-700">•</span>
        <button type="button" onClick={() => { setQuery('Brookhaven RP'); onSearch('Brookhaven RP'); }} className="hover:text-brand-300 underline decoration-dotted">Brookhaven RP</button>
      </div>
    </div>
  );
};