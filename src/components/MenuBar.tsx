'use client';

import { useState, useEffect } from 'react';

interface MenuBarProps {
  activeApp: string | null;
}

const MENU_ITEMS: Record<string, string[]> = {
  Finder: ['About This Mac', '---', 'System Preferences...', 'App Store...', '---', 'Sleep', 'Restart...', 'Shut Down...'],
  Terminal: ['Shell', 'Edit', 'View', 'Window', 'Help'],
  TextEdit: ['File', 'Edit', 'Format', 'View', 'Window'],
  Finder_app: ['File', 'Edit', 'View', 'Go', 'Window', 'Help'],
};

export const MenuBar = ({ activeApp }: MenuBarProps) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 right-0 h-7 flex items-center px-3 z-[9999] text-white text-xs"
      style={{
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Apple menu */}
      <button className="font-bold text-sm mr-4 hover:bg-white/15 px-2 py-0.5 rounded">
        
      </button>

      {/* App name */}
      <span className="font-semibold mr-4">{activeApp ?? 'Finder'}</span>

      {/* Menu items */}
      <div className="flex gap-1">
        {['File', 'Edit', 'View', 'Window', 'Help'].map((item) => (
          <button
            key={item}
            className="hover:bg-white/15 px-2 py-0.5 rounded text-white/80"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4 text-white/80">
        <span>🔋 100%</span>
        <span>📶</span>
        <span>{time}</span>
      </div>
    </div>
  );
};
