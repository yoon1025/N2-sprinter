import React, { useEffect } from 'react';
import { Bell, X, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface InAppNotificationBannerProps {
  notification: { title: string; message: string; targetTab?: ActiveTab } | null;
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const InAppNotificationBanner: React.FC<InAppNotificationBannerProps> = ({
  notification,
  onClose,
  onNavigateTab
}) => {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 7000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const handleAction = () => {
    if (notification.targetTab) {
      onNavigateTab(notification.targetTab);
    }
    onClose();
  };

  return (
    <div className="fixed top-16 left-4 right-4 z-50 max-w-md mx-auto animate-in slide-in-from-top-4 duration-300 pointer-events-auto">
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-4 shadow-2xl border border-emerald-500/40 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5 text-emerald-400 animate-bounce" />
        </div>

        <div className="flex-1 min-w-0 pr-1">
          <h4 className="font-extrabold text-sm text-white tracking-tight leading-snug">
            {notification.title}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-snug">
            {notification.message}
          </p>

          {notification.targetTab && (
            <button
              onClick={handleAction}
              className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <span>지금 학습하러 가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="알림 닫기"
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-white flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
