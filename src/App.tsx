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

import { VOCABULARY_LIST } from './data/words';
import { GRAMMAR_QUESTS } from './data/grammar';
import { READING_PASSAGES } from './data/reading';
import { DAILY_QUIZZES } from './data/quiz';
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

  // Complete Quiz handler
  const handleCompleteQuiz = (correctCount: number, total: number) => {
    recordStudyActivity();
    const praise = getRandomPraise();
    setCurrentPraise({
      ...praise,
      title: correctCount === total ? '퀴즈 100점 만점 돌파! 🏆' : '오늘의 퀴즈 스프린트 완료! 🎯',
      message: `${total}문제 중 ${correctCount}문제 정답! 뇌에 N2 기출 공식이 완벽히 새겨졌습니다.`
    });
    setCompletedQuizIds(['q-01', 'q-02', 'q-03']);
  };

  // Reset words slot
  const handleResetSlot = (slot: 'morning' | 'evening') => {
    soundService.playClick();
    const slotWordIds = VOCABULARY_LIST.filter((w) => w.slot === slot).map((w) => w.id);
    setCompletedWordIds((prev) => prev.filter((id) => !slotWordIds.includes(id)));
  };

  // Reset today's checklist
  const handleResetToday = () => {
    if (window.confirm('오늘의 학습 체크리스트와 스트릭을 1일차로 초기화하시겠습니까?')) {
      soundService.playClick();
      setCompletedWordIds([]);
      setCompletedGrammarIds([]);
      setCompletedReadingIds([]);
      setCompletedQuizIds([]);
      setCompletedRoutineIds([]);
      setStreakDays(1);
      localStorage.setItem('n2_streak_days', '1');
      localStorage.removeItem('n2_last_studied_date');
    }
  };

  // Today's missions for dashboard
  const morningWordsDone = VOCABULARY_LIST.filter((w) => w.slot === 'morning').every((w) =>
    completedWordIds.includes(w.id)
  );
  const eveningWordsDone = VOCABULARY_LIST.filter((w) => w.slot === 'evening').every((w) =>
    completedWordIds.includes(w.id)
  );

  const todayMissions = [
    {
      id: 'mission-m-vocab',
      title: '출근길 지하철 단어 25개 암기',
      subtext: '출근 이동 시간 20분 동안 핵심 단어 25개 플래시카드 완독',
      category: '어휘',
      completed: morningWordsDone || completedWordIds.length >= 25,
      targetTab: 'vocab' as ActiveTab
    },
    {
      id: 'mission-grammar',
      title: '점심시간 10분 문법 퀘스트 1개 정복',
      subtext: '수수동, 경어, 접속사 공식 1개 완벽 이해 & 예문 읽기',
      category: '문법',
      completed: completedGrammarIds.length >= 1,
      targetTab: 'grammar' as ActiveTab
    },
    {
      id: 'mission-e-vocab',
      title: '퇴근길 지하철 단어 25개 암기 & 복습',
      subtext: '퇴근 이동 시간 동안 25개 추가 암기 (하루 50개 달성)',
      category: '어휘',
      completed: eveningWordsDone || completedWordIds.length >= 45,
      targetTab: 'vocab' as ActiveTab
    },
    {
      id: 'mission-reading',
      title: '취침 전 단문 독해 1지문 3분 스피드런',
      subtext: '질문 먼저 읽고 정답 키워드 찾아내기 훈련',
      category: '독해',
      completed: completedReadingIds.length >= 1,
      targetTab: 'reading' as ActiveTab
    },
    {
      id: 'mission-quiz',
      title: '오늘의 N2 기출 변형 3문제 풀기',
      subtext: '가벼운 미니 퀴즈로 오늘 배운 내용 즉시 확인',
      category: '퀴즈',
      completed: completedQuizIds.length >= 3,
      targetTab: 'quiz' as ActiveTab
    }
  ];

  const completedMissionCount = todayMissions.filter((m) => m.completed).length;
  const overallTodayProgress = Math.round((completedMissionCount / todayMissions.length) * 100);

  const handleToggleMission = (missionId: string, targetTab: ActiveTab) => {
    if (missionId === 'mission-m-vocab') {
      const morningIds = VOCABULARY_LIST.filter((w) => w.slot === 'morning').map((w) => w.id);
      const isAllDone = morningIds.every((id) => completedWordIds.includes(id));
      if (isAllDone) {
        setCompletedWordIds((prev) => prev.filter((id) => !morningIds.includes(id)));
      } else {
        setCompletedWordIds((prev) => Array.from(new Set([...prev, ...morningIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-grammar') {
      handleToggleGrammarCheck('g-01');
    } else if (missionId === 'mission-e-vocab') {
      const eveningIds = VOCABULARY_LIST.filter((w) => w.slot === 'evening').map((w) => w.id);
      const isAllDone = eveningIds.every((id) => completedWordIds.includes(id));
      if (isAllDone) {
        setCompletedWordIds((prev) => prev.filter((id) => !eveningIds.includes(id)));
      } else {
        setCompletedWordIds((prev) => Array.from(new Set([...prev, ...eveningIds])));
        triggerPraise();
      }
    } else if (missionId === 'mission-reading') {
      handleToggleReadingCheck('r-01');
    } else if (missionId === 'mission-quiz') {
      const isDone = completedQuizIds.length >= 3;
      if (isDone) {
        setCompletedQuizIds([]);
      } else {
        setCompletedQuizIds(['q-01', 'q-02', 'q-03']);
        triggerPraise();
      }
    }
  };

  const hasActiveAlarms = alarms.some((a) => a.enabled);

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
      />

      {/* Main Content Area: Thumb & Viewport ergonomics */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-24">
        {activeTab === 'dashboard' && (
          <DashboardView
            examDate={examDate}
            streakDays={streakDays}
            completedWordsCount={completedWordIds.length}
            totalWordsCount={VOCABULARY_LIST.length}
            completedGrammarCount={completedGrammarIds.length}
            totalGrammarCount={GRAMMAR_QUESTS.length}
            completedReadingCount={completedReadingIds.length}
            totalReadingCount={READING_PASSAGES.length}
            completedQuizCount={completedQuizIds.length}
            totalQuizCount={3}
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
            words={VOCABULARY_LIST}
            completedWordIds={completedWordIds}
            onToggleWordCheck={handleToggleWordCheck}
            onResetSlot={handleResetSlot}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarView
            quests={GRAMMAR_QUESTS}
            completedGrammarIds={completedGrammarIds}
            onToggleGrammarCheck={handleToggleGrammarCheck}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingView
            passages={READING_PASSAGES}
            completedReadingIds={completedReadingIds}
            onToggleReadingCheck={handleToggleReadingCheck}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            questions={DAILY_QUIZZES}
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
