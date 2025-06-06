export interface AppId {
  id: 'finder' | 'terminal' | 'textedit' | 'about';
}

export interface WindowProps {
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  link?: string;
}
