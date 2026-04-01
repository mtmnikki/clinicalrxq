import { ClipboardList, BarChart3, History } from 'lucide-react';

export type TabType = 'log' | 'dashboard' | 'history';

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  interventionCount: number;
}

export function TabNav({ activeTab, onTabChange, interventionCount }: TabNavProps) {
  const tabs: { id: TabType; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: 'log', label: 'Log Intervention', shortLabel: 'Log', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Dashboard', shortLabel: 'Dash', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'History', shortLabel: 'History', icon: <History className="w-4 h-4" /> }
  ];

  return (
    <nav className="flex bg-[#EAE3D1] border-b-2 border-[#1A1825] px-2 sm:px-6 gap-0 sticky top-[88px] sm:top-[62px] z-40">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            font-mono text-[0.6rem] sm:text-[0.7rem] font-medium tracking-[0.06em] sm:tracking-[0.1em] uppercase
            px-2 sm:px-5 py-2.5 sm:py-3 border-none border-r border-[#DDD5C0] bg-transparent
            cursor-pointer relative transition-colors flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-none justify-center sm:justify-start
            ${activeTab === tab.id
              ? 'text-[#1B3460] bg-[#F4EFE5] font-bold'
              : 'text-[#888099] hover:text-[#1A1825] hover:bg-[#DDD5C0]'
            }
          `}
        >
          {tab.icon}
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.shortLabel}</span>
          {tab.id === 'dashboard' && interventionCount > 0 && (
            <span className="inline-flex items-center justify-center bg-[#B81818] text-white text-[0.5rem] sm:text-[0.55rem] font-bold rounded-sm px-1 py-px ml-0.5 sm:ml-1.5 leading-tight min-w-[16px] sm:min-w-[18px]">
              {interventionCount}
            </span>
          )}
          {activeTab === tab.id && (
            <span className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#1B3460]" />
          )}
        </button>
      ))}
    </nav>
  );
}
