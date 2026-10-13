import React, { useState, useEffect } from 'react';
import {
  FileText,
  Timer,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { ReadingPassage } from '../types';
import { READING_TIPS } from '../data/reading';
import { soundService } from '../utils/sound';

interface ReadingViewProps {
  passages: ReadingPassage[];
  completedReadingIds: string[];
  onToggleReadingCheck: (passageId: string) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({
  passages,
  completedReadingIds,
  onToggleReadingCheck
}) => {
  const [selectedPassageId, setSelectedPassageId] = useState<string>(passages[0]?.id || '');
  const [showTips, setShowTips] = useState<boolean>(true);
  const [highlightKeywords, setHighlightKeywords] = useState<boolean>(true);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Speedrun timer for reading (default 150 seconds = 2분 30초)
  const currentPassage = passages.find((p) => p.id === selectedPassageId) || passages[0];
  const [timeLeft, setTimeLeft] = useState<number>(currentPassage.recommendedSeconds);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  useEffect(() => {
    // Reset timer and options when passage changes
    setTimeLeft(currentPassage.recommendedSeconds);
    setIsTimerActive(false);
    setUserSelectedOption(null);
    setHasSubmitted(false);
  }, [selectedPassageId, currentPassage.recommendedSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      soundService.playWrong();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  const toggleTimer = () => {
    soundService.playClick();
    setIsTimerActive(!isTimerActive);
  };

  const resetTimer = () => {
    soundService.playClick();
    setIsTimerActive(false);
    setTimeLeft(currentPassage.recommendedSeconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${String(secs).padStart(2, '0')}초`;
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    soundService.playClick();
    setUserSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (userSelectedOption === null) return;
    setHasSubmitted(true);
    setIsTimerActive(false);

    if (userSelectedOption === currentPassage.answerIndex) {
      soundService.playFanfare();
      if (!completedReadingIds.includes(currentPassage.id)) {
        onToggleReadingCheck(currentPassage.id);
      }
    } else {
      soundService.playWrong();
    }
  };

  const isCompleted = completedReadingIds.includes(currentPassage.id);

  return (
    <div className="space-y-4 pb-6">
      {/* 4-Step Subway Reading Strategy Guide Accordion */}
      <section className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-4 sm:p-5 border border-emerald-200 dark:border-emerald-800/60 shadow-xs">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-emerald-900 dark:text-emerald-200">
                지하철 3분 컷: 질문 먼저 읽고 정답 단어 찾기 비법
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                집중력이 짧아도 문제부터 스캔하면 2분 안에 정답이 보입니다
              </p>
            </div>
          </div>
          {showTips ? (
            <ChevronUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          )}
        </button>

        {showTips && (
          <div className="mt-4 pt-3 border-t border-emerald-200/80 dark:border-emerald-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5 animate-in fade-in duration-200">
            {READING_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/80 rounded-2xl p-3 border border-emerald-100 dark:border-emerald-900/40"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                    {tip.step}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {tip.title}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Passage Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
        {passages.map((p, idx) => {
          const isDone = completedReadingIds.includes(p.id);
          const isSelected = selectedPassageId === p.id;

          return (
            <button
              key={p.id}
              onClick={() => {
                soundService.playClick();
                setSelectedPassageId(p.id);
              }}
              className={`px-3.5 py-2 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <span>지문 #{idx + 1} ({p.topic})</span>
              {isDone && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Training Space Card */}
      <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-md space-y-5">
        {/* Header & Speedrun Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                {currentPassage.topic}
              </span>
              <span className="text-xs text-slate-400">권장 풀이 시간 2분 30초</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              {currentPassage.title}
            </h3>
          </div>

          {/* Speedrun Timer Strip */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 dark:bg-slate-900/80 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Timer className="w-4 h-4 text-amber-500" />
            <span
              className={`text-xs sm:text-sm font-black tabular-nums ${
                timeLeft <= 30 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-slate-200'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <button
              onClick={toggleTimer}
              className="px-2 py-1 text-[11px] font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              {isTimerActive ? '일시정지' : '스피드런 시작'}
            </button>
            <button
              onClick={resetTimer}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="시간 리셋"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* STEP 1: Question FIRST! (Prominently highlighted above the passage as per requirement) */}
        <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-300 dark:border-amber-800/60 select-text">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-black text-amber-800 dark:text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> [1단계] 질문 먼저 읽기 (정답 키워드 탐색)
            </span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              무엇을 묻는지 확인 후 아래 본문으로!
            </span>
          </div>
          <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-snug">
            {currentPassage.question}
          </p>
        </div>

        {/* STEP 2: The Passage (With keyword highlight toggle) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              [2단계] 본문 읽기 및 단서 포착
            </span>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setHighlightKeywords(!highlightKeywords);
              }}
              className={`text-xs px-2.5 py-1 rounded-xl border flex items-center gap-1 transition-colors ${
                highlightKeywords
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{highlightKeywords ? '단어 힌트 켜짐' : '단어 힌트 끄기'}</span>
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 select-text text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-loose tracking-wide whitespace-pre-line">
            {currentPassage.passage}
          </div>

          {/* Keywords Glossary */}
          {highlightKeywords && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border border-slate-200 dark:border-slate-700/80">
              <div className="text-[11px] font-bold text-slate-400 mb-2">
                📌 본문 핵심 어휘 및 관용구 힌트:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentPassage.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-medium"
                  >
                    <strong>{kw.word}</strong>: {kw.meaning}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* STEP 3: Options selection */}
        <div className="space-y-2.5 pt-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            [3단계] 정답 선택하기 (4지선다)
          </span>

          <div className="space-y-2">
            {currentPassage.options.map((opt, idx) => {
              const isSelected = userSelectedOption === idx;
              const isCorrectAnswer = idx === currentPassage.answerIndex;

              let style = 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';
              if (isSelected && !hasSubmitted) {
                style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-white ring-2 ring-emerald-500/30';
              } else if (hasSubmitted) {
                if (isCorrectAnswer) {
                  style = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-600 text-emerald-950 dark:text-emerald-100 font-bold';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-100 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer min-h-[44px] ${style}`}
                >
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Submit button or status */}
          {!hasSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={userSelectedOption === null}
              className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all min-h-[48px] ${
                userSelectedOption !== null
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              정답 확인 & 해설 보기
            </button>
          ) : (
            <div className="space-y-3 pt-2 animate-in fade-in duration-200">
              {/* Result banner */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  userSelectedOption === currentPassage.answerIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {userSelectedOption === currentPassage.answerIndex ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <HelpCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  )}
                  <div>
                    <h4 className="text-sm font-extrabold">
                      {userSelectedOption === currentPassage.answerIndex
                        ? '🎉 정답입니다! 정확하게 짚어내셨네요!'
                        : '아쉽습니다! 오답 해설을 꼼꼼히 확인해 보세요.'}
                    </h4>
                    <p className="text-xs">
                      정답: {currentPassage.answerIndex + 1}번
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setHasSubmitted(false);
                    setUserSelectedOption(null);
                    resetTimer();
                  }}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                >
                  다시 풀기
                </button>
              </div>

              {/* Detailed Explanation & Secret Tip */}
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-2 select-text text-xs leading-relaxed">
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">
                    📖 상세 해설:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {currentPassage.explanation}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-emerald-700 dark:text-emerald-300">
                  <span className="font-extrabold">💡 시험 정답 도출 팁: </span>
                  <span>{currentPassage.tip}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Completion Checkbox toggle */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {isCompleted ? '이 지문은 학습 완료되었습니다.' : '학습 후 완료 체크를 눌러주세요.'}
          </span>
          <button
            type="button"
            onClick={() => onToggleReadingCheck(currentPassage.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isCompleted
                ? 'bg-emerald-500 text-white'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? '학습 완료됨' : '지문 완료 체크'}
          </button>
        </div>
      </div>
    </div>
  );
};
