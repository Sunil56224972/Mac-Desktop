'use client';

import { useState } from 'react';
import { Window } from './Window';

interface TextEditProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const DEFAULT_CONTENT = `# Hi, I'm Sunil 👋

I'm a full-stack developer who loves building beautiful, interactive web experiences.

## What I Do

- 🚀  Build fast, accessible web applications
- 🎨  Design delightful UIs with attention to detail
- 🔧  Engineer scalable backend systems
- 📱  Create cross-platform mobile apps

## Tech Stack

**Frontend:** React, Next.js, TypeScript, Tailwind CSS
**Backend:**  Node.js, Python, FastAPI, PostgreSQL
**Tools:**    Git, Docker, Vercel, Figma

## Current Focus

Working on open-source developer tools and experimenting
with creative coding and generative art.

---

Feel free to explore the desktop and check out my projects!
`;

export const TextEdit = ({ onClose, onMinimize, onFocus, zIndex }: TextEditProps) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isSaved, setIsSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      setIsSaved(true);
    }
  };

  return (
    <Window
      title={`about_me.md${isSaved ? '' : ' — Edited'}`}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      defaultPosition={{ x: 260, y: 80 }}
      defaultSize={{ width: 640, height: 500 }}
    >
      <div className="h-full flex flex-col bg-white">
        {/* Toolbar */}
        <div className="h-8 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-3">
          <span className="text-xs text-gray-500">Markdown</span>
          <div className="flex-1" />
          <span className="text-xs text-gray-400">{isSaved ? 'All changes saved' : '● Unsaved'}</span>
        </div>

        {/* Editor */}
        <textarea
          className="flex-1 p-6 font-mono text-sm text-gray-800 resize-none outline-none leading-relaxed"
          value={content}
          onChange={handleChange}
          onKeyDown={handleSave}
          spellCheck={false}
        />
      </div>
    </Window>
  );
};
