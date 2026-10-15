import React from 'react';
import { X, CheckCircle2, Lock, ArrowRight, Sparkles, Trophy, Calendar } from 'lucide-react';
import { FIFTY_DAYS_SYLLABUS } from '../data/curriculumData';
import { soundService } from '../utils/sound';

interface DaySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  completedDays: number[];
  onSelectDay: (day: number) => void;
}

export const DaySelectorModal: React.FC<DaySelectorModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  completedDays,
  onSelectDay
}) => {
  if (!isOpen) return null;

  const completedCount = completedDays.length;
  const progressPercent = Math.round((completedCount / 50) * 100);

  const handleDayClick = (day: number) => {
    soundService.playClick();
    onSelectDay(day);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                50일 완성 N2 출제 기준 커리큘럼
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                원하는 일차를 선택해 바로 이동하거나 이전 학습을 복습하세요.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 50-Day Stats Bar */}
        <div className="px-5 py-3 bg-emerald-50/60 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
            <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>전체 50일 완주 진도율: {completedCount} / 50일 ({progressPercent}%)</span>
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            {completedCount === 50 ? '🎉 50일 전과정 완주!' : `${50 - completedCount}일 남음`}
          </span>
        </div>

        {/* Scrollable Days List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {FIFTY_DAYS_SYLLABUS.map((item) => {
              const isSelected = item.day === currentDay;
              const isCompleted = completedDays.includes(item.day);
              const isMilestone = [10, 20, 25, 30, 40, 50].includes(item.day);

              return (
                <button
                  key={item.day}
                  type="button"
                  onClick={() => handleDayClick(item.day)}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative flex flex-col justify-between gap-2 ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30 dark:bg-emerald-500/20'
                      : isCompleted
                      ? 'bg-slate-50/80 dark:bg-slate-800/60 border-emerald-300 dark:border-emerald-700/50 hover:border-emerald-400'
                      : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Day {String(item.day).padStart(2, '0')}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {item.theme}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                        완료
                      </span>
                    ) : isSelected ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                        학습 중
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {item.title.replace(/^Day \d+\s*·\s*/, '')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      💡 {item.grammarSummary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                    <span>단어 {item.vocabCount}개 · 퀴즈 {item.quizCount}문항</span>
                    {isMilestone && (
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        <Sparkles className="w-3 h-3" /> 마일스톤
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            현재 선택: <strong className="text-emerald-600 dark:text-emerald-400">Day {currentDay}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
