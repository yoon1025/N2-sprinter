import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Volume2,
  AlertTriangle,
  Flame,
  Clock
} from 'lucide-react';
import { GrammarQuest } from '../types';
import { speakJapanese } from '../utils/speech';
import { soundService } from '../utils/sound';

interface GrammarViewProps {
  quests: GrammarQuest[];
  completedGrammarIds: string[];
  onToggleGrammarCheck: (questId: string) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  quests,
  completedGrammarIds,
  onToggleGrammarCheck
}) => {
  const [selectedQuestId, setSelectedQuestId] = useState<string>(quests[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // 10-Minute Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(600); // 10 minutes (600s)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      soundService.playFanfare();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => {
    soundService.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    soundService.playClick();
    setIsTimerRunning(false);
    setTimerSeconds(600);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const categories = ['전체', '수수동', '경어', '접속사', '기능어', '추측/당위'];

  const filteredQuests = quests.filter((q) => {
    if (selectedCategory === '전체') return true;
    return q.category === selectedCategory;
  });

  const activeQuest = quests.find((q) => q.id === selectedQuestId) || quests[0];

  const handleSpeak = (text: string) => {
    soundService.playClick();
    speakJapanese(text);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* 10-Minute Focus Pomodoro Bar */}
      <section className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-sky-400/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sky-200 text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span>점심 & 퇴근길 10분 초집중 타이머</span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                &quot;딱 10분만 투자하면 문법 1개 격파!&quot;
              </h3>
            </div>
          </div>

          {/* Timer Display & Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 bg-black/20 rounded-2xl px-4 py-2 border border-white/10">
            <span className="text-2xl font-black tabular-nums tracking-widest text-amber-300">
              {formatTimer(timerSeconds)}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleTimer}
                className="w-9 h-9 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center hover:bg-amber-300 transition-colors"
                title={isTimerRunning ? '일시정지' : '10분 타이머 시작'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={resetTimer}
                className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                title="10분 리셋"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundService.playClick();
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Quest Selector Buttons (Horizontal Scroll or Compact Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredQuests.map((quest) => {
          const isCompleted = completedGrammarIds.includes(quest.id);
          const isSelected = selectedQuestId === quest.id;

          return (
            <button
              key={quest.id}
              onClick={() => {
                soundService.playClick();
                setSelectedQuestId(quest.id);
              }}
              className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between gap-2 ${
                isSelected
                  ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-400 dark:border-sky-600 ring-2 ring-sky-400/20'
                  : isCompleted
                  ? 'bg-white dark:bg-slate-800/80 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {quest.category}
                  </span>
                  <span className="text-[10px] text-slate-400">약 {quest.estimatedMinutes}분</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {quest.title}
                </h4>
              </div>

              <div className="shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Quest Detail Card */}
      {activeQuest && (
        <section className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-md space-y-5">
          {/* Quest Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
                  {activeQuest.category} 마스터
                </span>
                <span className="text-xs text-slate-400">10분 쪼개기 퀘스트</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {activeQuest.title}
              </h3>
            </div>

            {/* Complete Checkbox */}
            <button
              type="button"
              onClick={() => onToggleGrammarCheck(activeQuest.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto cursor-pointer ${
                completedGrammarIds.includes(activeQuest.id)
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedGrammarIds.includes(activeQuest.id)
                  ? '퀘스트 클리어! (완료됨)'
                  : '퀘스트 완료 체크'}
              </span>
            </button>
          </div>

          {/* Meaning & Formula Box */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-2 select-text">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                핵심 의미
              </span>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {activeQuest.meaning}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                접속 공식 (Formula)
              </span>
              <p className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800/40 mt-1">
                {activeQuest.formula}
              </p>
            </div>
          </div>

          {/* 2 Practical Examples */}
          <div className="space-y-3 select-text">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              실전 N2 기출 변형 예문
            </h4>

            {activeQuest.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/70 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400">
                    예문 {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSpeak(ex.jp)}
                    className="text-xs text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> 음성 듣기
                  </button>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {ex.jp}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {ex.reading}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {ex.kr}
                </p>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-100 dark:border-slate-700 mt-2">
                  🔍 뉘앙스 포인트: {ex.nuance}
                </p>
              </div>
            ))}
          </div>

          {/* Pitfall Alert Box */}
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs select-text">
              <span className="font-extrabold text-amber-900 dark:text-amber-300">
                시험에 나오는 N2 함정 포인트!
              </span>
              <p className="text-amber-800 dark:text-amber-200/90 mt-1 leading-relaxed">
                {activeQuest.pitfall}
              </p>
            </div>
          </div>

          {/* YouTube Video Search Link (Explicit Requirement: 유하다요, 해커스 N2 문법 링크) */}
          <div className="pt-2">
            <a
              href={activeQuest.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-between text-xs sm:text-sm font-bold transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center font-black text-xs">
                  ▶
                </span>
                <span>유튜브 10분 강의 보기 ({activeQuest.youtubeKeyword})</span>
              </div>
              <ExternalLink className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
};
