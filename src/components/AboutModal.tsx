'use client';

import { Window } from './Window';

interface AboutModalProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const SKILLS = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Figma'];

export const AboutModal = ({ onClose, onMinimize, onFocus, zIndex }: AboutModalProps) => {
  return (
    <Window
      title="About Sunil"
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      defaultPosition={{ x: 300, y: 120 }}
      defaultSize={{ width: 520, height: 400 }}
    >
      <div className="h-full bg-[#1e1e1e] text-white/90 p-8 flex flex-col items-center justify-center gap-5">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl">
          👨‍💻
        </div>

        {/* Name */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Sunil</h1>
          <p className="text-sm text-white/50 mt-1">Full-Stack Developer & Creative Coder</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 justify-center max-w-xs">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/15 text-white/70"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/Sunil56224972"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            GitHub
          </a>
          <a
            href="mailto:sunil@example.com"
            className="text-xs text-blue-400 hover:text-blue-300 underline"
          >
            Email
          </a>
        </div>

        <p className="text-xs text-white/30 text-center max-w-xs leading-relaxed">
          Built this interactive macOS-style portfolio from scratch using Next.js, TypeScript, and Tailwind CSS.
        </p>
      </div>
    </Window>
  );
};
