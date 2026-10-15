import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Calendar, Flame, RefreshCw, Bell, ChevronLeft, ChevronRight, ChevronDown, Check } from 'lucide-react';
import { soundService } from '../utils/sound';

interface HeaderProps {
  streakDays: number;
  examDate: string;
  onUpdateExamDate: (date: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onResetToday: () => void;
  onOpenNotificationModal: () => void;
  hasActiveAlarms: boolean;
  currentDay: number;
  onOpenDaySelector: () => void;
  onChangeDay: (day: number) => void;
  isCurrentDayCompleted: boolean;
  dayTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  streakDays,
  examDate,
  onUpdateExamDate,
  isDarkMode,
  onToggleDarkMode,
  onResetToday,
  onOpenNotificationModal,
  hasActiveAlarms,
  currentDay,
  onOpenDaySelector,
  onChangeDay,
  isCurrentDayCompleted,
  dayTitle
}) => {
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [showDateModal, setShowDateModal] = useState(false);
  const [tempDate, setTempDate] = useState(examDate);

  // Calculate D-day
  const calculateDday = (targetStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetStr);
    target.setHours(0, 0, 0, 0);
    const diffMs = target.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const dDay = calculateDday(examDate);

  const toggleSound = () => {
    const muted = soundService.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundService.playClick();
    }
  };

  const handleSaveDate = () => {
    onUpdateExamDate(tempDate);
    setShowDateModal(false);
    soundService.playClick();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Brand Wordmark & D-day */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white truncate">
              N2 스프린터
            </span>
          </div>

          {/* D-Day badge button */}
          <button
            onClick={() => setShowDateModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors"
            title="목표 시험일 변경"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="tabular-nums font-bold">
              {dDay >= 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`}
            </span>
          </button>
        </div>

        {/* Right Action Icons: Streak, Sound, Dark mode, Reset */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Streak indicator */}
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-lg">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="tabular-nums font-bold">{streakDays}일</span>
          </div>

          {/* Commute Notification Alarm Scheduler button */}
          <button
            onClick={() => {
              soundService.playClick();
              onOpenNotificationModal();
            }}
            aria-label="출퇴근 푸시 알림 설정"
            title="출퇴근 푸시 알림 예약"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {hasActiveAlarms && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? '음소거 해제' : '음소거'}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            aria-label="다크 모드 전환"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Quick Today Reset */}
          <button
            onClick={onResetToday}
            aria-label="오늘 학습 체크 초기화"
            title="오늘 학습 체크 초기화"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 50-Day Curriculum Quick Bar */}
      <div className="bg-slate-50/90 dark:bg-slate-900/90 border-t border-slate-200/70 dark:border-slate-800/80 px-4 py-2">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Prev Day Button */}
          <button
            type="button"
            disabled={currentDay <= 1}
            onClick={() => {
              if (currentDay > 1) {
                soundService.playClick();
                onChangeDay(currentDay - 1);
              }
            }}
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
              currentDay <= 1
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">이전 Day</span>
          </button>

          {/* Current Day Dropdown Selector */}
          <button
            type="button"
            onClick={() => {
              soundService.playClick();
              onOpenDaySelector();
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 transition-all max-w-[72%] sm:max-w-md truncate group cursor-pointer"
          >
            <span className="px-2 py-0.5 rounded-md text-[11px] font-black bg-emerald-600 text-white shrink-0">
              Day {String(currentDay).padStart(2, '0')}
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
              {dayTitle}
            </span>
            {isCurrentDayCompleted ? (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0 flex items-center gap-0.5">
                <Check className="w-3.5 h-3.5" /> 완료
              </span>
            ) : null}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 shrink-0" />
          </button>

          {/* Next Day Button */}
          <button
            type="button"
            disabled={currentDay >= 50}
            onClick={() => {
              if (currentDay < 50) {
                soundService.playClick();
                onChangeDay(currentDay + 1);
              }
            }}
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
              currentDay >= 50
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span className="hidden sm:inline">다음 Day</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Exam Date Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              JLPT N2 목표 시험일 설정
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              다가오는 7월 또는 12월 첫째 주 일요일 등 본인의 목표 시험일을 설정하세요.
            </p>

            <div className="space-y-3 mb-5">
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />

              {/* Quick Preset Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTempDate('2026-12-06')}
                  className="flex-1 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  2026년 12월 시험
                </button>
                <button
                  type="button"
                  onClick={() => setTempDate('2027-07-04')}
                  className="flex-1 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  2027년 7월 시험
                </button>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowDateModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleSaveDate}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
