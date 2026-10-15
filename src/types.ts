export type ActiveTab = 'dashboard' | 'vocab' | 'grammar' | 'reading' | 'quiz' | 'schedule';

export interface KanjiDetail {
  character: string;   // 한자 (예: 把)
  krMeaning: string;   // 한자 뜻/음 (예: 잡을 파)
  onyomi: string;      // 음독 (예: ハ)
  kunyomi: string;     // 훈독 (예: と・る, 없으면 '-')
  radical: string;     // 부수 (예: 扌 [재방변 / 손 수])
}

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
  kanjiDetails?: KanjiDetail[];
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

export interface DayMeta {
  day: number;
  title: string;
  theme: string;
  grammarSummary: string;
  vocabCount: number;
  grammarCount: number;
  quizCount: number;
}

export interface DayCurriculum {
  day: number;
  title: string;
  theme: string;
  grammarSummary: string;
  words: WordItem[];
  grammar: GrammarQuest[];
  reading: ReadingPassage[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
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
