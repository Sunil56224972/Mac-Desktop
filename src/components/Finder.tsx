'use client';

import { Window } from './Window';

interface FinderProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const SIDEBAR_ITEMS = [
  { label: 'Recents', icon: '🕐' },
  { label: 'Desktop', icon: '🖥️' },
  { label: 'Documents', icon: '📄' },
  { label: 'Downloads', icon: '⬇️' },
  { label: 'Projects', icon: '📁' },
];

const FILES = [
  { name: 'README.md', icon: '📝', modified: 'Today' },
  { name: 'portfolio.tsx', icon: '⚛️', modified: 'Yesterday' },
  { name: 'resume.pdf', icon: '📄', modified: 'Jul 12' },
  { name: 'background.jpg', icon: '🖼️', modified: 'Jul 10' },
  { name: 'projects', icon: '📁', modified: 'Jul 8' },
  { name: 'notes.md', icon: '📝', modified: 'Jul 6' },
];

export const Finder = ({ onClose, onMinimize, onFocus, zIndex }: FinderProps) => {
  return (
    <Window
      title="Finder — Desktop"
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      defaultPosition={{ x: 100, y: 60 }}
      defaultSize={{ width: 720, height: 460 }}
    >
      <div className="flex h-full bg-[#1e1e1e] text-white/90">
        {/* Sidebar */}
        <div className="w-44 bg-[#252525] border-r border-white/10 py-4 flex-shrink-0">
          <p className="px-4 text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">
            Favourites
          </p>
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-white/10 rounded-md mx-1 text-left"
              style={{ width: 'calc(100% - 8px)' }}
            >
              <span>{item.icon}</span>
              <span className="text-white/80">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="h-10 bg-[#2a2a2a] border-b border-white/10 flex items-center px-4 gap-3">
            <button className="text-white/40 hover:text-white/70 text-sm">‹</button>
            <button className="text-white/40 hover:text-white/70 text-sm">›</button>
            <div className="flex-1 text-center text-xs text-white/50">Desktop</div>
            <div className="w-28 h-5 bg-white/10 rounded text-xs flex items-center px-2 text-white/40">
              🔍 Search
            </div>
          </div>

          {/* Files grid */}
          <div className="flex-1 p-4 grid grid-cols-4 gap-3 content-start overflow-y-auto">
            {FILES.map((file) => (
              <div
                key={file.name}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer group"
              >
                <span className="text-4xl">{file.icon}</span>
                <span className="text-xs text-white/80 text-center truncate w-full text-center">
                  {file.name}
                </span>
                <span className="text-[10px] text-white/30">{file.modified}</span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="h-7 bg-[#252525] border-t border-white/10 flex items-center px-4">
            <span className="text-[11px] text-white/40">{FILES.length} items</span>
          </div>
        </div>
      </div>
    </Window>
  );
};
