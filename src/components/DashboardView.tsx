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
  TrendingUp,
  Map,
  Check,
  ChevronRight,
  ChevronLeft,
  PieChart
} from 'lucide-react';
import { ActiveTab } from '../types';
import { DAILY_MOTIVATIONS } from '../data/praise';
import { FIFTY_DAYS_SYLLABUS } from '../data/curriculumData';
import { soundService } from '../utils/sound';

interface DashboardViewProps {
  examDate: string;
  streakDays: number;
  currentDay: number;
  completedDays: number[];
  currentDayTitle: string;
  onSelectDay: (day: number) => void;
  onOpenDaySelector: () => void;
  onCompleteCurrentDay: () => void;
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
  currentDay,
  completedDays,
  currentDayTitle,
  onSelectDay,
  onOpenDaySelector,
  onCompleteCurrentDay,
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

  // 50-Day Curriculum Overall Progress & Circular Gauge metrics
  const fiftyDaysCompletedCount = completedDays.length;
  const fiftyDaysPercent = Math.min(100, Math.round((fiftyDaysCompletedCount / 50) * 100));
  const remainingDaysCount = Math.max(0, 50 - fiftyDaysCompletedCount);

  // 4 Stages breakdown
  const stage1Completed = completedDays.filter((d) => d >= 1 && d <= 10).length;
  const stage2Completed = completedDays.filter((d) => d >= 11 && d <= 25).length;
  const stage3Completed = completedDays.filter((d) => d >= 26 && d <= 40).length;
  const stage4Completed = completedDays.filter((d) => d >= 41 && d <= 50).length;

  const stage1Percent = Math.round((stage1Completed / 10) * 100);
  const stage2Percent = Math.round((stage2Completed / 15) * 100);
  const stage3Percent = Math.round((stage3Completed / 15) * 100);
  const stage4Percent = Math.round((stage4Completed / 10) * 100);

  // SVG Circular progress meter parameters (r = 54 -> circumference ~ 339.29)
  const circleRadius = 54;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (fiftyDaysPercent / 100) * circleCircumference;

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

      {/* 50-Day Full Curriculum Progress & RoadMap Graph */}
      <section className="bg-white dark:bg-slate-850 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                <Map className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                50일 완성 N2 합격 로드맵 & 전체 진도율 그래프
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              공식 출제 기준 50일 커리큘럼 완주 현황 및 일차별 진행률
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={onOpenDaySelector}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>50일 목차 전체보기</span>
            </button>
          </div>
        </div>

