'use client';

import { useState, useRef, useEffect } from 'react';
import { Window } from './Window';

interface TerminalProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const WELCOME_MSG = `Last login: ${new Date().toDateString()} on ttys001
sunil@macbook ~ % `;

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  whoami        - About me
  skills        - My technical skills
  projects      - My projects
  contact       - How to reach me
  clear         - Clear the terminal
  ls            - List files`,
  whoami: `Sunil
Full-stack developer & creative coder
I build interactive, performant web experiences.`,
  skills: `Languages:   TypeScript, JavaScript, Python, Rust
Frameworks:  Next.js, React, Node.js, FastAPI
Tools:       Git, Docker, Figma, Vercel
Databases:   PostgreSQL, MongoDB, Redis`,
  projects: `1. Mac Desktop  - This portfolio (Next.js + TypeScript)
2. DevFlow      - Project management tool (React + GraphQL)
3. Synapse      - AI chat interface (Python + WebSockets)
4. Pixel         - Image editor built in the browser (Canvas API)`,
  contact: `Email:    sunil@example.com
GitHub:   github.com/Sunil56224972
LinkedIn: linkedin.com/in/sunil`,
  ls: `Desktop/     Downloads/    Projects/
README.md    resume.pdf    .zshrc`,
};

export const Terminal = ({ onClose, onMinimize, onFocus, zIndex }: TerminalProps) => {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: WELCOME_MSG },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory((prev) => [
      ...prev,
      { type: 'input', text: `sunil@macbook ~ % ${cmd}` },
    ]);

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', text: WELCOME_MSG }]);
    } else if (COMMANDS[trimmed]) {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: COMMANDS[trimmed] },
      ]);
    } else if (trimmed === '') {
      // do nothing
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'output', text: `zsh: command not found: ${trimmed}\nType 'help' for available commands.` },
      ]);
    }
    setInput('');
  };

  return (
    <Window
      title="Terminal — zsh"
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      defaultPosition={{ x: 180, y: 100 }}
      defaultSize={{ width: 620, height: 400 }}
    >
      <div
        className="h-full bg-[#1a1a1a] p-4 font-mono text-sm text-green-400 overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap mb-1 ${entry.type === 'input' ? 'text-white' : 'text-green-400'}`}
          >
            {entry.text}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center text-white">
          <span className="text-green-400 mr-1">sunil@macbook ~ %</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none caret-green-400 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommand(input);
            }}
            autoFocus
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </Window>
  );
};
