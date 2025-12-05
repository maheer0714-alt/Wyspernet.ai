import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center text-slate-500 text-sm mt-auto border-t border-slate-900">
      <p>© {new Date().getFullYear()} Wyspernet.ai. Not affiliated with Roblox Corporation.</p>
      <p className="mt-2 text-xs text-slate-600">Powered by Gemini 2.5 Flash</p>
    </footer>
  );
};