        {/* 50-Day Circular Progress Chart & Milestone Overview */}
        <div className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-emerald-950/20 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: Circular Donut Gauge */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
                  <defs>
                    <linearGradient id="fiftyDayDonutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                  {/* Background Track Circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={circleRadius}
                    className="text-slate-200/80 dark:text-slate-800"
                    strokeWidth="11"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  {/* Progress Gauge Circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={circleRadius}
                    stroke="url(#fiftyDayDonutGradient)"
                    strokeWidth="11"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Center Content in Circular Graph */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    전체 진도율
                  </span>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                      {fiftyDaysPercent}
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400 ml-0.5">%</span>
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 mt-0.5 tabular-nums">
                    {fiftyDaysCompletedCount} / 50일 완료
                  </span>
                </div>
              </div>

              {/* Status Badge under the Circular Ring */}
              <div className="mt-2 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-2xs">
                  {fiftyDaysPercent === 100 ? (
                    <>🏆 50일 커리큘럼 올클리어! 합격!</>
                  ) : fiftyDaysPercent >= 80 ? (
                    <>🔥 파이널 완성 직전! 끝까지 파이팅!</>
                  ) : fiftyDaysPercent >= 50 ? (
                    <>⚡ 절반 돌파! 합격선 도달 중!</>
                  ) : fiftyDaysPercent >= 20 ? (
                    <>🚀 순항 중! 페이스 유지하세요!</>
                  ) : fiftyDaysCompletedCount > 0 ? (
                    <>🌱 꾸준한 첫 걸음! 응원합니다!</>
                  ) : (
                    <>🎯 Day 1부터 오늘 시작해보세요!</>
                  )}
                </span>
              </div>
            </div>

            {/* Right: Key Stats & 4-Stage Breakdown */}
            <div className="flex-1 w-full space-y-3">
              {/* Quick Stat Chips */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white dark:bg-slate-800/90 rounded-xl p-2.5 border border-slate-200/70 dark:border-slate-700/70 shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500">완료 일차</div>
                  <div className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {fiftyDaysCompletedCount}일
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/90 rounded-xl p-2.5 border border-slate-200/70 dark:border-slate-700/70 shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500">남은 일차</div>
                  <div className="text-base sm:text-lg font-black text-slate-700 dark:text-slate-300 tabular-nums">
                    {remainingDaysCount}일
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-800/90 rounded-xl p-2.5 border border-slate-200/70 dark:border-slate-700/70 shadow-2xs">
                  <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500">현재 학습</div>
                  <div className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400 tabular-nums">
                    Day {currentDay}
                  </div>
                </div>
              </div>

              {/* 4 Stages Progress Bars */}
              <div className="bg-white dark:bg-slate-800/85 rounded-xl p-3 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    50일 4단계 학습 구간별 진도율
                  </span>
                  <span className="text-[10px] text-slate-400">단계별 완주 현황</span>
                </div>

                {/* Stage 1 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      1단계: 기초 체력 (Day 1~10)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums text-[10px]">
                      {stage1Completed}/10일 ({stage1Percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${stage1Percent}%` }}
                    />
                  </div>
                </div>

                {/* Stage 2 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      2단계: 실력 도약 (Day 11~25)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums text-[10px]">
                      {stage2Completed}/15일 ({stage2Percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${stage2Percent}%` }}
                    />
                  </div>
                </div>

                {/* Stage 3 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      3단계: 심화 완성 (Day 26~40)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums text-[10px]">
                      {stage3Completed}/15일 ({stage3Percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{ width: `${stage3Percent}%` }}
                    />
                  </div>
                </div>

                {/* Stage 4 */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      4단계: 파이널 실전 (Day 41~50)
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums text-[10px]">
                      {stage4Completed}/10일 ({stage4Percent}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${stage4Percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Linear Progress Bar with Milestone Markers */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                마일스톤 완주 로드맵
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums text-xs">
                {fiftyDaysCompletedCount} / 50일 ({fiftyDaysPercent}%)
              </span>
            </div>

            <div className="relative w-full h-3 bg-slate-200/90 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(fiftyDaysPercent, 2)}%` }}
              />
            </div>

            {/* Milestone Step Labels */}
            <div className="grid grid-cols-4 text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
              <div className={`text-left ${fiftyDaysCompletedCount >= 10 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                ● Day 10 (기초체력)
              </div>
              <div className={`text-center ${fiftyDaysCompletedCount >= 25 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                ● Day 25 (하프마라톤)
              </div>
              <div className={`text-center ${fiftyDaysCompletedCount >= 40 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                ● Day 40 (실전고득점)
              </div>
              <div className={`text-right ${fiftyDaysCompletedCount >= 50 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
                🏆 Day 50 (합격골인!)
              </div>
            </div>
          </div>
        </div>

        {/* Current Active Day Control Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
              D{currentDay}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  현재 학습 중인 일차
                </span>
                {completedDays.includes(currentDay) && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-600 text-white flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> 완료됨
                  </span>
                )}
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-1">
                Day {currentDay} · {currentDayTitle}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCompleteCurrentDay}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{completedDays.includes(currentDay) ? 'Day 학습 재완료' : '오늘 Day 학습 완료'}</span>
            </button>

            {currentDay < 50 && (
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  onSelectDay(currentDay + 1);
                }}
                className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 transition-colors cursor-pointer"
              >
                <span>다음 Day ({currentDay + 1})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 50-Day Grid Matrix: Click any day to jump */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              50일 전과정 일차별 타일 (클릭하여 해당 일차로 바로 이동)
            </span>
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> 완료
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full ring-2 ring-emerald-500 bg-emerald-100 inline-block" /> 학습 중
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> 점검일
              </span>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
            {Array.from({ length: 50 }, (_, i) => i + 1).map((dayNum) => {
              const isDone = completedDays.includes(dayNum);
              const isCurrent = dayNum === currentDay;
              const isMilestone = [10, 20, 25, 30, 40, 50].includes(dayNum);

              return (
                <button
                  key={dayNum}
                  type="button"
                  title={`Day ${dayNum} (${FIFTY_DAYS_SYLLABUS[dayNum - 1]?.theme || ''})`}
                  onClick={() => {
                    soundService.playClick();
                    onSelectDay(dayNum);
                  }}
                  className={`h-9 sm:h-10 rounded-xl text-xs font-extrabold flex flex-col items-center justify-center transition-all relative cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-md scale-105 z-10'
                      : isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 hover:bg-emerald-200'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50 hover:border-slate-400'
                  }`}
                >
                  <span className="text-[11px] tabular-nums">{dayNum}</span>
                  {isDone ? (
                    <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 -mt-0.5 stroke-[3]" />
                  ) : isMilestone ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 -mt-0.5" />
                  ) : null}
                </button>
              );
            })}
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
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Day {currentDay} 단어</span>
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
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Day {currentDay} 문법</span>
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
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Day {currentDay} 독해</span>
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
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Day {currentDay} 확인퀴즈</span>
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
