import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  Flame
} from 'lucide-react';
import { QuizQuestion } from '../types';
import { soundService } from '../utils/sound';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  questions: QuizQuestion[];
  completedQuizIds: string[];
  onCompleteQuiz: (correctCount: number, total: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  completedQuizIds,
  onCompleteQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Take all questions for the day
  const quizList = questions.length > 0 ? questions : [];
  const currentQ = quizList[currentIndex] || quizList[0];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowHint(false);
    setIsFinished(false);
  }, [questions]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered

    const updated = { ...selectedAnswers, [currentIndex]: optionIdx };
    setSelectedAnswers(updated);
    setShowHint(false);

    if (optionIdx === currentQ.answerIndex) {
      soundService.playCheck();
    } else {
      soundService.playWrong();
    }
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all
      setIsFinished(true);
      const correctCount = quizList.filter(
        (q, idx) => selectedAnswers[idx] === q.answerIndex
      ).length;

      if (correctCount === quizList.length) {
        soundService.playFanfare();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
      onCompleteQuiz(correctCount, quizList.length);
    }
  };

  const handleRestart = () => {
    soundService.playClick();
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
    setShowHint(false);
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-500">
        문제를 불러오는 중입니다...
      </div>
    );
  }

  const currentAnswer = selectedAnswers[currentIndex];
  const isAnswered = currentAnswer !== undefined;
  const isCorrect = isAnswered && currentAnswer === currentQ.answerIndex;

  const scoreCount = quizList.filter(
    (q, idx) => selectedAnswers[idx] === q.answerIndex
  ).length;

  return (
    <div className="space-y-4 pb-6">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl p-5 shadow-lg border border-purple-400/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-purple-200 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>오늘의 N2 기출 변형 확인 퀴즈</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              핵심 {quizList.length}문제 풀고 합격 자신감 충전!
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black text-amber-300 text-base tabular-nums">
            {currentIndex + 1}/{quizList.length}
          </div>
        </div>

        {/* Mini progress bar */}
        <div className="w-full h-1.5 bg-black/20 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-amber-400 transition-all duration-300"
            style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / quizList.length) * 100}%` }}
          />
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
          {/* Question Category & Text */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
              문제 {currentIndex + 1} · {currentQ.category}
            </span>

            {/* Hint Button */}
            {!isAnswered && (
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setShowHint(!showHint);
                }}
                className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? '힌트 숨기기' : '힌트 보기'}</span>
              </button>
            )}
          </div>

          {/* Hint Card */}
          {showHint && !isAnswered && (
            <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-3 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 animate-in fade-in duration-150">
              💡 <strong>힌트:</strong> {currentQ.hint}
            </div>
          )}

          {/* Question Text */}
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line select-text">
            {currentQ.question}
          </h4>

          {/* 4 Choices */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = currentAnswer === idx;
              const isRightAnswer = idx === currentQ.answerIndex;

              let style = 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200';
              if (isAnswered) {
                if (isRightAnswer) {
                  style = 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
                } else if (isSelected && !isRightAnswer) {
                  style = 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-950 dark:text-rose-100 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer min-h-[48px] ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0">
                      {isRightAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                      {isSelected && !isRightAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Button */}
          {isAnswered && (
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-700 animate-in fade-in duration-200">
              <div
                className={`p-3.5 rounded-2xl border flex items-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 text-rose-900 dark:text-rose-200'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <div className="text-xs">
                  <span className="font-extrabold">
                    {isCorrect ? '정답입니다! 완벽해요!' : '아쉽습니다! 오답 해설을 확인하세요.'}
                  </span>
                  <span className="ml-1 text-slate-500 dark:text-slate-400">
                    (정답: {currentQ.answerIndex + 1}번)
                  </span>
                </div>
              </div>

              {/* Explanation Text */}
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed select-text">
                <span className="font-extrabold text-slate-800 dark:text-slate-200 block mb-1">
                  📖 문제 해설 및 핵심 포인트:
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  {currentQ.explanation}
                </p>
              </div>

              {/* Next Question CTA */}
              <button
                type="button"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer min-h-[48px]"
              >
                <span>
                  {currentIndex < quizList.length - 1 ? '다음 문제 풀기' : '퀴즈 결과 확인하기'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary Card */
        <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              미니 퀴즈 완료
            </span>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {scoreCount === 3
                ? '만점! 3문제 올킬! 💯'
                : scoreCount >= 2
                ? '2문제 정답! 합격 안정권! 👏'
                : '1문제 정답! 복습하면 바로 잡힙니다! 💪'}
            </h4>
            <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mt-2 tabular-nums">
              {scoreCount} / 3 문제 정답
            </p>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 leading-relaxed">
            {scoreCount === 3
              ? '완벽합니다! 오늘 퀴즈에서 다룬 어휘와 문법은 실전 시험장에서도 절대 안 틀릴 거예요.'
              : '틀린 문제의 해설 포인트를 눈에 익혀두세요. 실전 시험에서 똑같은 유형이 반드시 출제됩니다.'}
          </p>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={handleRestart}
              className="flex-1 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> 다시 풀기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
