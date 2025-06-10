'use client';

import { useState, useRef, useCallback } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export const Window = ({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  defaultPosition = { x: 80, y: 40 },
  defaultSize = { width: 700, height: 480 },
}: WindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startPosX: position.x,
        startPosY: position.y,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setPosition({
          x: Math.max(0, dragRef.current.startPosX + dx),
          y: Math.max(28, dragRef.current.startPosY + dy),
        });
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [isMaximized, onFocus, position]
  );

  return (
    <div
      className="absolute rounded-xl overflow-hidden shadow-2xl window-open"
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 28 : position.y,
        width: isMaximized ? '100vw' : size.width,
        height: isMaximized ? 'calc(100vh - 28px)' : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 flex items-center px-3 gap-2 cursor-default"
        style={{ background: 'rgba(40,40,40,0.92)', backdropFilter: 'blur(20px)' }}
        onMouseDown={handleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5 group">
          <button
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 focus:outline-none"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            title="Close"
          />
          <button
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 focus:outline-none"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            title="Minimize"
          />
          <button
            className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 focus:outline-none"
            onClick={(e) => { e.stopPropagation(); setIsMaximized((v) => !v); }}
            title="Maximize"
          />
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-xs font-medium text-white/70 pointer-events-none">
          {title}
        </div>

        {/* Spacer to balance traffic lights */}
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] overflow-hidden">{children}</div>
    </div>
  );
};
