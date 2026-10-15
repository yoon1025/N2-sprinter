import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Layers,
  List,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { WordItem } from '../types';
import { speakJapanese } from '../utils/speech';
import { soundService } from '../utils/sound';

interface VocabViewProps {
  words: WordItem[];
  completedWordIds: string[];
  onToggleWordCheck: (wordId: string) => void;
  onResetSlot: (slot: 'morning' | 'evening') => void;
}

export const VocabView: React.FC<VocabViewProps> = ({
  words,
  completedWordIds,
  onToggleWordCheck,
  onResetSlot
}) => {
  const [activeSlot, setActiveSlot] = useState<'morning' | 'evening'>('morning');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [filterMode, setFilterMode] = useState<'all' | 'unlearned' | 'learned'>('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hideFurigana, setHideFurigana] = useState(false);
  const [showKanjiDetail, setShowKanjiDetail] = useState<boolean>(true);
  const [expandedListKanjiIds, setExpandedListKanjiIds] = useState<Record<string, boolean>>({});

  const toggleListKanji = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playClick();
    setExpandedListKanjiIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const morningWords = words.filter((w) => w.slot === 'morning');
  const eveningWords = words.filter((w) => w.slot === 'evening');

  // Filter words by morning/evening
  const slotWords = words.filter((w) => w.slot === activeSlot);

  // Filter by learning status
  const filteredWords = slotWords.filter((w) => {
    const isCompleted = completedWordIds.includes(w.id);
    if (filterMode === 'learned') return isCompleted;
    if (filterMode === 'unlearned') return !isCompleted;
    return true;
  });

  const completedCount = slotWords.filter((w) => completedWordIds.includes(w.id)).length;
  const progressPercent = slotWords.length > 0 ? Math.round((completedCount / slotWords.length) * 100) : 0;

  // Safe current card
  const currentCard = filteredWords[Math.min(cardIndex, Math.max(0, filteredWords.length - 1))];

  const handleNextCard = () => {
    soundService.playClick();
    setIsFlipped(false);
    if (cardIndex < filteredWords.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else {
      setCardIndex(0); // loop
    }
  };

  const handlePrevCard = () => {
    soundService.playClick();
    setIsFlipped(false);
    if (cardIndex > 0) {
      setCardIndex((prev) => prev - 1);
    } else {
      setCardIndex(Math.max(0, filteredWords.length - 1));
    }
  };

  const handleFlipCard = () => {
    soundService.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundService.playClick();
    speakJapanese(text);
  };

  const handleCheckWord = (wordId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onToggleWordCheck(wordId);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Morning / Evening Segmented Control */}
      <div className="bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs flex gap-1">
        <button
          onClick={() => {
            soundService.playClick();
            setActiveSlot('morning');
            setCardIndex(0);
            setIsFlipped(false);
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
            activeSlot === 'morning'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
          }`}
        >
          <span>🌅 출근길 스프린트 ({morningWords.length}개)</span>
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            setActiveSlot('evening');
            setCardIndex(0);
            setIsFlipped(false);
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
            activeSlot === 'evening'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
          }`}
        >
          <span>🚇 퇴근길 스프린트 ({eveningWords.length}개)</span>
        </button>
      </div>

      {/* Progress & Controls Strip */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 dark:text-white">
              {activeSlot === 'morning' ? '출근길 진도율' : '퇴근길 진도율'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold tabular-nums">
              {completedCount} / {slotWords.length} 암기 완료
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* View Mode Toggle: Card vs List */}
            <div className="flex bg-slate-100 dark:bg-slate-700 p-0.5 rounded-lg">
              <button
                onClick={() => {
                  soundService.playClick();
                  setViewMode('card');
                }}
                className={`p-1.5 rounded-md ${
                  viewMode === 'card'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="카드 암기 모드"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundService.playClick();
                  setViewMode('list');
                }}
                className={`p-1.5 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="전체 리스트 모드"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Furigana toggle */}
            <button
              onClick={() => {
                soundService.playClick();
                setHideFurigana(!hideFurigana);
              }}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                hideFurigana
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700 dark:text-amber-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
              title={hideFurigana ? '요미가나 보이기' : '요미가나 가리기 (한자 읽기 훈련)'}
            >
              {hideFurigana ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="text-[10px] hidden sm:inline">
                {hideFurigana ? '한자 테스트중' : '독음 켜짐'}
              </span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              activeSlot === 'morning'
                ? 'bg-emerald-500'
                : 'bg-sky-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-700/50">
          <div className="flex gap-1.5 text-xs">
            <button
              onClick={() => {
                soundService.playClick();
                setFilterMode('all');
                setCardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              전체 ({slotWords.length})
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setFilterMode('unlearned');
                setCardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'unlearned'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              미암기 ({slotWords.length - completedCount})
            </button>
            <button
              onClick={() => {
                soundService.playClick();
                setFilterMode('learned');
                setCardIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                filterMode === 'learned'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              암기완료 ({completedCount})
            </button>
          </div>

          <button
            onClick={() => onResetSlot(activeSlot)}
            className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1"
            title="현재 슬롯 학습 상태 초기화"
          >
            <RotateCcw className="w-3 h-3" />
            초기화
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: Flashcard 3D Mode */}
      {viewMode === 'card' && (
        <div className="space-y-4">
          {filteredWords.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-700">
              <Sparkles className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                선택한 필터의 단어가 없습니다!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                {filterMode === 'unlearned'
                  ? '와우! 이 파트의 모든 단어를 암기 완료했습니다! 🎉'
                  : '전체 단어 목록을 확인해 보세요.'}
              </p>
              <button
                onClick={() => setFilterMode('all')}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
              >
                전체 단어 보기
              </button>
            </div>
          ) : (
            currentCard && (
              <div className="relative">
                {/* Flashcard container */}
                <div
                  onClick={handleFlipCard}
                  className={`w-full min-h-[300px] sm:min-h-[320px] rounded-3xl p-6 sm:p-8 cursor-pointer select-none transition-all duration-300 transform border shadow-lg flex flex-col justify-between ${
                    isFlipped
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-slate-700 shadow-emerald-950/10'
                      : 'bg-white dark:bg-slate-800/95 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 shadow-slate-200/50'
                  }`}
                >
                  {/* Card Header: Slot, POS, Speaker, Check button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {currentCard.slot === 'morning' ? '출근길' : '퇴근길'} · #{cardIndex + 1}/{filteredWords.length}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        {currentCard.partOfSpeech}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio TTS button */}
                      <button
                        type="button"
                        onClick={(e) => handleSpeak(currentCard.kanji, e)}
                        className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        title="원어민 발음 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* Completed checkmark */}
                      <button
                        type="button"
                        onClick={(e) => handleCheckWord(currentCard.id, e)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          completedWordIds.includes(currentCard.id)
                            ? 'bg-emerald-500 text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-emerald-500'
                        }`}
                        title="암기 완료 체크"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Center: Kanji & Reading */}
                  <div className="my-auto text-center py-4">
                    {!isFlipped ? (
                      <div>
                        {/* Furigana */}
                        {!hideFurigana && (
                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-base sm:text-lg mb-1 tracking-wider">
                            {currentCard.reading}
                          </p>
                        )}
                        {hideFurigana && (
                          <p className="text-amber-500 text-xs font-bold mb-1">
                            (탭하면 독음과 뜻이 공개됩니다)
                          </p>
                        )}
                        <h3 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
                          {currentCard.kanji}
                        </h3>
                        <p className="text-xs text-slate-400">
                          카드를 탭하여 뜻과 예문을 확인하세요 👆
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                        <div>
                          <p className="text-emerald-400 text-sm font-semibold tracking-wide">
                            {currentCard.reading}
                          </p>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                            {currentCard.kanji}
                          </h3>
                          <p className="text-lg sm:text-xl font-bold text-amber-300">
                            {currentCard.meaning}
                          </p>
                        </div>

                        {/* Practical example */}
                        <div className="bg-white/10 rounded-2xl p-3 text-left border border-white/10 select-text">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-emerald-300">실전 예문</span>
                            <button
                              type="button"
                              onClick={(e) => handleSpeak(currentCard.exampleJp, e)}
                              className="text-[10px] text-slate-300 hover:text-white flex items-center gap-1"
                            >
                              <Volume2 className="w-3 h-3" /> 예문 듣기
                            </button>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-100 font-medium">
                            {currentCard.exampleJp}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {currentCard.exampleReading}
                          </p>
                          <p className="text-xs text-emerald-200 font-medium mt-1">
                            {currentCard.exampleKr}
                          </p>
                        </div>

                        {/* Study Tip */}
                        {currentCard.tip && (
                          <p className="text-[11px] text-slate-300 bg-amber-500/20 rounded-xl px-3 py-1.5 border border-amber-500/30 text-left">
                            💡 암기 팁: {currentCard.tip}
                          </p>
                        )}

                        {/* Kanji Breakdown in Card Back */}
                        {currentCard.kanjiDetails && currentCard.kanjiDetails.length > 0 && (
                          <div className="bg-white/10 rounded-2xl p-3 text-left border border-white/10 select-text space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                              <span className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" /> 한자 뜻·음독·훈독·부수
                              </span>
                              <span className="text-[10px] text-slate-300">
                                {currentCard.kanjiDetails.length}글자 구성
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {currentCard.kanjiDetails.map((k, kIdx) => (
                                <div
                                  key={kIdx}
                                  className="bg-black/20 rounded-xl p-2 border border-white/10 text-xs"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-lg font-black text-white">{k.character}</span>
                                      <span className="text-xs font-bold text-amber-300">[{k.krMeaning}]</span>
                                    </div>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-emerald-300 font-medium">
                                      부수: {k.radical}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 border-t border-white/10">
                                    <div><span className="text-slate-400">음독: </span><strong className="text-sky-300">{k.onyomi}</strong></div>
                                    <div><span className="text-slate-400">훈독: </span><strong className="text-emerald-300">{k.kunyomi}</strong></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Large Tap Target Action */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {isFlipped ? '탭하여 카드 앞면으로' : '탭하여 카드 뒤집기'}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleCheckWord(currentCard.id, e)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-transform active:scale-95 ${
                        completedWordIds.includes(currentCard.id)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {completedWordIds.includes(currentCard.id) ? '외웠어요 (완료됨)' : '외웠어요!'}
                    </button>
                  </div>
                </div>

                {/* Card Navigation Controls */}
                <div className="flex items-center justify-between mt-3 px-2">
                  <button
                    onClick={handlePrevCard}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
                    title="이전 단어"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                    {cardIndex + 1} / {filteredWords.length}
                  </div>

                  <button
                    onClick={handleNextCard}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
                    title="다음 단어"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Dedicated Expandable Kanji Deep Learning Panel for Current Word */}
                {currentCard.kanjiDetails && currentCard.kanjiDetails.length > 0 && (
                  <div className="mt-3.5 bg-white dark:bg-slate-800/95 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setShowKanjiDetail(!showKanjiDetail)}
                      className="w-full flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                          漢
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            한자 심층 분석 (뜻·음독·훈독·부수)
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            한자 어원과 부수를 알면 N2 어휘 문제 정답률이 2배 상승합니다
                          </p>
                        </div>
                      </div>
                      <span className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {showKanjiDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {showKanjiDetail && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 animate-in fade-in duration-200">
                        {currentCard.kanjiDetails.map((k, kIdx) => (
                          <div
                            key={kIdx}
                            className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1.5 select-text"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                                  {k.character}
                                </span>
                                <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                                  [{k.krMeaning}]
                                </span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 font-bold">
                                부수: {k.radical}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="text-[10px] text-slate-400 block font-medium">일본어 음독 (音読み)</span>
                                <strong className="text-sky-600 dark:text-sky-400 font-extrabold text-sm">{k.onyomi}</strong>
                              </div>
                              <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                                <span className="text-[10px] text-slate-400 block font-medium">일본어 훈독 (訓読み)</span>
                                <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{k.kunyomi}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

      {/* VIEW MODE 2: Full List Mode */}
      {viewMode === 'list' && (
        <div className="space-y-2.5">
          {filteredWords.map((word, idx) => {
            const isCompleted = completedWordIds.includes(word.id);

            return (
              <div
                key={word.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Checkbox */}
                  <button
                    type="button"
                    onClick={() => handleCheckWord(word.id)}
                    className="mt-0.5 shrink-0 min-h-[44px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors" />
                    )}
                  </button>

                  {/* Center: Word info */}
                  <div className="flex-1 min-w-0 select-text">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-400">#{idx + 1}</span>
                      <h4
                        className={`text-lg font-black tracking-tight ${
                          isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {word.kanji}
                      </h4>
                      {!hideFurigana && (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {word.reading}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">
                        {word.partOfSpeech}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {word.meaning}
                    </p>

                    <div className="mt-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2.5 border border-slate-100 dark:border-slate-700/40 text-xs">
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {word.exampleJp}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                        {word.exampleKr}
                      </p>
                    </div>

                    {word.tip && (
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1.5 flex items-center gap-1">
                        <span>💡 {word.tip}</span>
                      </p>
                    )}

                    {/* Kanji Breakdown in List Mode */}
                    {word.kanjiDetails && word.kanjiDetails.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                          type="button"
                          onClick={(e) => toggleListKanji(word.id, e)}
                          className="w-full flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 py-1 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>한자 분석 (뜻·음독·훈독·부수)</span>
                          </span>
                          <span className="flex items-center gap-1 text-[10px]">
                            {expandedListKanjiIds[word.id] !== false ? (
                              <>
                                <span>접기</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>펼치기 ({word.kanjiDetails.length}자)</span>
                                <ChevronDown className="w-3 h-3" />
                              </>
                            )}
                          </span>
                        </button>

                        {expandedListKanjiIds[word.id] !== false && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5 animate-in fade-in duration-150">
                            {word.kanjiDetails.map((k, kIdx) => (
                              <div
                                key={kIdx}
                                className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-2.5 border border-slate-200/80 dark:border-slate-700/60 text-xs"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                                      {k.character}
                                    </span>
                                    <span className="font-extrabold text-amber-600 dark:text-amber-400 text-xs">
                                      [{k.krMeaning}]
                                    </span>
                                  </div>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                                    부수: {k.radical}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                                  <div>
                                    <span className="text-slate-400">음독: </span>
                                    <strong className="text-sky-600 dark:text-sky-400 font-bold">{k.onyomi}</strong>
                                  </div>
                                  <div>
                                    <span className="text-slate-400">훈독: </span>
                                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{k.kunyomi}</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: TTS audio button */}
                  <button
                    type="button"
                    onClick={() => handleSpeak(word.kanji)}
                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    title="원어민 발음 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
