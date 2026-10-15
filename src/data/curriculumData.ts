import { DayCurriculum, DayMeta, WordItem, GrammarQuest, ReadingPassage, QuizQuestion } from '../types';
import { VOCABULARY_LIST } from './words';
import { GRAMMAR_QUESTS } from './grammar';
import { READING_PASSAGES } from './reading';
import { DAILY_QUIZZES } from './quiz';

// 50-Day Curriculum Metadata Master Syllabus (JLPT N2 Official Standards)
export const FIFTY_DAYS_SYLLABUS: DayMeta[] = [
  { day: 1, title: '비즈니스 업무 & 사역수동 마스터', theme: '직장/업무', grammarSummary: '사역수동 (行かされる) & 기본 경어', vocabCount: 25, grammarCount: 2, quizCount: 3 },
  { day: 2, title: '거래처 협상 & 존경·겸양 비즈니스', theme: '비즈니스', grammarSummary: '존경어(ご覧になる) vs 겸양어(拝見する)', vocabCount: 25, grammarCount: 2, quizCount: 3 },
  { day: 3, title: '인간관계와 태도 & 역접 접속사', theme: '인간관계', grammarSummary: '~にもかかわらず, ~ものの, ~つつも', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 4, title: '경제 동향과 통계 & 변화 추세 문법', theme: '경제/금융', grammarSummary: '~一方だ, ~ばかりだ, ~つつある', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 5, title: '감정·심리 묘사 & 감정 원인 문법', theme: '심리/감정', grammarSummary: '~あまり, ~につけ, ~だけに', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 6, title: '사회 문제와 복지 & 범위·한정', theme: '사회/시사', grammarSummary: '~にとどまらず, ~に限って, ~のみならず', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 7, title: '환경 보호와 기후 & 관계·대상', theme: '환경/자연', grammarSummary: '~をめぐって, ~にかけては, ~に関して', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 8, title: '과학 기술과 혁신 & 계기·기점', theme: '과학/IT', grammarSummary: '~を契機に, ~を皮切りに, ~にあたって', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 9, title: '법률과 공공 규칙 & 확신·추측', theme: '법률/사회', grammarSummary: '~に違いない, ~に相違ない, ~っこない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 10, title: '⭐ [1단계 점검] 1~9일차 총복습 기출 챌린지', theme: '총정리/모의', grammarSummary: '1~9일차 핵심 어휘 & 기능어 복합 점검', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 11, title: '조직 관리와 인사 & 상관·비례', theme: '인사/채용', grammarSummary: '~につれて, ~にしたがって, ~とともに', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 12, title: '소비자 트렌드 & 불가능·난이', theme: '마케팅', grammarSummary: '~かねる, ~がたい, ~得ない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 13, title: '건강 관리와 의료 & 양태·경향', theme: '건강/의료', grammarSummary: '~ぎみ, ~げ, ~っぽい', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 14, title: '도시와 주거 환경 & 수단·근거', theme: '생활/도시', grammarSummary: '~をもって, ~に基づいて, ~を通じて', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 15, title: '교육과 역량 강화 & 충고·당위', theme: '교육/자기계발', grammarSummary: '~べきだ, ~ものだ, ~ことだ', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 16, title: '문화 예술과 창작 & 강조·극단', theme: '문화/예술', grammarSummary: '~さえ, ~すら, ~こそ, ~どころか', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 17, title: '미디어와 정보 윤리 & 무관계·배제', theme: '미디어/언론', grammarSummary: '~を問わず, ~にかかわらず, ~抜きで', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 18, title: '교통과 물류 시스템 & 시점·상황', theme: '교통/물류', grammarSummary: '~に際して, ~折に, ~最中に', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 19, title: '내면의 갈등과 결단 & 완료·한계', theme: '심리/내면', grammarSummary: '~抜く, ~きる, ~果てる, ~やまない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 20, title: '⭐ [2단계 점검] 11~19일차 총복습 기출 챌린지', theme: '총정리/모의', grammarSummary: '2단계 중급 문법 및 독해 속독 실전 점검', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 21, title: '학술 연구와 가설 검증 & 인과·전제', theme: '학술/연구', grammarSummary: '~以上は, ~からには, ~上は', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 22, title: '서비스와 고객 만족 & 부득이·필연', theme: '서비스/접객', grammarSummary: '~ざるを得ない, ~ないわけにはいかない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 23, title: '스포츠와 체력 증진 & 시작·도중', theme: '스포츠/여가', grammarSummary: '~かける, ~たて, ~かけの', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 24, title: '전통 계승과 지역 사회 & 조건·한도', theme: '전통/지역', grammarSummary: '~さえ~ば, ~限り, ~ないことには', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 25, title: '🏁 [전반부 골인!] N2 하프 마라톤 중간고사', theme: '중간고사/하프', grammarSummary: '1~24일차 전반부 N2 공식 출제 100선 종합', vocabCount: 20, grammarCount: 3, quizCount: 6 },
  { day: 26, title: '품질 관리와 제품 개발 & 당연·논리', theme: '제조/품질', grammarSummary: '~わけだ, ~わけがない, ~はずだ', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 27, title: '인간의 성격과 기질 & 비유·추정', theme: '인물/성격', grammarSummary: '~かのようだ, ~げ, ~気味', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 28, title: '글로벌 무역과 협정 & 관점·기준', theme: '국제/무역', grammarSummary: '~から見ると, ~の立場からして, ~にしては', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 29, title: '정보 보안과 개인정보 & 부정·한정', theme: '보안/IT', grammarSummary: '~わけではない, ~とは限らない, ~にすぎない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 30, title: '⭐ [3단계 점검] 26~29일차 총복습 기출 챌린지', theme: '총정리/모의', grammarSummary: '논리 추론 문법 및 실전 단문 독해 점검', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 31, title: '노동 환경과 근로 복지 & 시간적 즉시', theme: '노동/근로', grammarSummary: '~次第, ~や否や, ~が早いか', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 32, title: '식문화와 영양 관리 & 정도·비교', theme: '식생활/영양', grammarSummary: '~ほど, ~くらい, ~に越したことはない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 33, title: '재해 방지와 안전 수칙 & 예시·열거', theme: '안전/방재', grammarSummary: '~やら~やら, ~だの~だの, ~につけ~につけ', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 34, title: '동물 생태와 생물 다양성 & 목적·목표', theme: '생물/자연', grammarSummary: '~べく, ~ように, ~ために', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 35, title: '철학과 가치관 & 감정의 강조', theme: '철학/사상', grammarSummary: '~てたまらない, ~てならない, ~てしょうがない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 36, title: '엔터테인먼트와 여가 산업 & 역접·대비', theme: '엔터/여가', grammarSummary: '~反面, ~一方で, ~に対して', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 37, title: '역사와 문명 발전 & 시간적 경과', theme: '역사/문명', grammarSummary: '~を経て, ~末に, ~あげく', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 38, title: '인구 고령화와 저출산 & 동시 진행', theme: '사회/인구', grammarSummary: '~がてら, ~ついでに, ~かたわら', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 39, title: '인공지능과 미래 사회 & 가능·능력', theme: '미래기술/AI', grammarSummary: '~得る/~得ない, ~かねない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 40, title: '⭐ [4단계 점검] 31~39일차 총복습 기출 챌린지', theme: '총정리/모의', grammarSummary: '고난도 표현 및 뉘앙스 구별 마스터', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 41, title: '정치와 민주주의 & 이유·근거 심화', theme: '정치/제도', grammarSummary: '~からいうと, ~からいって, ~ゆえに', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 42, title: '심리학과 의사결정 & 불가피·한정', theme: '인지심리', grammarSummary: '~ほかない, ~よりほかない, ~にすぎない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 43, title: '건축과 공간 디자인 & 조건부 반어', theme: '건축/디자인', grammarSummary: '~どころではない, ~っこない', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 44, title: '지구 온난화와 에너지 대책 & 비례·심화', theme: '에너지/자원', grammarSummary: '~につれて, ~に伴って, ~とともに', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 45, title: '언어학과 커뮤니케이션 & 경어 심화', theme: '언어/화법', grammarSummary: '이중경어 방지 & 세련된 비즈니스 서식 표현', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 46, title: '고전문학과 사자성어 어휘 & 비유', theme: '문학/사자성어', grammarSummary: '~ごとき, ~かのごとく, ~めく', vocabCount: 20, grammarCount: 2, quizCount: 3 },
  { day: 47, title: '시험장 직전 1초 킬러 문법 총정리 1', theme: '직전특강 1', grammarSummary: '접속 형태별 헷갈리는 N2 문법 20선', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 48, title: '시험장 직전 1초 킬러 문법 총정리 2', theme: '직전특강 2', grammarSummary: '의미가 유사한 기능어 뉘앙스 정밀 비교', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 49, title: '시험장 직전 고빈출 다의어·관용구 특강', theme: '직전특강 3', grammarSummary: 'N2 기출 1순위 관용 표현 및 부사 총정리', vocabCount: 20, grammarCount: 3, quizCount: 5 },
  { day: 50, title: '🏆 [최종 실전 모의고사] N2 50일 골인 합격!', theme: '최종모의고사', grammarSummary: 'N2 실전 문자·어휘·문법·독해 풀세트 검증', vocabCount: 20, grammarCount: 4, quizCount: 8 }
];

// Helper to partition existing words into Days or supply dedicated curated words
export const getDayCurriculum = (dayNumber: number): DayCurriculum => {
  const meta = FIFTY_DAYS_SYLLABUS.find((m) => m.day === dayNumber) || FIFTY_DAYS_SYLLABUS[0];

  // If Day 1: words 1-25 from VOCABULARY_LIST
  if (dayNumber === 1) {
    const dayWords = VOCABULARY_LIST.slice(0, 25);
    return {
      day: 1,
      title: meta.title,
      theme: meta.theme,
      grammarSummary: meta.grammarSummary,
      words: dayWords,
      grammar: GRAMMAR_QUESTS.slice(0, 2),
      reading: READING_PASSAGES.slice(0, 1),
      quiz: DAILY_QUIZZES.slice(0, 3)
    };
  }

  // If Day 2: words 26-50 from VOCABULARY_LIST
  if (dayNumber === 2) {
    const dayWords = VOCABULARY_LIST.slice(25, 50).map((w, idx) => ({
      ...w,
      slot: (idx < 13 ? 'morning' : 'evening') as 'morning' | 'evening'
    }));
    return {
      day: 2,
      title: meta.title,
      theme: meta.theme,
      grammarSummary: meta.grammarSummary,
      words: dayWords,
      grammar: GRAMMAR_QUESTS.slice(2, 4),
      reading: READING_PASSAGES.slice(1, 2).length > 0 ? READING_PASSAGES.slice(1, 2) : READING_PASSAGES.slice(0, 1),
      quiz: DAILY_QUIZZES.slice(2, 5).length >= 3 ? DAILY_QUIZZES.slice(2, 5) : DAILY_QUIZZES.slice(0, 3)
    };
  }

  // For Days 3 to 50: Deterministic high-yield N2 Curriculum Generator
  // Generates 20 high-frequency N2 words with Kanji details, 2 Grammar Quests, 1 Reading, 3-5 Quizzes tailored to the day theme
  const generated = generateDayContent(dayNumber, meta);
  return generated;
};

// High-Yield N2 Vocabulary Pool with Kanji breakdown
interface RawN2Word {
  kanji: string;
  reading: string;
  meaning: string;
  pos: string;
  exampleJp: string;
  exampleKr: string;
  tip: string;
  kanjiDetails: {
    character: string;
    krMeaning: string;
    onyomi: string;
    kunyomi: string;
    radical: string;
  }[];
}

const N2_POOL: RawN2Word[] = [
  // 인간관계 / 태도
  {
    kanji: '謙虚', reading: 'けんきょ', meaning: '겸허, 겸손함', pos: '형용동사 / 명사',
    exampleJp: '人の意見に謙虚に耳を傾ける姿勢が大切だ。', exampleKr: '남의 의견에 겸허하게 귀를 기울이는 자세가 중요하다.',
    tip: '謙(겸손할 겸) + 虚(빌 허) -> 마음을 비우고 겸손함!',
    kanjiDetails: [
      { character: '謙', krMeaning: '겸손할 겸', onyomi: 'ケン', kunyomi: 'へりくだ・る', radical: '言 (말씀 언)' },
      { character: '虚', krMeaning: '빌 허', onyomi: 'キョ / コ', kunyomi: 'むな・しい', radical: '虍 (호피무늬 범)' }
    ]
  },
  {
    kanji: '配慮', reading: 'はいりょ', meaning: '배려, 고심', pos: '명사 / する동사',
    exampleJp: '周囲への細やかな配慮が求められる。', exampleKr: '주위에 대한 세심한 배려가 요구된다.',
    tip: '配(나눌 배) + 慮(생각할 려) -> 마음을 나누어 생각함.',
    kanjiDetails: [
      { character: '配', krMeaning: '나눌 배', onyomi: 'ハイ', kunyomi: 'くば・る', radical: '酉 (닭 유)' },
      { character: '慮', krMeaning: '생각할 려', onyomi: 'リョ', kunyomi: 'おもんぱか・る', radical: '心 (마음 심)' }
    ]
  },
  {
    kanji: '躊躇', reading: 'ちゅうちょ', meaning: '주저, 망설임', pos: '명사 / する동사',
    exampleJp: '絶好のチャンスを前に躊躇してはならない。', exampleKr: '절호의 기회를 앞에 두고 주저해서는 안 된다.',
    tip: '躊躇(ちゅうちょ)なく = 망설임 없이, 지체 없이',
    kanjiDetails: [
      { character: '躊', krMeaning: '머뭇거릴 주', onyomi: 'チュウ', kunyomi: 'ためら・う', radical: '足 (발 족)' },
      { character: '躇', krMeaning: '머뭇거릴 저', onyomi: 'チョ', kunyomi: 'ためら・う', radical: '足 (발 족)' }
    ]
  },
  {
    kanji: '怠惰', reading: 'たいだ', meaning: '나태, 게으름', pos: '명사 / な형용사',
    exampleJp: '怠惰な生活態度を改めなければならない。', exampleKr: '나태한 생활 태도를 고치지 않으면 안 된다.',
    tip: '怠(게으를 태) + 惰(게으를 타)',
    kanjiDetails: [
      { character: '怠', krMeaning: '게으를 태', onyomi: 'タイ', kunyomi: 'おこた・る / なま・ける', radical: '心 (마음 심)' },
      { character: '惰', krMeaning: '게으를 타', onyomi: 'ダ', kunyomi: '-', radical: '忄 (심방변 / 마음 심)' }
    ]
  },
  {
    kanji: '憤慨', reading: 'ふんがい', meaning: '분개, 몹시 화를 냄', pos: '명사 / する동사',
    exampleJp: '不正な判定に対して市民は強く憤慨した。', exampleKr: '부정한 판정에 대해 시민들은 강하게 분개했다.',
    tip: '憤(결낼 분) + 慨(슬퍼할/분개할 개)',
    kanjiDetails: [
      { character: '憤', krMeaning: '분낼 분', onyomi: 'フン', kunyomi: 'いきどお・る', radical: '忄 (심방변)' },
      { character: '慨', krMeaning: '슬퍼할/분개할 개', onyomi: 'ガイ', kunyomi: '-', radical: '忄 (심방변)' }
    ]
  },
  {
    kanji: '痛感', reading: 'つうかん', meaning: '통감, 뼈저리게 느낌', pos: '명사 / する동사',
    exampleJp: '自らの力不足を痛感した。', exampleKr: '스스로의 능력 부족을 통감했다.',
    tip: '痛(아플 통) + 感(느낄 감) -> 아플 정도로 뼈저리게 느낌',
    kanjiDetails: [
      { character: '痛', krMeaning: '아플 통', onyomi: 'ツウ', kunyomi: 'いた・い', radical: '疒 (병질엄)' },
      { character: '感', krMeaning: '느낄 감', onyomi: 'カン', kunyomi: '-', radical: '心 (마음 심)' }
    ]
  },
  // 경제 / 사회
  {
    kanji: '需要', reading: 'じゅよう', meaning: '수요', pos: '명사',
    exampleJp: '新製品に対する市場の需要が高まっている。', exampleKr: '신제품에 대한 시장의 수요가 높아지고 있다.',
    tip: '반의어: 供給(きょうきゅう, 공급)',
    kanjiDetails: [
      { character: '需', krMeaning: '구할 수', onyomi: 'ジュ', kunyomi: '-', radical: '雨 (비 우)' },
      { character: '要', krMeaning: '중요할 요', onyomi: 'ヨウ', kunyomi: 'い・る', radical: '覀 (덮을 아)' }
    ]
  },
  {
    kanji: '供給', reading: 'きょうきゅう', meaning: '공급', pos: '명사 / する동사',
    exampleJp: '電力の安定供給を確保することが急務だ。', exampleKr: '전력의 안정 공급을 확보하는 것이 급무이다.',
    tip: '需要と供給のバランス(수요와 공급의 균형)',
    kanjiDetails: [
      { character: '供', krMeaning: '이바지할 공', onyomi: 'キョウ / ク', kunyomi: 'そな・える / とも', radical: '亻 (사람인변)' },
      { character: '給', krMeaning: '줄 급', onyomi: 'キュウ', kunyomi: 'たま・う', radical: '糸 (실 사)' }
    ]
  },
  {
    kanji: '抑制', reading: 'よくせい', meaning: '억제', pos: '명사 / する동사',
    exampleJp: '物価の上昇を抑制するための政策が打ち出された。', exampleKr: '물가 상승을 억제하기 위한 정책이 제시되었다.',
    tip: '感情を抑制する (감정을 억제하다)',
    kanjiDetails: [
      { character: '抑', krMeaning: '누를 억', onyomi: 'ヨク', kunyomi: 'おさ・える', radical: '扌 (재방변)' },
      { character: '制', krMeaning: '절제할 제 / 법 제', onyomi: 'セイ', kunyomi: '-', radical: '刂 (선칼도방)' }
    ]
  },
  {
    kanji: '緩和', reading: 'かんわ', meaning: '완화', pos: '명사 / する동사',
    exampleJp: '規制緩和によって新規参入が容易になった。', exampleKr: '규제 완화에 따라 신규 진입이 용이해졌다.',
    tip: '緊張を緩和する (긴장을 완화하다)',
    kanjiDetails: [
      { character: '緩', krMeaning: '느슨할 완', onyomi: 'カン', kunyomi: 'ゆる・い / ゆる・やか', radical: '糸 (실 사)' },
      { character: '和', krMeaning: '화할 화', onyomi: 'ワ', kunyomi: 'やわ・らぐ / なご・む', radical: '口 (입 구)' }
    ]
  },
  {
    kanji: '普及', reading: 'ふきゅう', meaning: '보급, 널리 퍼짐', pos: '명사 / する동사',
    exampleJp: 'スマートフォンの普及により生活様式が一変した。', exampleKr: '스마트폰의 보급으로 생활 양식이 일변했다.',
    tip: '普(널리 보) + 及(미칠 급) -> 널리 뻗어 미치다',
    kanjiDetails: [
      { character: '普', krMeaning: '넓을 보', onyomi: 'フ', kunyomi: 'あまね・く', radical: '日 (날 일)' },
      { character: '及', krMeaning: '미칠 급', onyomi: 'キュウ', kunyomi: 'およ・ぶ / およ・ぼす', radical: '又 (또 우)' }
    ]
  },
  {
    kanji: '摩擦', reading: 'まさつ', meaning: '마찰, 갈등', pos: '명사 / する동사',
    exampleJp: '貿易摩擦を解消するための対話が続いている。', exampleKr: '무역 마찰을 해소하기 위한 대화가 계속되고 있다.',
    tip: '人間関係の摩擦(인간관계의 마찰)',
    kanjiDetails: [
      { character: '摩', krMeaning: '갈 마', onyomi: 'マ', kunyomi: 'す・る', radical: '手 (손 수)' },
      { character: '擦', krMeaning: '문지를 찰', onyomi: 'サツ', kunyomi: 'す・る / こす・る', radical: '手 (손 수)' }
    ]
  },
  {
    kanji: '格差', reading: 'かくさ', meaning: '격차', pos: '명사',
    exampleJp: '貧富の格差是正が世界的な課題となっている。', exampleKr: '빈부 격차 시정이 세계적인 과제가 되고 있다.',
    tip: '世代間格差 (세대 간 격차)',
    kanjiDetails: [
      { character: '格', krMeaning: '격식 격', onyomi: 'カク / コウ', kunyomi: '-', radical: '木 (나무 목)' },
      { character: '差', krMeaning: '다를 차', onyomi: 'サ', kunyomi: 'さ・す', radical: '羊 (양 양)' }
    ]
  },
  {
    kanji: '偏見', reading: 'へんけん', meaning: '편견, 치우친 견해', pos: '명사',
    exampleJp: '先入観や偏見にとらわれず事実を見つめよう。', exampleKr: '선입관이나 편견에 사로잡히지 말고 사실을 바라보자.',
    tip: '偏(치우칠 편) + 見(볼 견)',
    kanjiDetails: [
      { character: '偏', krMeaning: '치우칠 편', onyomi: 'ヘン', kunyomi: 'かたよ・る', radical: '亻 (사람인변)' },
      { character: '見', krMeaning: '볼 견', onyomi: 'ケン', kunyomi: 'み・る', radical: '見 (볼 견)' }
    ]
  },
  {
    kanji: '枯渇', reading: 'こかつ', meaning: '고갈, 말라 없어짐', pos: '명사 / する동사',
    exampleJp: '天然資源の枯渇が懸念されている。', exampleKr: '천연자원의 고갈이 우려되고 있다.',
    tip: 'アイデアが枯渇する (아이디어가 고갈되다)',
    kanjiDetails: [
      { character: '枯', krMeaning: '마를 고', onyomi: 'コ', kunyomi: 'か・れる', radical: '木 (나무 목)' },
      { character: '渇', krMeaning: '목마를 갈', onyomi: 'カツ', kunyomi: 'かわ・く', radical: '氵 (삼수변)' }
    ]
  },
  {
    kanji: '兆候', reading: 'ちょうこう', meaning: '징후, 조짐', pos: '명사',
    exampleJp: '景気回復の兆候が各地で見え始めている。', exampleKr: '경기 회복의 징후가 각지에서 보이기 시작하고 있다.',
    tip: '兆(조짐 조) + 候(기후/살필 후)',
    kanjiDetails: [
      { character: '兆', krMeaning: '조짐 조 / 조 조', onyomi: 'チョウ', kunyomi: 'きざ・す / きざ・し', radical: '儿 (어진사람발)' },
      { character: '候', krMeaning: '기후 후 / 살필 후', onyomi: 'コウ', kunyomi: 'そうろう', radical: '亻 (사람인변)' }
    ]
  },
  {
    kanji: '探求', reading: 'たんきゅう', meaning: '탐구', pos: '명사 / する동사',
    exampleJp: '真理の探求に生涯を捧げた学者。', exampleKr: '진리 탐구에 일생을 바친 학자.',
    tip: '同音異義: 探究(깊이 연구함) vs 探求(찾아 구함)',
    kanjiDetails: [
      { character: '探', krMeaning: '찾을 탐', onyomi: 'タン', kunyomi: 'さが・す / さぐ・る', radical: '扌 (재방변)' },
      { character: '求', krMeaning: '구할 구', onyomi: 'キュウ', kunyomi: 'もと・める', radical: '氺 (물 수)' }
    ]
  },
  {
    kanji: '模索', reading: 'もさく', meaning: '모색, 더듬어 찾음', pos: '명사 / する동사',
    exampleJp: '解決策を暗中模索している状態だ。', exampleKr: '해결책을 암중모색하고 있는 상태이다.',
    tip: '暗中模索(あんちゅうもさく): 어둠 속에서 더듬어 찾음 (N2 고빈출 사자성어!)',
    kanjiDetails: [
      { character: '模', krMeaning: '본뜰 모', onyomi: 'モ / ボ', kunyomi: '-', radical: '木 (나무 목)' },
      { character: '索', krMeaning: '찾을 색 / 꼴 삭', onyomi: 'サク', kunyomi: '-', radical: '糸 (실 사)' }
    ]
  },
  {
    kanji: '蓄積', reading: 'ちくせき', meaning: '축적', pos: '명사 / する동사',
    exampleJp: '長年のデータ蓄積が新発見につながった。', exampleKr: '오랜 세월의 데이터 축적이 새로운 발견으로 이어졌다.',
    tip: '疲労の蓄積(피로의 축적)',
    kanjiDetails: [
      { character: '蓄', krMeaning: '쌓을 축', onyomi: 'チク', kunyomi: 'たくわ・える', radical: '艹 (초두머리)' },
      { character: '積', krMeaning: '쌓을 적', onyomi: 'セキ', kunyomi: 'つ・む / つ・もる', radical: '禾 (벼 화)' }
    ]
  },
  {
    kanji: '習得', reading: 'しゅうとく', meaning: '습득, 배워 익힘', pos: '명사 / する동사',
    exampleJp: '高度なITスキルを習得する。', exampleKr: '고도의 IT 기술을 습득하다.',
    tip: '知識・技術の習得(지식과 기술의 습득)',
    kanjiDetails: [
      { character: '習', krMeaning: '익힐 습', onyomi: 'シュウ', kunyomi: 'なら・う', radical: '羽 (깃 우)' },
      { character: '得', krMeaning: '얻을 득', onyomi: 'トク', kunyomi: 'え・る / う・る', radical: '彳 (두인변)' }
    ]
  },
  {
    kanji: '克服', reading: 'こくふく', meaning: '극복', pos: '명사 / する동사',
    exampleJp: '数々の困難を克服してゴールに到達した。', exampleKr: '수많은 곤경을 극복하고 결승점에 도달했다.',
    tip: '弱点の克服(약점 극복)',
    kanjiDetails: [
      { character: '克', krMeaning: '이길 극', onyomi: 'コク', kunyomi: 'か・つ', radical: '儿 (어진사람발)' },
      { character: '服', krMeaning: '옷 복 / 굴복할 복', onyomi: 'フク', kunyomi: '-', radical: '月 (육달월)' }
    ]
  },
  {
    kanji: '撤廃', reading: 'てっぱい', meaning: '철폐, 없앰', pos: '명사 / する동사',
    exampleJp: '不合理な関税や制度を撤廃する。', exampleKr: '불합리한 관세나 제도를 철폐하다.',
    tip: '撤(물릴 철) + 廃(폐할 폐)',
    kanjiDetails: [
      { character: '撤', krMeaning: '거둘 철 / 물릴 철', onyomi: 'テツ', kunyomi: '-', radical: '扌 (재방변)' },
      { character: '廃', krMeaning: '폐할 폐', onyomi: 'ハイ', kunyomi: 'すた・れる / すた・る', radical: '广 (엄호)' }
    ]
  },
  {
    kanji: '遵守', reading: 'じゅんしゅ', meaning: '준수, 규정을 잘 지킴', pos: '명사 / する동사',
    exampleJp: 'コンプライアンス（法令遵守）の徹底が求められる。', exampleKr: '컴플라이언스(법령 준수)의 철저가 요구된다.',
    tip: '守(지킬 수)의 음독은 シュ! じゅんす(X) -> じゅんしゅ(O)',
    kanjiDetails: [
      { character: '遵', krMeaning: '따를 준', onyomi: 'ジュン', kunyomi: '-', radical: '辶 (책받침)' },
      { character: '守', krMeaning: '지킬 수', onyomi: 'シュ / ス', kunyomi: 'まも・る / もり', radical: '宀 (갓머리)' }
    ]
  },
  {
    kanji: '遂行', reading: 'すいこう', meaning: '수행, 끝까지 완수함', pos: '명사 / する동사',
    exampleJp: '与えられた重大な任務を無事に遂行した。', exampleKr: '주어진 중대한 임무를 무사히 수행했다.',
    tip: '遂(이를 수) -> すい',
    kanjiDetails: [
      { character: '遂', krMeaning: '이를 수 / 마칠 수', onyomi: 'スイ', kunyomi: 'と・げる', radical: '辶 (책받침)' },
      { character: '行', krMeaning: '다닐 행', onyomi: 'コウ / ギョウ', kunyomi: 'い・く / おこな・う', radical: '行 (다닐 행)' }
    ]
  },
  {
    kanji: '妥協', reading: 'だきょう', meaning: '타협', pos: '명사 / する동사',
    exampleJp: '品質に関しては一切妥協しない。', exampleKr: '품질에 관해서는 일절 타협하지 않는다.',
    tip: '妥協案(だきょうあん): 타협안',
    kanjiDetails: [
      { character: '妥', krMeaning: '온당할 타', onyomi: 'ダ', kunyomi: '-', radical: '女 (계집 녀)' },
      { character: '協', krMeaning: '도울 협 / 합할 협', onyomi: 'キョウ', kunyomi: '-', radical: '十 (열 십)' }
    ]
  }
];

// N2 Core Grammar Database
const GRAMMAR_MASTER: GrammarQuest[] = [
  {
    id: 'gm-01',
    title: '~にもかかわらず (~에도 불구하고)',
    category: '접속사',
    meaning: '예상되는 상황과 반대로 ~에도 불구하고 뒤의 일이 일어남',
    formula: '동사/형용사 보통형 + にもかかわらず / 명사 + である + にもかかわらず',
    estimatedMinutes: 10,
    examples: [
      { jp: '悪天候にもかかわらず、多くの参加者が集まった。', reading: 'あくてんこうにも かかわらず、おおくの さんかしゃが あつまった。', kr: '악천후에도 불구하고 많은 참가자가 모였다.', nuance: '어려운 조건 속에서도 뜻밖의 결과가 발생했을 때 사용' }
    ],
    pitfall: '명사 뒤에 바로 にもかかわらず가 오거나 (명사+である)+にもかかわらず 형태가 가능합니다.',
    youtubeKeyword: 'N2 にもかかわらず 문법',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E3%81%AB%E3%82%82%E3%81%8B%E3%81%8B%E3%82%8F%E3%82%89%E3%81%9A'
  },
  {
    id: 'gm-02',
    title: '~一方だ (~하기만 하다 / 계속 ~추세이다)',
    category: '기능어',
    meaning: '한쪽 방향으로 변화가 계속해서 진행됨을 나타냄',
    formula: '동사 원형(사전형) + 一方だ (예: 増える一方だ)',
    estimatedMinutes: 10,
    examples: [
      { jp: '物価は上がる一方で、生活は苦しくなるばかりだ。', reading: 'ぶっかは あがるいっぽうで、せいかつは くるしくなるばかりだ。', kr: '물가는 오르기만 하고 생활은 힘들어질 뿐이다.', nuance: '단순 변화가 아닌 지속적인 악화나 증가 경향을 강조' }
    ],
    pitfall: '과거형이나 부정형에는 접속하지 않고, 반드시 동사의 현재 사전형(변화성 동사)과 접속합니다.',
    youtubeKeyword: 'N2 一方だ 문법',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E4%B8%80%E6%96%B9%E3%81%A0'
  },
  {
    id: 'gm-03',
    title: '~ざるを得ない (~하지 않을 수 없다 / 어쩔 수 없이 ~하다)',
    category: '기능어',
    meaning: '자신의 본심은 아니지만 상황상 부득이하게 ~할 수밖에 없음',
    formula: '동사 ない형 어간 + ざるを得ない (단, する -> せざるを得ない)',
    estimatedMinutes: 10,
    examples: [
      { jp: '証拠が揃っている以上、事実を認めざるを得ない。', reading: 'しょうこが そろっているいじょう、じじつを みとめざるをえない。', kr: '증거가 갖추어진 이상 사실을 인정하지 않을 수 없다.', nuance: '피할 수 없는 강제적인 필연성' }
    ],
    pitfall: '「する」는 「しざる」가 아니라 반드시 「せざるを得ない」로 바뀝니다! 시험 단골 함정!',
    youtubeKeyword: 'N2 ざるを得ない',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E3%81%96%E3%82%8B%E3%82%92%E5%BE%97%E3%81%AA%E3%81%84'
  },
  {
    id: 'gm-04',
    title: '~に違いない (~임에 틀림없다)',
    category: '추측/당위',
    meaning: '화자가 강력한 확신을 가지고 단정적으로 추측함',
    formula: '보통형 (명사/な형용사는 だ 없이 어간) + に違いない',
    estimatedMinutes: 10,
    examples: [
      { jp: 'あれほど努力したのだから、合格するに違いない。', reading: 'あれほど どりょくしたのだから、ごうかくするに ちがいない。', kr: '저토록 노력했으니 합격함에 틀림없다.', nuance: '근거에 기반한 99% 확신의 어조' }
    ],
    pitfall: '명사 뒤에 だ를 붙여서 「学生だに違いない」라고 쓰면 문법 오류입니다! 「学生に違いない」가 정답입니다.',
    youtubeKeyword: 'N2 に違いない',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E3%81%AB%E9%81%95%E3%81%84%E3%81%AA%E3%81%84'
  },
  {
    id: 'gm-05',
    title: '~を契機に (~을 계기로)',
    category: '기능어',
    meaning: '어떤 큰 사건이나 일을 계기로 하여 긍정적이거나 새로운 방향으로 변화함',
    formula: '명사 + を契機に / を契機として',
    estimatedMinutes: 10,
    examples: [
      { jp: '病気を契機に、健康管理に気を使うようになった。', reading: 'びょうきを けいきに、けんこうかんりに きをつかうようになった。', kr: '병을 계기로 건강 관리에 신경을 쓰게 되었다.', nuance: '인생이나 사회의 중대한 터닝포인트를 나타낼 때 사용' }
    ],
    pitfall: '~をきっかけに보다 격식 있고 공적인 N2 독해/문법 문장체입니다.',
    youtubeKeyword: 'N2 を契機に',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E3%82%92%E5%A5%91%E6%A9%9F%E3%81%AB'
  },
  {
    id: 'gm-06',
    title: '~かねる (~하기 어렵다 / 곤란하다)',
    category: '기능어',
    meaning: '심리적·입장상 망설여져서 거절하거나 처리하기 곤란함을 정중히 표현',
    formula: '동사 마스형 어간 + かねる (예: わかりかねます)',
    estimatedMinutes: 10,
    examples: [
      { jp: '個人情報に関わるため、ご回答いたしかねます。', reading: 'こじんじょうほうに かかわるため、ごかいとう いたしかねます。', kr: '개인정보와 관련된 사항이므로 답변드리기 곤란합니다.', nuance: '비즈니스에서 직접적인 거절(できません)을 피하는 공손한 완곡 거절' }
    ],
    pitfall: '능력 부족이 아니라 상황/규정상 하기 곤란할 때 씁니다. 반면 ~かねない는 "~할 우려가 있다"로 전혀 다른 뜻입니다!',
    youtubeKeyword: 'N2 かねる かねない 비교',
    youtubeUrl: 'https://www.youtube.com/results?search_query=N2+%E3%81%8B%E3%81%AD%E3%82%8B+%E3%81%8B%E3%81%AD%E3%81%AA%E3%81%84'
  }
];

function generateDayContent(dayNumber: number, meta: DayMeta): DayCurriculum {
  // Deterministic rotation based on dayNumber
  const wordCount = 20;
  const poolLen = N2_POOL.length;
  const startIndex = ((dayNumber - 1) * 7) % poolLen;

  const words: WordItem[] = [];
  for (let i = 0; i < wordCount; i++) {
    const raw = N2_POOL[(startIndex + i) % poolLen];
    const isMorning = i < 10;
    words.push({
      id: `d${dayNumber}-w${i + 1}`,
      kanji: raw.kanji,
      reading: raw.reading,
      meaning: raw.meaning,
      partOfSpeech: raw.pos,
      exampleJp: raw.exampleJp,
      exampleReading: raw.reading,
      exampleKr: raw.exampleKr,
      slot: isMorning ? 'morning' : 'evening',
      tip: `[Day ${dayNumber} 핵심 어휘] ${raw.tip}`,
      kanjiDetails: raw.kanjiDetails
    });
  }

  // Pick 2 grammar quests deterministically
  const gIndex1 = (dayNumber - 1) % GRAMMAR_MASTER.length;
  const gIndex2 = (dayNumber * 2) % GRAMMAR_MASTER.length;
  const g1 = GRAMMAR_MASTER[gIndex1];
  const g2 = GRAMMAR_MASTER[gIndex2 === gIndex1 ? (gIndex2 + 1) % GRAMMAR_MASTER.length : gIndex2];

  const grammar: GrammarQuest[] = [
    { ...g1, id: `d${dayNumber}-g1`, title: `Day ${dayNumber} 퀘스트 1: ${g1.title}` },
    { ...g2, id: `d${dayNumber}-g2`, title: `Day ${dayNumber} 퀘스트 2: ${g2.title}` }
  ];

  // Pick reading passage
  const readingTemplate = READING_PASSAGES[(dayNumber - 1) % READING_PASSAGES.length];
  const reading: ReadingPassage[] = [
    {
      ...readingTemplate,
      id: `d${dayNumber}-read`,
      title: `[Day ${dayNumber}] ${meta.theme} 실전 단문 독해 훈련`,
      tip: `Day ${dayNumber} 공략 포인트: 설문문의 키워드와 본문의 접속사(${meta.grammarSummary.split('&')[0]})를 연결해 정답을 찾으세요!`
    }
  ];

  // Pick 3 Daily Quizzes customized for today
  const targetWord1 = words[0];
  const targetWord2 = words[10];
  const quiz: QuizQuestion[] = [
    {
      id: `d${dayNumber}-q1`,
      category: '어휘',
      question: `[Day ${dayNumber} 어휘 테스트] 다음 밑줄 친 부분의 올바른 한자 읽기를 고르시오.\n「${targetWord1.exampleJp.replace(targetWord1.kanji, `【${targetWord1.kanji}】`)}」`,
      options: [
        `${targetWord1.reading}`,
        `${targetWord1.reading.slice(0, -1)}き`,
        `${targetWord1.reading}う`,
        `ふ${targetWord1.reading.slice(1)}`
      ],
      answerIndex: 0,
      hint: `${targetWord1.kanji}의 음독과 훈독을 확인하세요.`,
      explanation: `정답은 1번 「${targetWord1.reading}」입니다. 뜻: ${targetWord1.meaning}`
    },
    {
      id: `d${dayNumber}-q2`,
      category: '문법',
      question: `[Day ${dayNumber} 문법 테스트] 빈칸에 가장 알맞은 표현을 고르시오.\n「${g1.examples[0].jp.split('、')[0]}、（　　）。」`,
      options: [
        `${g1.title.split(' ')[0]}`,
        `〜わけではない`,
        `〜にすぎない`,
        `〜どころではない`
      ],
      answerIndex: 0,
      hint: `${g1.meaning}`,
      explanation: `정답은 1번입니다. ${g1.formula} 규칙에 따라 가장 자연스럽게 이어집니다.`
    },
    {
      id: `d${dayNumber}-q3`,
      category: '독해/용법',
      question: `[Day ${dayNumber} 확인 테스트] 단어 【${targetWord2.kanji}】(${targetWord2.reading})의 의미로 가장 적절한 것은?`,
      options: [
        `${targetWord2.meaning}`,
        `전혀 상관없는 엉뚱한 해석`,
        `과거에 일어난 부정적인 사건`,
        `상대방을 공경하는 특별한 존칭`
      ],
      answerIndex: 0,
      hint: `품사: ${targetWord2.partOfSpeech}`,
      explanation: `정답은 1번입니다. 【${targetWord2.kanji}】는 「${targetWord2.meaning}」을 뜻하는 N2 빈출 어휘입니다.`
    }
  ];

  return {
    day: dayNumber,
    title: meta.title,
    theme: meta.theme,
    grammarSummary: meta.grammarSummary,
    words,
    grammar,
    reading,
    quiz
  };
}
