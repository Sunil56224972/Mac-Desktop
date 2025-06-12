'use client';

type AppId = 'finder' | 'terminal' | 'textedit' | 'about';

interface DockItem {
  id: AppId;
  label: string;
  icon: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'finder', label: 'Finder', icon: '/menu/app_finder.png' },
  { id: 'terminal', label: 'Terminal', icon: '/menu/app_terminal.png' },
  { id: 'textedit', label: 'TextEdit', icon: '/menu/app_textedit.png' },
  { id: 'about', label: 'About Me', icon: '/logo.png' },
];

interface DockProps {
  onLaunch: (appId: AppId) => void;
  openApps: string[];
}

export const Dock = ({ onLaunch, openApps }: DockProps) => {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-end z-50">
      <div
        className="flex items-end gap-2 px-3 py-2 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.25)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {DOCK_ITEMS.map((item) => (
          <div key={item.id} className="flex flex-col items-center group relative">
            {/* Tooltip */}
            <span className="absolute -top-8 text-xs bg-black/70 text-white px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>

            {/* Icon */}
            <button
              onClick={() => onLaunch(item.id)}
              className="w-12 h-12 rounded-xl overflow-hidden transition-transform duration-150 ease-out group-hover:-translate-y-2 group-hover:scale-110 active:scale-95 focus:outline-none"
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' rx='10' fill='%234f8ef7'/><text x='50%25' y='58%25' font-size='24' text-anchor='middle' dominant-baseline='middle' fill='white'>${item.label[0]}</text></svg>`;
                }}
              />
            </button>

            {/* Running indicator */}
            {openApps.includes(item.id) && (
              <span className="w-1 h-1 bg-white/70 rounded-full mt-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
