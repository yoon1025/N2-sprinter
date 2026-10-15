/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { VocabView } from './components/VocabView';
import { GrammarView } from './components/GrammarView';
import { ReadingView } from './components/ReadingView';
import { QuizView } from './components/QuizView';
import { ScheduleView } from './components/ScheduleView';
import { CoachModal } from './components/CoachModal';
import { NotificationModal } from './components/NotificationModal';
import { InAppNotificationBanner } from './components/InAppNotificationBanner';
import { DaySelectorModal } from './components/DaySelectorModal';

import { getDayCurriculum, FIFTY_DAYS_SYLLABUS } from './data/curriculumData';
import { getRandomPraise, PraiseQuote } from './data/praise';
import { soundService } from './utils/sound';
import {
  AlarmSetting,
  getStoredAlarms,
  saveStoredAlarms,
  checkNotificationPermission,
  sendLocalNotification
} from './utils/notification';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [examDate, setExamDate] = useState<string>('2026-12-06');
  const [streakDays, setStreakDays] = useState<number>(1);

  // 50-Day Curriculum State
  const [currentDay, setCurrentDay] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('n2_current_day');
      const parsed = saved ? parseInt(saved, 10) : 1;
      return parsed >= 1 && parsed <= 50 ? parsed : 1;
    } catch {
      return 1;
    }
  });

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('n2_completed_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDaySelectorOpen, setIsDaySelectorOpen] = useState<boolean>(false);

  // Completed items states
  const [completedWordIds, setCompletedWordIds] = useState<string[]>([]);
  const [completedGrammarIds, setCompletedGrammarIds] = useState<string[]>([]);
  const [completedReadingIds, setCompletedReadingIds] = useState<string[]>([]);
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [completedRoutineIds, setCompletedRoutineIds] = useState<string[]>([]);

  // Active coach praise toast
  const [currentPraise, setCurrentPraise] = useState<PraiseQuote | null>(null);

  // Commute Notification Scheduler State
  const [alarms, setAlarms] = useState<AlarmSetting[]>(getStoredAlarms);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | 'unsupported'>('default');
  const [inAppNotification, setInAppNotification] = useState<{
    title: string;
    message: string;
    targetTab?: ActiveTab;
  } | null>(null);

  // Track last fired alarm key to prevent duplicate triggers in the same minute
  const lastFiredMinuteRef = useRef<string>('');

  // Check notification permission on mount
  useEffect(() => {
    setPermissionStatus(checkNotificationPermission());
  }, []);

  const refreshPermission = () => {
    setPermissionStatus(checkNotificationPermission());
  };

  const handleUpdateAlarms = (newAlarms: AlarmSetting[]) => {
    setAlarms(newAlarms);
    saveStoredAlarms(newAlarms);
  };

  // Local Alarm Scheduler: Checks every 20 seconds
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMins = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMins}`;

      // Check if we already alerted in this exact minute
      if (lastFiredMinuteRef.current === currentTimeStr) {
        return;
      }

      alarms.forEach((alarm) => {
        if (alarm.enabled && alarm.time === currentTimeStr) {
          lastFiredMinuteRef.current = currentTimeStr;

          // Determine target tab for quick navigation
          let targetTab: ActiveTab = 'dashboard';
          if (alarm.category === 'morning' || alarm.category === 'evening') {
            targetTab = 'vocab';
          } else if (alarm.category === 'lunch') {
            targetTab = 'grammar';
          } else if (alarm.category === 'night') {
            targetTab = 'reading';
          }

          // 1. Send system push notification (if permitted)
          sendLocalNotification(alarm.title, alarm.message);

          // 2. Trigger in-app alert banner
          setInAppNotification({
            title: alarm.title,
            message: alarm.message,
            targetTab
          });
        }
      });
    };

    const interval = setInterval(checkSchedule, 20000);
    // Initial check on mount
    checkSchedule();

    return () => clearInterval(interval);
  }, [alarms]);

  // Helper date strings
  const getTodayDateStr = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getYesterdayDateStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Record daily study activity and increment streak
  const recordStudyActivity = () => {
    const todayStr = getTodayDateStr();
    const yesterdayStr = getYesterdayDateStr();
    const lastDate = localStorage.getItem('n2_last_studied_date');

    if (lastDate !== todayStr) {
      let nextStreak = 1;
      if (lastDate === yesterdayStr) {
        nextStreak = streakDays + 1;
      } else {
        nextStreak = 1;
      }
      setStreakDays(nextStreak);
      localStorage.setItem('n2_streak_days', String(nextStreak));
      localStorage.setItem('n2_last_studied_date', todayStr);
    }
  };

  // Load persisted progress on mount
  useEffect(() => {
    try {
      const savedDark = localStorage.getItem('n2_dark_mode');
      if (savedDark === 'true') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }

      const savedDate = localStorage.getItem('n2_exam_date');
      if (savedDate) setExamDate(savedDate);

      // Manage streak based on calendar dates
      const todayStr = getTodayDateStr();
      const yesterdayStr = getYesterdayDateStr();
      const savedLastStudied = localStorage.getItem('n2_last_studied_date');
      const savedStreak = localStorage.getItem('n2_streak_days');

      if (savedLastStudied) {
        if (savedLastStudied === todayStr || savedLastStudied === yesterdayStr) {
          const parsed = parseInt(savedStreak || '1', 10);
          setStreakDays(parsed > 0 ? parsed : 1);
        } else {
          // More than 1 day skipped -> reset to 1
          setStreakDays(1);
          localStorage.setItem('n2_streak_days', '1');
        }
      } else {
        // First-time learner starting fresh
        setStreakDays(1);
        localStorage.setItem('n2_streak_days', '1');
      }

      const savedWords = localStorage.getItem('n2_completed_words');
      if (savedWords) setCompletedWordIds(JSON.parse(savedWords));

      const savedGrammar = localStorage.getItem('n2_completed_grammar');
      if (savedGrammar) setCompletedGrammarIds(JSON.parse(savedGrammar));

      const savedReading = localStorage.getItem('n2_completed_reading');
      if (savedReading) setCompletedReadingIds(JSON.parse(savedReading));

      const savedQuiz = localStorage.getItem('n2_completed_quiz');
      if (savedQuiz) setCompletedQuizIds(JSON.parse(savedQuiz));

      const savedRoutines = localStorage.getItem('n2_completed_routines');
      if (savedRoutines) setCompletedRoutineIds(JSON.parse(savedRoutines));
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('n2_current_day', String(currentDay));
  }, [currentDay]);

  useEffect(() => {
    localStorage.setItem('n2_completed_days', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('n2_completed_words', JSON.stringify(completedWordIds));
  }, [completedWordIds]);

  useEffect(() => {
    localStorage.setItem('n2_completed_grammar', JSON.stringify(completedGrammarIds));
  }, [completedGrammarIds]);

  useEffect(() => {
    localStorage.setItem('n2_completed_reading', JSON.stringify(completedReadingIds));
  }, [completedReadingIds]);

  useEffect(() => {
    localStorage.setItem('n2_completed_quiz', JSON.stringify(completedQuizIds));
  }, [completedQuizIds]);

  useEffect(() => {
    localStorage.setItem('n2_completed_routines', JSON.stringify(completedRoutineIds));
  }, [completedRoutineIds]);

  // Dark mode toggle
  const handleToggleDarkMode = () => {
    soundService.playClick();
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('n2_dark_mode', String(nextDark));
  };

  const handleUpdateExamDate = (newDate: string) => {
    setExamDate(newDate);
    localStorage.setItem('n2_exam_date', newDate);
  };

  // Trigger coach praise & record study date
  const triggerPraise = () => {
    soundService.playCheck();
    recordStudyActivity();
    const praise = getRandomPraise();
    setCurrentPraise(praise);
  };

  // Word check toggle
  const handleToggleWordCheck = (wordId: string) => {
    const isAlready = completedWordIds.includes(wordId);
    if (!isAlready) {
      setCompletedWordIds((prev) => [...prev, wordId]);
      triggerPraise();
    } else {
      soundService.playClick();
      setCompletedWordIds((prev) => prev.filter((id) => id !== wordId));
    }
  };

  // Grammar quest toggle
  const handleToggleGrammarCheck = (questId: string) => {
    const isAlready = completedGrammarIds.includes(questId);
    if (!isAlready) {
      setCompletedGrammarIds((prev) => [...prev, questId]);
      triggerPraise();
    } else {
      soundService.playClick();
      setCompletedGrammarIds((prev) => prev.filter((id) => id !== questId));
    }
  };

  // Reading check toggle
  const handleToggleReadingCheck = (readingId: string) => {
    const isAlready = completedReadingIds.includes(readingId);
    if (!isAlready) {
      setCompletedReadingIds((prev) => [...prev, readingId]);
      triggerPraise();
    } else {
      soundService.playClick();
      setCompletedReadingIds((prev) => prev.filter((id) => id !== readingId));
    }
  };

  // Routine check toggle
  const handleToggleRoutineCheck = (routineId: string) => {
    const isAlready = completedRoutineIds.includes(routineId);
    if (!isAlready) {
      setCompletedRoutineIds((prev) => [...prev, routineId]);
      triggerPraise();
    } else {
      soundService.playClick();
      setCompletedRoutineIds((prev) => prev.filter((id) => id !== routineId));
    }
  };

  // Current day data from 50-day curriculum
  const currentDayData = getDayCurriculum(currentDay);

  // Mark current day completed
  const handleCompleteCurrentDay = () => {
    soundService.playFanfare();
    recordStudyActivity();
    if (!completedDays.includes(currentDay)) {
      setCompletedDays((prev) => [...prev, currentDay]);
    }
    const isLastDay = currentDay >= 50;
    setCurrentPraise({
      title: isLastDay ? '🏆 N2 50일 커리큘럼 대망의 완주!' : `🎉 Day ${currentDay} 완주 성공!`,
      message: isLastDay
        ? '50일 완성 N2 공식 출제 기준을 모두 정복하셨습니다! 시험장에서 최고의 실력을 발휘하세요!'
        : `Day ${currentDay}의 모든 훈련을 성공적으로 마쳤습니다!`,
      coachNote: isLastDay
        ? '이제 약점 퀴즈와 단어를 훑어보며 최종 점검하세요.'
        : `내일은 Day ${currentDay + 1} (${FIFTY_DAYS_SYLLABUS[currentDay]?.theme || '새로운 파트'})이 기다리고 있습니다! 다음 Day로 넘어가볼까요?`
    });
  };

  // Complete Quiz handler
  const handleCompleteQuiz = (correctCount: number, total: number) => {
    recordStudyActivity();
    const praise = getRandomPraise();
    setCurrentPraise({
      ...praise,
      title: correctCount === total ? `Day ${currentDay} 퀴즈 100점 만점! 🏆` : `Day ${currentDay} 확인 퀴즈 완료! 🎯`,
      message: `${total}문제 중 ${correctCount}문제 정답! 뇌에 N2 기출 공식이 완벽히 새겨졌습니다.`
    });
    const dayQuizIds = currentDayData.quiz.map((q) => q.id);
    setCompletedQuizIds((prev) => Array.from(new Set([...prev, ...dayQuizIds])));
  };

  // Reset words slot for current day
  const handleResetSlot = (slot: 'morning' | 'evening') => {
    soundService.playClick();
    const slotWordIds = currentDayData.words.filter((w) => w.slot === slot).map((w) => w.id);
    setCompletedWordIds((prev) => prev.filter((id) => !slotWordIds.includes(id)));
  };

  // Reset today's checklist
  const handleResetToday = () => {
    if (window.confirm('현재 일차의 학습 체크리스트와 스트릭을 초기화하시겠습니까?')) {
      soundService.playClick();
      const currentDayWordIds = currentDayData.words.map((w) => w.id);
      const currentDayGrammarIds = currentDayData.grammar.map((g) => g.id);
      const currentDayReadingIds = currentDayData.reading.map((r) => r.id);
      const currentDayQuizIds = currentDayData.quiz.map((q) => q.id);

      setCompletedWordIds((prev) => prev.filter((id) => !currentDayWordIds.includes(id)));
      setCompletedGrammarIds((prev) => prev.filter((id) => !currentDayGrammarIds.includes(id)));
      setCompletedReadingIds((prev) => prev.filter((id) => !currentDayReadingIds.includes(id)));
      setCompletedQuizIds((prev) => prev.filter((id) => !currentDayQuizIds.includes(id)));
      setStreakDays(1);
      localStorage.setItem('n2_streak_days', '1');
      localStorage.removeItem('n2_last_studied_date');
    }
  };

  // Today's missions for dashboard based on active Day
  const morningWords = currentDayData.words.filter((w) => w.slot === 'morning');
  const eveningWords = currentDayData.words.filter((w) => w.slot === 'evening');

  const morningWordsDone = morningWords.length > 0 && morningWords.every((w) =>
    completedWordIds.includes(w.id)
  );
  const eveningWordsDone = eveningWords.length > 0 && eveningWords.every((w) =>
    completedWordIds.includes(w.id)
  );
  const grammarDone = currentDayData.grammar.length > 0 && currentDayData.grammar.every((g) =>
    completedGrammarIds.includes(g.id)
  );
  const readingDone = currentDayData.reading.length > 0 && currentDayData.reading.every((r) =>
    completedReadingIds.includes(r.id)
  );
  const quizDone = currentDayData.quiz.length > 0 && currentDayData.quiz.every((q) =>
    completedQuizIds.includes(q.id)
  );

  const todayMissions = [
    {
      id: 'mission-m-vocab',
      title: `출근길 지하철 단어 ${morningWords.length}개 암기`,
      subtext: `출근 이동 시간 동안 Day ${currentDay} 핵심 어휘 플래시카드 완독`,
      category: '어휘',
      completed: morningWordsDone,
      targetTab: 'vocab' as ActiveTab
    },
    {
      id: 'mission-grammar',
      title: `점심시간 10분 문법 퀘스트 정복`,
      subtext: `Day ${currentDay} 필수 문법 (${currentDayData.grammarSummary}) 공식 이해 & 예문 독파`,
      category: '문법',
      completed: grammarDone,
      targetTab: 'grammar' as ActiveTab
    },
    {
      id: 'mission-e-vocab',
      title: `퇴근길 지하철 단어 ${eveningWords.length}개 암기 & 복습`,
      subtext: `퇴근 이동 시간 동안 ${eveningWords.length}개 추가 암기 (Day ${currentDay} 단어 완주)`,
      category: '어휘',
      completed: eveningWordsDone,
      targetTab: 'vocab' as ActiveTab
    },
    {
      id: 'mission-reading',
      title: `취침 전 단문 독해 1지문 3분 스피드런`,
      subtext: `질문 먼저 읽고 정답 키워드 찾아내기 훈련`,
      category: '독해',
      completed: readingDone,
      targetTab: 'reading' as ActiveTab
    },
    {
      id: 'mission-quiz',
      title: `Day ${currentDay} 기출 변형 확인 테스트 (${currentDayData.quiz.length}문제)`,
      subtext: `가벼운 확인 퀴즈로 오늘 배운 내용 즉시 확인 및 점검`,
      category: '퀴즈',
      completed: quizDone,
      targetTab: 'quiz' as ActiveTab
    }
  ];

  const completedMissionCount = todayMissions.filter((m) => m.completed).length;
  const overallTodayProgress = Math.round((completedMissionCount / todayMissions.length) * 100);

  const handleToggleMission = (missionId: string, targetTab: ActiveTab) => {
    if (missionId === 'mission-m-vocab') {
      const morningIds = morningWords.map((w) => w.id);
      const isAllDone = morningIds.every((id) => completedWordIds.includes(id));
      if (isAllDone) {
        setCompletedWordIds((prev) => prev.filter((id) => !morningIds.includes(id)));
      } else {
        setCompletedWordIds((prev) => Array.from(new Set([...prev, ...morningIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-grammar') {
      const gIds = currentDayData.grammar.map((g) => g.id);
      const isAllDone = gIds.every((id) => completedGrammarIds.includes(id));
      if (isAllDone) {
        setCompletedGrammarIds((prev) => prev.filter((id) => !gIds.includes(id)));
      } else {
        setCompletedGrammarIds((prev) => Array.from(new Set([...prev, ...gIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-e-vocab') {
      const eveningIds = eveningWords.map((w) => w.id);
      const isAllDone = eveningIds.every((id) => completedWordIds.includes(id));
      if (isAllDone) {
        setCompletedWordIds((prev) => prev.filter((id) => !eveningIds.includes(id)));
      } else {
        setCompletedWordIds((prev) => Array.from(new Set([...prev, ...eveningIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-reading') {
      const rIds = currentDayData.reading.map((r) => r.id);
      const isAllDone = rIds.every((id) => completedReadingIds.includes(id));
      if (isAllDone) {
        setCompletedReadingIds((prev) => prev.filter((id) => !rIds.includes(id)));
      } else {
        setCompletedReadingIds((prev) => Array.from(new Set([...prev, ...rIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-quiz') {
      const qIds = currentDayData.quiz.map((q) => q.id);
      const isAllDone = qIds.every((id) => completedQuizIds.includes(id));
      if (isAllDone) {
        setCompletedQuizIds((prev) => prev.filter((id) => !qIds.includes(id)));
      } else {
        setCompletedQuizIds((prev) => Array.from(new Set([...prev, ...qIds])));
        triggerPraise();
      }
    }
  };

  const hasActiveAlarms = alarms.some((a) => a.enabled);

  // Current day statistics counts
  const currentDayCompletedWords = completedWordIds.filter((id) => currentDayData.words.some((w) => w.id === id)).length;
  const currentDayCompletedGrammar = completedGrammarIds.filter((id) => currentDayData.grammar.some((g) => g.id === id)).length;
  const currentDayCompletedReading = completedReadingIds.filter((id) => currentDayData.reading.some((r) => r.id === id)).length;
  const currentDayCompletedQuiz = completedQuizIds.filter((id) => currentDayData.quiz.some((q) => q.id === id)).length;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        streakDays={streakDays}
        examDate={examDate}
        onUpdateExamDate={handleUpdateExamDate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onResetToday={handleResetToday}
        onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
        hasActiveAlarms={hasActiveAlarms}
        currentDay={currentDay}
        onOpenDaySelector={() => setIsDaySelectorOpen(true)}
        onChangeDay={(newDay) => setCurrentDay(newDay)}
        isCurrentDayCompleted={completedDays.includes(currentDay)}
        dayTitle={currentDayData.title}
      />

      {/* Main Content Area: Thumb & Viewport ergonomics */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-24">
        {activeTab === 'dashboard' && (
          <DashboardView
            examDate={examDate}
            streakDays={streakDays}
            currentDay={currentDay}
            completedDays={completedDays}
            currentDayTitle={currentDayData.title}
            onSelectDay={(newDay) => setCurrentDay(newDay)}
            onOpenDaySelector={() => setIsDaySelectorOpen(true)}
            onCompleteCurrentDay={handleCompleteCurrentDay}
            completedWordsCount={currentDayCompletedWords}
            totalWordsCount={currentDayData.words.length}
            completedGrammarCount={currentDayCompletedGrammar}
            totalGrammarCount={currentDayData.grammar.length}
            completedReadingCount={currentDayCompletedReading}
            totalReadingCount={currentDayData.reading.length}
            completedQuizCount={currentDayCompletedQuiz}
            totalQuizCount={currentDayData.quiz.length}
            completedRoutineCount={completedRoutineIds.length}
            totalRoutineCount={4}
            onNavigateTab={setActiveTab}
            onCheckItem={() => triggerPraise()}
            todayMissions={todayMissions}
            onToggleMission={handleToggleMission}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabView
            words={currentDayData.words}
            completedWordIds={completedWordIds}
            onToggleWordCheck={handleToggleWordCheck}
            onResetSlot={handleResetSlot}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarView
            quests={currentDayData.grammar}
            completedGrammarIds={completedGrammarIds}
            onToggleGrammarCheck={handleToggleGrammarCheck}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingView
            passages={currentDayData.reading}
            completedReadingIds={completedReadingIds}
            onToggleReadingCheck={handleToggleReadingCheck}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            questions={currentDayData.quiz}
            completedQuizIds={completedQuizIds}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            completedRoutineIds={completedRoutineIds}
            onToggleRoutineCheck={handleToggleRoutineCheck}
            onNavigateTab={setActiveTab}
            onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
          />
        )}
      </main>

      {/* 50-Day Curriculum RoadMap Picker Modal */}
      <DaySelectorModal
        isOpen={isDaySelectorOpen}
        onClose={() => setIsDaySelectorOpen(false)}
        currentDay={currentDay}
        completedDays={completedDays}
        onSelectDay={(day) => setCurrentDay(day)}
      />

      {/* In-App Alarm Drop-Down Alert Banner */}
      <InAppNotificationBanner
        notification={inAppNotification}
        onClose={() => setInAppNotification(null)}
        onNavigateTab={setActiveTab}
      />

      {/* Commute Notification Alarm Scheduler Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        alarms={alarms}
        onUpdateAlarms={handleUpdateAlarms}
        onShowInAppAlert={(title, message) =>
          setInAppNotification({ title, message, targetTab: 'vocab' })
        }
        permissionStatus={permissionStatus}
        onRefreshPermission={refreshPermission}
      />

      {/* Motivational Coach Praise Popup Toast */}
      <CoachModal
        praise={currentPraise}
        onClose={() => setCurrentPraise(null)}
        triggerConfetti={true}
      />

      {/* Bottom Mobile Tab Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        todayProgress={overallTodayProgress}
      />
    </div>
  );
}
