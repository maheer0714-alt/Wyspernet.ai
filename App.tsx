import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchBox } from './components/SearchBox';
import { ResultCard } from './components/ResultCard';
import { fetchGameTips } from './services/geminiService';
import { AppState, GameData, Tip } from './types';
import { Ghost, Terminal, ArrowLeft } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Handle searching for a game
  const handleSearch = async (gameName: string) => {
    setAppState(AppState.LOADING);
    setErrorMsg('');
    
    try {
      // Small artificial delay for UX feel (scanning mainframe...)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const tips = await fetchGameTips(gameName);
      setGameData({
        gameName,
        tips
      });
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unknown error occurred');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setGameData(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-500/30 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow opacity-30"></div>
      </div>

      <Header />

      <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center min-h-[600px]">
        
        {/* IDLE STATE: Landing Page */}
        {appState === AppState.IDLE && (
          <div className="w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-brand-300 text-xs font-semibold tracking-wider uppercase mb-4 animate-float">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              System Operational
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-brand-100 to-slate-500 drop-shadow-lg leading-tight">
              Master the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-neon-purple">Metaverse</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
              Stuck on a level? Need the best trade secrets? <br className="hidden sm:block"/>
              Wyspernet analyzes game mechanics to deliver elite strategies for any Roblox experience.
            </p>

            <SearchBox onSearch={handleSearch} isLoading={false} />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20 text-left">
              <FeatureItem 
                icon={<Terminal className="w-6 h-6 text-brand-400" />}
                title="AI Analysis"
                desc="Instant strategy generation using Gemini 2.5 Flash models."
              />
              <FeatureItem 
                icon={<Ghost className="w-6 h-6 text-neon-purple" />}
                title="Hidden Secrets"
                desc="Uncover easter eggs and hidden locations others miss."
              />
              <FeatureItem 
                icon={<div className="font-display font-bold text-lg text-neon-cyan">XP</div>}
                title="Pro Leveling"
                desc="Optimize your playthrough with efficiency tips."
              />
            </div>
          </div>
        )}

        {/* LOADING STATE */}
        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
             <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-brand-400 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-slate-600" />
                </div>
             </div>
             <p className="text-slate-400 font-display text-lg tracking-widest animate-pulse">
               ANALYZING GAME DATA...
             </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {appState === AppState.SUCCESS && gameData && (
          <div className="w-full max-w-5xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                New Search
              </button>
              
              <h2 className="text-3xl font-display font-bold text-white text-center sm:text-right">
                Results for: <span className="text-brand-400 border-b-4 border-brand-500/20">{gameData.gameName}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameData.tips.map((tip, index) => (
                <ResultCard key={index} tip={tip} index={index} />
              ))}
            </div>

            <div className="mt-12 bg-slate-900/50 rounded-xl p-8 border border-slate-800 text-center">
              <h3 className="text-xl font-display font-bold text-white mb-2">Want tips for another game?</h3>
              <p className="text-slate-400 mb-6">Wyspernet is ready for the next query.</p>
              <button 
                onClick={handleReset}
                className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-brand-900/50"
              >
                Start New Scan
              </button>
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {appState === AppState.ERROR && (
          <div className="text-center max-w-lg mx-auto animate-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
              <Ghost className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-4">System Malfunction</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              {errorMsg || "We couldn't retrieve data for that game. It might be too obscure or the connection was interrupted."}
            </p>
            <button 
              onClick={handleReset}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
            >
              Return to Base
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

// Helper component for features
const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-brand-500/30 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="font-display font-bold text-slate-200 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);