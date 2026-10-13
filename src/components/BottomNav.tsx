import React from 'react';
import { Home, BookOpen, Sparkles, FileText, CheckCircle2, Calendar } from 'lucide-react';
import { ActiveTab } from '../types';
import { soundService } from '../utils/sound';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  todayProgress: number; // 0 to 100
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  todayProgress
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: '대시보드', icon: Home },
    { id: 'vocab', label: '단어 50', icon: BookOpen },
    { id: 'grammar', label: '10분 문법', icon: Sparkles },
    { id: 'reading', label: '단문 독해', icon: FileText },
    { id: 'quiz', label: '미니 퀴즈', icon: CheckCircle2 },
    { id: 'schedule', label: '루틴/기출', icon: Calendar }
  ];

  const handleTabClick = (tabId: ActiveTab) => {
    if (activeTab !== tabId) {
      soundService.playClick();
      onChangeTab(tabId);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 transition-colors pb-safe">
      <div className="max-w-4xl mx-auto px-1 sm:px-4">
        {/* Subtle top progress hairline */}
        <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${todayProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-6 h-15 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute top-0.5 w-6 h-0.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                )}

                <div className="p-1">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                </div>
                <span className="text-[10px] sm:text-[11px] leading-tight truncate px-0.5">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
