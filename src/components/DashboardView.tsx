import React from 'react';
import {
  CheckCircle2,
  Circle,
  Flame,
  ArrowRight,
  BookOpen,
  Sparkles,
  FileText,
  HelpCircle,
  Clock,
  Target,
  Trophy,
  BarChart3,
  CalendarCheck,
  TrendingUp
} from 'lucide-react';
import { ActiveTab } from '../types';
import { DAILY_MOTIVATIONS } from '../data/praise';
import { soundService } from '../utils/sound';

interface DashboardViewProps {
  examDate: string;
  streakDays: number;
  completedWordsCount: number;
  totalWordsCount: number;
  completedGrammarCount: number;
  totalGrammarCount: number;
  completedReadingCount: number;
  totalReadingCount: number;
  completedQuizCount: number;
  totalQuizCount: number;
  completedRoutineCount: number;
  totalRoutineCount: number;
  onNavigateTab: (tab: ActiveTab) => void;
  onCheckItem: (source: string) => void;
  todayMissions: {
    id: string;
    title: string;
    subtext: string;
    category: string;
    completed: boolean;
    targetTab: ActiveTab;
  }[];
  onToggleMission: (id: string, targetTab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  examDate,
  streakDays,
  completedWordsCount,
  totalWordsCount,
  completedGrammarCount,
  totalGrammarCount,
  completedReadingCount,
  totalReadingCount,
  completedQuizCount,
  totalQuizCount,
  completedRoutineCount,
  totalRoutineCount,
  onNavigateTab,
  todayMissions,
  onToggleMission
}) => {
  // D-Day calculation
  const calculateDday = (targetStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetStr);
    target.setHours(0, 0, 0, 0);
    const diffMs = target.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  };

  const dDay = calculateDday(examDate);

  // Overall today completion rate
  const totalMissions = todayMissions.length;
  const completedMissions = todayMissions.filter((m) => m.completed).length;
  const overallPercentage = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

  // Random motivation quote of the day based on day of month
  const dayIndex = new Date().getDate() % DAILY_MOTIVATIONS.length;
  const dailyQuote = DAILY_MOTIVATIONS[dayIndex];

  // 5 Learning Domain calculations for today's study volume
  const wordsPercent = totalWordsCount > 0 ? Math.round((completedWordsCount / totalWordsCount) * 100) : 0;
  const grammarPercent = totalGrammarCount > 0 ? Math.round((completedGrammarCount / totalGrammarCount) * 100) : 0;
  const readingPercent = totalReadingCount > 0 ? Math.round((completedReadingCount / totalReadingCount) * 100) : 0;
  const quizPercent = totalQuizCount > 0 ? Math.round((completedQuizCount / totalQuizCount) * 100) : 0;
  const routinePercent = totalRoutineCount > 0 ? Math.round((completedRoutineCount / totalRoutineCount) * 100) : 0;

  const totalPossibleActions = totalWordsCount + totalGrammarCount + totalReadingCount + totalQuizCount + totalRoutineCount;
  const totalCompletedActions = completedWordsCount + completedGrammarCount + completedReadingCount + completedQuizCount + completedRoutineCount;
  const overallActionsPercent = totalPossibleActions > 0 ? Math.round((totalCompletedActions / totalPossibleActions) * 100) : 0;

  const activeCategoriesCount = [
    completedWordsCount > 0,
    completedGrammarCount > 0,
    completedReadingCount > 0,
    completedQuizCount > 0,
    completedRoutineCount > 0
  ].filter(Boolean).length;

  return (
    <div className="space-y-5 pb-6">
      {/* Hero Card: D-Day & Coach Greeting */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-700/50 relative overflow-hidden">
        {/* Soft decorative background glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                초단기 N2 합격 스프린트
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-400/20">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{streakDays === 1 ? '1일차 (오늘 첫 시작!)' : `${streakDays}일 연속 학습 달성`}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 tabular-nums">
                {dDay >= 0 ? `D-${dDay}` : `D+${Math.abs(dDay)}`}
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
            오늘의 쪼개기 미션을 시작해볼까요?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mb-4">
            💬 &quot;{dailyQuote}&quot;
          </p>

          {/* Today's Completion Progress Bar */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-200">오늘 달성률</span>
              <span className="font-extrabold text-emerald-300 tabular-nums text-sm">
                {overallPercentage}% ({completedMissions}/{totalMissions} 미션)
              </span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.max(overallPercentage, 3)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 mt-2 flex items-center justify-between">
              <span>
                {overallPercentage === 100
                  ? '🎉 오늘 목표 100% 올클리어! 완벽합니다!'
                  : overallPercentage >= 50
                  ? '🔥 절반 돌파! 이 페이스로 조금만 더 달려봐요!'
                  : '💡 출퇴근길 10분만 투자해도 30%가 채워집니다.'}
              </span>
              {overallPercentage === 100 && (
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> N2 합격권
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 5-Domain Daily Study Volume & Statistics Card */}
      <section className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <BarChart3 className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                오늘의 하루 학습량 & 5대 영역 통계
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              단어 · 문법 · 독해 · 퀴즈 · 기출 루틴의 하루 실천 분석
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 tabular-nums">
              {activeCategoriesCount}/5개 영역 참여 중 ({totalCompletedActions}개 완료)
            </span>
          </div>
        </div>

        {/* 5 Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {/* 1. 단어 */}
          <button
            type="button"
            onClick={() => onNavigateTab('vocab')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-emerald-500 text-left transition-all group flex flex-col justify-between min-h-[92px]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">단어 50개</span>
              </div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {wordsPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${wordsPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums font-semibold">{completedWordsCount} / {totalWordsCount}개</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
          </button>

          {/* 2. 문법 */}
          <button
            type="button"
            onClick={() => onNavigateTab('grammar')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-sky-500 text-left transition-all group flex flex-col justify-between min-h-[92px]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">10분 문법</span>
              </div>
              <span className="text-xs font-black text-sky-600 dark:text-sky-400 tabular-nums">
                {grammarPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${grammarPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums font-semibold">{completedGrammarCount} / {totalGrammarCount}개</span>
              <span className="text-sky-600 dark:text-sky-400 font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
          </button>

          {/* 3. 독해 */}
          <button
            type="button"
            onClick={() => onNavigateTab('reading')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-amber-500 text-left transition-all group flex flex-col justify-between min-h-[92px]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">단문 독해</span>
              </div>
              <span className="text-xs font-black text-amber-600 dark:text-amber-400 tabular-nums">
                {readingPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${readingPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums font-semibold">{completedReadingCount} / {totalReadingCount}지문</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
          </button>

          {/* 4. 퀴즈 */}
          <button
            type="button"
            onClick={() => onNavigateTab('quiz')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-purple-500 text-left transition-all group flex flex-col justify-between min-h-[92px]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">미니 퀴즈</span>
              </div>
              <span className="text-xs font-black text-purple-600 dark:text-purple-400 tabular-nums">
                {quizPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${quizPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums font-semibold">{completedQuizCount} / {totalQuizCount}문제</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
          </button>

          {/* 5. 기출/루틴 */}
          <button
            type="button"
            onClick={() => onNavigateTab('schedule')}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 hover:border-teal-500 text-left transition-all group flex flex-col justify-between min-h-[92px]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">루틴 & 기출</span>
              </div>
              <span className="text-xs font-black text-teal-600 dark:text-teal-400 tabular-nums">
                {routinePercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${routinePercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="tabular-nums font-semibold">{completedRoutineCount} / {totalRoutineCount}개</span>
              <span className="text-teal-600 dark:text-teal-400 font-bold group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </div>
          </button>
        </div>
      </section>

      {/* 4 Quick Sprint Cards (Shortcut to micro-learning) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            초단기 쪼개기 스프린트
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">자투리 시간 맞춤</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Card 1: Vocab */}
          <button
            onClick={() => onNavigateTab('vocab')}
            className="flex flex-col p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 dark:hover:border-emerald-500 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
              단어 50개
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              출근 25 / 퇴근 25
            </span>
            <div className="mt-auto flex items-center justify-between text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
                {completedWordsCount}/{totalWordsCount} 완료
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Grammar */}
          <button
            onClick={() => onNavigateTab('grammar')}
            className="flex flex-col p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-sky-500 dark:hover:border-sky-500 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
              10분 문법 퀘스트
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              수수동/경어/접속사
            </span>
            <div className="mt-auto flex items-center justify-between text-[11px]">
              <span className="text-sky-600 dark:text-sky-400 font-bold tabular-nums">
                {completedGrammarCount}/{totalGrammarCount} 퀘스트
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Reading */}
          <button
            onClick={() => onNavigateTab('reading')}
            className="flex flex-col p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-amber-500 dark:hover:border-amber-500 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
              단문 독해 스피드런
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              질문 먼저 읽기 비법
            </span>
            <div className="mt-auto flex items-center justify-between text-[11px]">
              <span className="text-amber-600 dark:text-amber-400 font-bold tabular-nums">
                {completedReadingCount}/{totalReadingCount} 지문
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 4: Quiz */}
          <button
            onClick={() => onNavigateTab('quiz')}
            className="flex flex-col p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-purple-500 dark:hover:border-purple-500 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">
              실전 미니 퀴즈
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              기출 변형 3문제
            </span>
            <div className="mt-auto flex items-center justify-between text-[11px]">
              <span className="text-purple-600 dark:text-purple-400 font-bold tabular-nums">
                {completedQuizCount}/{totalQuizCount} 완료
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* Today's Checklist: Checkbox with satisfying visual feedback & praise triggers */}
      <section className="bg-white dark:bg-slate-800/80 rounded-3xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              오늘의 필수 체크리스트
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              체크할 때마다 학습 코치의 칭찬과 응원이 쏟아집니다!
            </p>
          </div>
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 tabular-nums">
            {completedMissions} / {totalMissions}
          </span>
        </div>

        <div className="space-y-2.5">
          {todayMissions.map((mission) => {
            return (
              <div
                key={mission.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  mission.completed
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
                }`}
              >
                {/* Large touch checkbox */}
                <button
                  type="button"
                  onClick={() => onToggleMission(mission.id, mission.targetTab)}
                  className="flex items-center gap-3 flex-1 text-left min-h-[44px] cursor-pointer"
                >
                  <div className="shrink-0">
                    {mission.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-400 dark:text-slate-500 hover:text-emerald-500 transition-colors" />
                    )}
                  </div>

                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {mission.category}
                      </span>
                      <h4
                        className={`text-sm font-semibold truncate ${
                          mission.completed
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {mission.title}
                      </h4>
                    </div>
                    <p
                      className={`text-xs mt-0.5 truncate ${
                        mission.completed
                          ? 'text-slate-400 dark:text-slate-600'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {mission.subtext}
                    </p>
                  </div>
                </button>

                {/* Direct shortcut button */}
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    onNavigateTab(mission.targetTab);
                  }}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 shrink-0 transition-colors"
                >
                  학습하기
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Routine Guide Banner */}
      <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-sky-900 dark:text-sky-200">
              출퇴근 지하철 & 점심 쪼개기 루틴
            </h4>
            <p className="text-[11px] text-sky-700 dark:text-sky-300/80">
              출근 20분(단어) + 점심 10분(문법) + 퇴근 20분(단어 복습)으로 완성!
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('schedule')}
          className="text-xs font-bold text-sky-700 dark:text-sky-300 hover:underline shrink-0 whitespace-nowrap"
        >
          루틴표 보기 &rarr;
        </button>
      </div>
    </div>
  );
};
