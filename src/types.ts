export type ActiveTab = 'dashboard' | 'vocab' | 'grammar' | 'reading' | 'quiz' | 'schedule';

export interface WordItem {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
  exampleJp: string;
  exampleReading: string;
  exampleKr: string;
  slot: 'morning' | 'evening'; // 25 morning (출근길), 25 evening (퇴근길)
  tip?: string;
}

export interface GrammarQuest {
  id: string;
  title: string;
  category: '수수동' | '경어' | '접속사' | '기능어' | '추측/당위';
  meaning: string;
  formula: string;
  examples: {
    jp: string;
    reading: string;
    kr: string;
    nuance: string;
  }[];
  pitfall: string;
  youtubeKeyword: string;
  youtubeUrl: string;
  estimatedMinutes: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  recommendedSeconds: number; // e.g. 150 seconds (2분 30초)
  passage: string;
  passageFurigana?: string;
  keywords: { word: string; meaning: string }[];
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  tip: string;
}

export interface QuizQuestion {
  id: string;
  category: '어휘' | '문법' | '독해/용법';
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  hint: string;
}

export interface RoutineTask {
  id: string;
  timeSlot: string;
  title: string;
  description: string;
  tag: string;
  duration: string;
  targetTab?: ActiveTab;
}

export interface UserProgress {
  completedWordIds: string[];
  completedGrammarIds: string[];
  completedReadingIds: string[];
  completedQuizIds: string[];
  completedRoutineIds: string[];
  lastCompletedDate: string;
  streakDays: number;
  totalXp: number;
  customExamDate?: string;
}
