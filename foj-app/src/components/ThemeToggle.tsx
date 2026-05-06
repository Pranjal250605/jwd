import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Settings } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center bg-surface-container-highest shadow-2xl rounded-full p-2 border border-outline-variant/30 backdrop-blur-md">
      <div className="flex items-center text-on-surface-variant px-3 mr-2 border-r border-outline-variant/20">
        <Settings className="w-4 h-4 mr-2 text-primary" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Select Theme</span>
      </div>
      <div className="flex gap-1">
        {(['formal', 'luxurious', 'zen', 'sovereign', 'pavilion'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-4 py-1.5 text-xs font-sans rounded-full capitalize transition-all duration-300 ${
              theme === t 
                ? 'bg-primary text-on-primary shadow-lg ring-2 ring-primary/20 ring-offset-2 ring-offset-surface' 
                : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};
