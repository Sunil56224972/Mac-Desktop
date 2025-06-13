'use client';

import { useState, useCallback } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Finder } from './Finder';
import { Terminal } from './Terminal';
import { TextEdit } from './TextEdit';
import { AboutModal } from './AboutModal';

type AppId = 'finder' | 'terminal' | 'textedit' | 'about';

interface WindowState {
  id: AppId;
  isMinimized: boolean;
  zIndex: number;
}

let zCounter = 10;

export const Desktop = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  const openApp = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === appId);
      if (existing) {
        // Bring to front and restore if minimized
        return prev.map((w) =>
          w.id === appId
            ? { ...w, isMinimized: false, zIndex: ++zCounter }
            : w
        );
      }
      return [...prev, { id: appId, isMinimized: false, zIndex: ++zCounter }];
    });
    setActiveApp(appId);
  }, []);

  const closeApp = useCallback((appId: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId));
    setActiveApp(null);
  }, []);

  const minimizeApp = useCallback((appId: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, isMinimized: true } : w))
    );
    setActiveApp(null);
  }, []);

  const bringToFront = useCallback((appId: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, zIndex: ++zCounter } : w))
    );
    setActiveApp(appId);
  }, []);

  const openApps = windows
    .filter((w) => !w.isMinimized)
    .map((w) => w.id);

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Menu Bar */}
      <MenuBar activeApp={activeApp} />

      {/* App Windows */}
      {windows.map((win) => {
        if (win.isMinimized) return null;
        const commonProps = {
          onClose: () => closeApp(win.id),
          onMinimize: () => minimizeApp(win.id),
          onFocus: () => bringToFront(win.id),
          zIndex: win.zIndex,
        };

        switch (win.id) {
          case 'finder':
            return <Finder key="finder" {...commonProps} />;
          case 'terminal':
            return <Terminal key="terminal" {...commonProps} />;
          case 'textedit':
            return <TextEdit key="textedit" {...commonProps} />;
          case 'about':
            return <AboutModal key="about" {...commonProps} />;
          default:
            return null;
        }
      })}

      {/* Dock */}
      <Dock
        onLaunch={openApp}
        openApps={openApps}
      />
    </div>
  );
};
