import { WordItem } from '../types';

export const VOCABULARY_LIST: WordItem[] = [
  // ==========================================
  // 출근길 25개 (Morning Commute 25)
  // ==========================================
  {
    id: 'm-01',
    kanji: '把握',
    reading: 'はあく',
    meaning: '파악, 이해',
    partOfSpeech: '명사 / する동사',
    exampleJp: '現状を正確に把握することが最も重要だ。',
    exampleReading: 'げんじょうを せいかくに はあくする ことが もっとも じゅうようだ。',
    exampleKr: '현상을 정확하게 파악하는 것이 가장 중요하다.',
    slot: 'morning',
    tip: '손(把: 잡을 파)으로 꽉 쥐어(握: 쥘 악) 알아낸다는 뉘앙스!',
    kanjiDetails: [
      {
        character: '把',
        krMeaning: '잡을 파',
        onyomi: 'ハ',
        kunyomi: 'と・る',
        radical: '扌 (재방변 / 손 수)'
      },
      {
        character: '握',
        krMeaning: '쥘 악',
        onyomi: 'アク',
        kunyomi: 'にぎ・る',
        radical: '扌 (재방변 / 손 수)'
      }
    ]
  },
  {
    id: 'm-02',
    kanji: '妥協',
    reading: 'だきょう',
    meaning: '타협',
    partOfSpeech: '명사 / する동사',
    exampleJp: '品質に関しては一切妥協しない方針だ。',
    exampleReading: 'ひんしつに かんしては いっさい だきょうしない ほうしんだ。',
    exampleKr: '품질에 관해서는 일절 타협하지 않는 방침이다.',
    slot: 'morning',
    tip: '妥協案(だきょうあん): 타협안 도 N2 빈출!',
    kanjiDetails: [
      {
        character: '妥',
        krMeaning: '온당할 타',
        onyomi: 'ダ',
        kunyomi: '-',
        radical: '女 (계집 녀)'
      },
      {
        character: '協',
        krMeaning: '도울 협 / 합할 협',
        onyomi: 'キョウ',
        kunyomi: '-',
        radical: '十 (열 십)'
      }
    ]
  },
  {
    id: 'm-03',
    kanji: '契機',
    reading: 'けいき',
    meaning: '계기, 결정적 기회',
    partOfSpeech: '명사',
    exampleJp: '留学を契機に、異文化への理解が深まった。',
    exampleReading: 'りゅうがくを けいきに、いぶんかへの りかいが ふかまった。',
    exampleKr: '유학을 계기로 이문화에 대한 이해가 깊어졌다.',
    slot: 'morning',
    tip: '~を契機に(~을 계기로) 문법 형태로 독해/문법에 자주 출제!',
    kanjiDetails: [
      {
        character: '契',
        krMeaning: '맺을 계',
        onyomi: 'ケイ',
        kunyomi: 'ちぎ・る',
        radical: '大 (큰 대)'
      },
      {
        character: '機',
        krMeaning: '틀 기 / 기회 기',
        onyomi: 'キ',
        kunyomi: 'はた',
        radical: '木 (나무 목)'
      }
    ]
  },
  {
    id: 'm-04',
    kanji: '手際',
    reading: 'てぎわ',
    meaning: '솜씨, 일 처리 수완',
    partOfSpeech: '명사',
    exampleJp: '彼は手際よく仕事を片付けた。',
    exampleReading: 'かれは てぎわよく しごとを かたづけた。',
    exampleKr: '그는 솜씨 좋게 일을 해치웠다.',
    slot: 'morning',
    tip: '手際がいい(솜씨가 좋다) 관용구 필수 암기!',
    kanjiDetails: [
      {
        character: '手',
        krMeaning: '손 수',
        onyomi: 'シュ',
        kunyomi: 'て, た',
        radical: '手 (손 수)'
      },
      {
        character: '際',
        krMeaning: '즈음 제 / 가 제',
        onyomi: 'サイ',
        kunyomi: 'きわ',
        radical: '阝 (좌부변 / 언덕 부)'
      }
    ]
  },
  {
    id: 'm-05',
    kanji: '綿密',
    reading: 'めんみつ',
    meaning: '면밀함, 꼼꼼함',
    partOfSpeech: 'な형용사 / 명사',
    exampleJp: '綿密な計画を立ててプロジェクトを進める。',
    exampleReading: 'めんみつな けいかくを たてて ぷろじぇくとを すすめる。',
    exampleKr: '면밀한 계획을 세워 프로젝트를 진행한다.',
    slot: 'morning',
    tip: '솜(綿)처럼 촘촘하고 빈틈없는(密) 상태!',
    kanjiDetails: [
      {
        character: '綿',
        krMeaning: '솜 면',
        onyomi: 'メン',
        kunyomi: 'わた',
        radical: '糸 (실 사)'
      },
      {
        character: '密',
        krMeaning: '빽빽할 밀 / 은밀할 밀',
        onyomi: 'ミツ',
        kunyomi: 'ひそ・か',
        radical: '宀 (갓머리)'
      }
    ]
  },
  {
    id: 'm-06',
    kanji: '迅速',
    reading: 'じんそく',
    meaning: '신속함',
    partOfSpeech: 'な형용사 / 명사',
    exampleJp: 'トラブルに対して迅速に対応する。',
    exampleReading: 'とらぶるに たいして じんそくに たいおうする。',
    exampleKr: '트러블에 대해 신속하게 대응한다.',
    slot: 'morning',
    tip: '비즈니스 메일이나 독해 지문 1순위 단어.',
    kanjiDetails: [
      {
        character: '迅',
        krMeaning: '빠를 신',
        onyomi: 'ジン',
        kunyomi: '-',
        radical: '辶 (책받침)'
      },
      {
        character: '速',
        krMeaning: '빠를 속',
        onyomi: 'ソク',
        kunyomi: 'はや・い, すみ・やか',
        radical: '辶 (책받침)'
      }
    ]
  },
  {
    id: 'm-07',
    kanji: '見当',
    reading: 'けんとう',
    meaning: '어림짐작, 예상, 방향',
    partOfSpeech: '명사',
    exampleJp: '原因について全く見当がつかない。',
    exampleReading: 'げんいんに ついて まったく けんとうが つかない。',
    exampleKr: '원인에 대해 전혀 짐작이 가지 않는다.',
    slot: 'morning',
    tip: '見当がつく(짐작이 가다) / 見当がつかない(짐작조차 안 가다)',
    kanjiDetails: [
      {
        character: '見',
        krMeaning: '볼 견',
        onyomi: 'ケン',
        kunyomi: 'み・る, み・える',
        radical: '見 (볼 견)'
      },
      {
        character: '当',
        krMeaning: '마땅 당 / 맞힐 당',
        onyomi: 'トウ',
        kunyomi: 'あ・たる, あ・てる',
        radical: '⺌ (작을 소)'
      }
    ]
  },
  {
    id: 'm-08',
    kanji: '煩わしい',
    reading: 'わずらわしい',
    meaning: '번거롭다, 성가시다',
    partOfSpeech: 'い형용사',
    exampleJp: '煩わしい手続きを簡略化してほしい。',
    exampleReading: 'わずらわしい てつづきを かんりゃくか してほしい。',
    exampleKr: '번거로운 절차를 간략화해 주었으면 한다.',
    slot: 'morning',
    tip: '마음이 번뇌(煩)로 어지러울 정도로 성가신 것!',
    kanjiDetails: [
      {
        character: '煩',
        krMeaning: '번거로울 번',
        onyomi: 'ハン, ボン',
        kunyomi: 'わずら・う, わずら・わす',
        radical: '火 (불 화)'
      }
    ]
  },
  {
    id: 'm-09',
    kanji: '促す',
    reading: 'うながす',
    meaning: '재촉하다, 촉구하다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '市民に行動変容を促すポスターを貼る。',
    exampleReading: 'しみんに こうどうへんようを うながす ぽすたーを はる。',
    exampleKr: '시민에게 행동 변화를 촉구하는 포스터를 붙인다.',
    slot: 'morning',
    tip: '주의/참여를 촉구하다: 注意/参加を促す',
    kanjiDetails: [
      {
        character: '促',
        krMeaning: '재촉할 촉',
        onyomi: 'ソク',
        kunyomi: 'うなが・す',
        radical: '亻 (사람인변)'
      }
    ]
  },
  {
    id: 'm-10',
    kanji: '著しい',
    reading: 'いちじるしい',
    meaning: '현저하다, 눈에 띄다',
    partOfSpeech: 'い형용사',
    exampleJp: '最近、彼の日本語能力には著しい進歩が見られる。',
    exampleReading: 'さいきん、かれの にほんごのうりょくには いちじるしい しんぽが みられる。',
    exampleKr: '최근 그의 일본어 능력에는 현저한 진보가 보인다.',
    slot: 'morning',
    tip: '著(드러날 저) -> 눈에 확 띌 정도로 두드러진 변화',
    kanjiDetails: [
      {
        character: '著',
        krMeaning: '드러날 저 / 나타날 저',
        onyomi: 'チョ, チャク',
        kunyomi: 'いちじる・しい, あらわ・す',
        radical: '艹 (초두머리)'
      }
    ]
  },
  {
    id: 'm-11',
    kanji: '率直',
    reading: 'そっちょく',
    meaning: '솔직함',
    partOfSpeech: 'な형용사',
    exampleJp: '率直なご意見をお聞かせください。',
    exampleReading: 'そっちょくな ごいけんを おきかせください。',
    exampleKr: '솔직한 의견을 들려주십시오.',
    slot: 'morning',
    tip: '솔직한 의견: 率直な意見 (N2 빈출)',
    kanjiDetails: [
      {
        character: '率',
        krMeaning: '거느릴 솔 / 비율 률',
        onyomi: 'ソツ, リツ',
        kunyomi: 'ひき・いる',
        radical: '玄 (검을 현)'
      },
      {
        character: '直',
        krMeaning: '곧을 직',
        onyomi: 'チョク, ジキ',
        kunyomi: 'なお・す, ただ・ちに',
        radical: '目 (눈 목)'
      }
    ]
  },
  {
    id: 'm-12',
    kanji: '克服',
    reading: 'こくふく',
    meaning: '극복',
    partOfSpeech: '명사 / する동사',
    exampleJp: '多くの困難を克服して合格を勝ち取った。',
    exampleReading: 'おおくの こんなんを こくふくして ごうかくを かちとった。',
    exampleKr: '많은 곤란을 극복하고 합격을 쟁취했다.',
    slot: 'morning',
    tip: '약점 극복: 弱点の克服',
    kanjiDetails: [
      {
        character: '克',
        krMeaning: '이길 극',
        onyomi: 'コク',
        kunyomi: 'か・つ',
        radical: '儿 (어진사람발)'
      },
      {
        character: '服',
        krMeaning: '옷 복 / 복종할 복',
        onyomi: 'フク',
        kunyomi: '-',
        radical: '月 (육달월)'
      }
    ]
  },
  {
    id: 'm-13',
    kanji: '相応しい',
    reading: 'ふさわしい',
    meaning: '어울리다, 적합하다',
    partOfSpeech: 'い형용사',
    exampleJp: 'リーダーに相応しい人物を選ぶ。',
    exampleReading: 'りーだーに ふさわしい じんぶつを えらぶ。',
    exampleKr: '리더에 걸맞은 인물을 뽑는다.',
    slot: 'morning',
    tip: '~에 걸맞다, 어울리다: ~に相応しい',
    kanjiDetails: [
      {
        character: '相',
        krMeaning: '서로 상 / 모양 상',
        onyomi: 'ソウ, ショウ',
        kunyomi: 'あい',
        radical: '目 (눈 목)'
      },
      {
        character: '応',
        krMeaning: '응할 응',
        onyomi: 'オウ',
        kunyomi: 'こた・える, ふさわ・しい',
        radical: '广 (엄호)'
      }
    ]
  },
  {
    id: 'm-14',
    kanji: '催促',
    reading: 'さいそく',
    meaning: '재촉, 독촉',
    partOfSpeech: '명사 / する동사',
    exampleJp: '返信が来ないので、再度催促の連絡をした。',
    exampleReading: 'へんしんが こないので、さいど さいそくの れんらくを した。',
    exampleKr: '답장이 오지 않아 다시 재촉 연락을 했다.',
    slot: 'morning',
    tip: '독촉 메일: 催促メール',
    kanjiDetails: [
      {
        character: '催',
        krMeaning: '재촉할 최',
        onyomi: 'サイ',
        kunyomi: 'もよお・す',
        radical: '亻 (사람인변)'
      },
      {
        character: '促',
        krMeaning: '재촉할 촉',
        onyomi: 'ソク',
        kunyomi: 'うなが・す',
        radical: '亻 (사람인변)'
      }
    ]
  },
  {
    id: 'm-15',
    kanji: '紛らわしい',
    reading: 'まぎらわしい',
    meaning: '헷갈리기 쉽다, 혼동하기 쉽다',
    partOfSpeech: 'い형용사',
    exampleJp: '似たような単語が多くて紛らわしい。',
    exampleReading: 'にたような たんごが おおくて まぎらわしい。',
    exampleKr: '비슷한 단어가 많아서 헷갈린다.',
    slot: 'morning',
    tip: 'N2 어휘 시험 단골 1위 오답 형용사!',
    kanjiDetails: [
      {
        character: '紛',
        krMeaning: '어지러울 분',
        onyomi: 'フン',
        kunyomi: 'まぎ・れる, まぎ・らす',
        radical: '糸 (실 사)'
      }
    ]
  },
  {
    id: 'm-16',
    kanji: '怠る',
    reading: 'おこたる',
    meaning: '게을리하다, 방심하다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '日頃の復習を怠ると、すぐに忘れてしまう。',
    exampleReading: 'ひごろの ふくしゅうを おこたると、すぐに わすれてしまう。',
    exampleKr: '평소 복습을 게을리하면 곧 잊어버리고 만다.',
    slot: 'morning',
    tip: '주의를 게을리하다: 注意を怠る',
    kanjiDetails: [
      {
        character: '怠',
        krMeaning: '게으를 태',
        onyomi: 'タイ',
        kunyomi: 'おこた・る, なま・ける',
        radical: '心 (마음 심)'
      }
    ]
  },
  {
    id: 'm-17',
    kanji: '躊躇',
    reading: 'ちゅうちょ',
    meaning: '주저, 망설임',
    partOfSpeech: '명사 / する동사',
    exampleJp: 'チャンスが来たら躊躇せずに挑戦するべきだ。',
    exampleReading: 'ちゃんすが きたら ちゅうちょせずに ちょうせんする べきだ。',
    exampleKr: '기회가 오면 망설이지 말고 도전해야 한다.',
    slot: 'morning',
    tip: '躊躇なく(망설임 없이) 관용 표현 기억!',
    kanjiDetails: [
      {
        character: '躊',
        krMeaning: '머뭇거릴 주',
        onyomi: 'チュウ',
        kunyomi: 'ためら・う',
        radical: '足 (발 족)'
      },
      {
        character: '躇',
        krMeaning: '머뭇거릴 저',
        onyomi: 'チョ',
        kunyomi: 'ためら・う',
        radical: '足 (발 족)'
      }
    ]
  },
  {
    id: 'm-18',
    kanji: '案の定',
    reading: 'あんのじょう',
    meaning: '생각한 대로, 아니나 다를까',
    partOfSpeech: '부사',
    exampleJp: '案の定、電車が遅延して遅刻してしまった。',
    exampleReading: 'あんのじょう、でんしゃが ちえんして ちこくしてしまった。',
    exampleKr: '아니나 다를까 지하철이 지연되어 지각하고 말았다.',
    slot: 'morning',
    tip: '부정적인 예상이 적중했을 때 주로 사용!',
    kanjiDetails: [
      {
        character: '案',
        krMeaning: '책상 안 / 생각 안',
        onyomi: 'アン',
        kunyomi: '-',
        radical: '木 (나무 목)'
      },
      {
        character: '定',
        krMeaning: '정할 정',
        onyomi: 'テイ, ジョウ',
        kunyomi: 'さだ・める',
        radical: '宀 (갓머리)'
      }
    ]
  },
  {
    id: 'm-19',
    kanji: '目処',
    reading: 'めど',
    meaning: '목표, 가늠, 전망',
    partOfSpeech: '명사',
    exampleJp: '今月中に解決の目処が立った。',
    exampleReading: 'こんげつじゅうに かいけつの めどが たった。',
    exampleKr: '이번 달 안에 해결될 전망이 섰다.',
    slot: 'morning',
    tip: '目処が立つ(전망이 서다) 세트로 암기!',
    kanjiDetails: [
      {
        character: '目',
        krMeaning: '눈 목',
        onyomi: 'モク, ボク',
        kunyomi: 'め, ま',
        radical: '目 (눈 목)'
      },
      {
        character: '処',
        krMeaning: '곳 처 / 살 처',
        onyomi: 'ショ',
        kunyomi: 'ところ',
        radical: '几 (안석 궤)'
      }
    ]
  },
  {
    id: 'm-20',
    kanji: '惜しい',
    reading: 'おしい',
    meaning: '아쉽다, 아깝다',
    partOfSpeech: 'い형용사',
    exampleJp: 'あと一歩のところで惜しくも合格を逃した。',
    exampleReading: 'あといっぽの ところで おしくも ごうかくを のがした。',
    exampleKr: '한 걸음 차이로 아쉽게도 합격을 놓쳤다.',
    slot: 'morning',
    tip: '惜しいチャンス: 아까운 기회',
    kanjiDetails: [
      {
        character: '惜',
        krMeaning: '아낄 석',
        onyomi: 'セキ',
        kunyomi: 'お・しい, お・しむ',
        radical: '忄 (심방변 / 마음 심)'
      }
    ]
  },
  {
    id: 'm-21',
    kanji: '潔い',
    reading: 'いさぎよい',
    meaning: '깨끗하다, 미련이 없다, 당당하다',
    partOfSpeech: 'い형용사',
    exampleJp: '自分の非を潔く認めて謝罪した。',
    exampleReading: 'じぶんの ひを いさぎよく みとめて しゃざいした。',
    exampleKr: '자신의 잘못을 깨끗이 인정하고 사과했다.',
    slot: 'morning',
    tip: '潔い態度: 뒤끝 없는 깔끔한 태도',
    kanjiDetails: [
      {
        character: '潔',
        krMeaning: '깨끗할 결',
        onyomi: 'ケツ',
        kunyomi: 'いさぎよ・い',
        radical: '氵 (삼수변 / 물 수)'
      }
    ]
  },
  {
    id: 'm-22',
    kanji: '過密',
    reading: 'かみつ',
    meaning: '과밀, 너무 빽빽함',
    partOfSpeech: '명사 / な형용사',
    exampleJp: '過密なスケジュールで体調を崩さないように注意しよう。',
    exampleReading: 'かみつな すけじゅーるで たいちょうを くずさないように ちゅういしよう。',
    exampleKr: '과밀한 일정으로 몸이 상하지 않도록 주의하자.',
    slot: 'morning',
    tip: '과밀 일정: 過密日程(かみつにってい)',
    kanjiDetails: [
      {
        character: '過',
        krMeaning: '지날 과 / 허물 과',
        onyomi: 'カ',
        kunyomi: 'す・ぎる, あやま・ち',
        radical: '辶 (책받침)'
      },
      {
        character: '密',
        krMeaning: '빽빽할 밀',
        onyomi: 'ミツ',
        kunyomi: 'ひそ・か',
        radical: '宀 (갓머리)'
      }
    ]
  },
  {
    id: 'm-23',
    kanji: '朗報',
    reading: 'ろうほう',
    meaning: '낭보, 기쁜 소식',
    partOfSpeech: '명사',
    exampleJp: '試験に合格したという朗報が届いた。',
    exampleReading: 'しけんに ごうかくした という ろうほうが とどいた。',
    exampleKr: '시험에 합격했다는 기쁜 소식이 도착했다.',
    slot: 'morning',
    tip: '밝을 랑(朗) + 알릴 보(報)',
    kanjiDetails: [
      {
        character: '朗',
        krMeaning: '밝을 랑',
        onyomi: 'ロウ',
        kunyomi: 'ほが・らか',
        radical: '月 (달 월)'
      },
      {
        character: '報',
        krMeaning: '갚을 보 / 알릴 보',
        onyomi: 'ホウ',
        kunyomi: 'むく・いる',
        radical: '土 (흙 토)'
      }
    ]
  },
  {
    id: 'm-24',
    kanji: '念頭',
    reading: 'ねんとう',
    meaning: '염두, 마음속 생각',
    partOfSpeech: '명사',
    exampleJp: '常に相手の立場を念頭に置いて話す。',
    exampleReading: 'つねに あいての たちばを ねんとうに おいて はなす。',
    exampleKr: '항상 상대방의 입장을 염두에 두고 이야기한다.',
    slot: 'morning',
    tip: '念頭に置く(~을 염두에 두다) 숙어 빈출',
    kanjiDetails: [
      {
        character: '念',
        krMeaning: '생각 념',
        onyomi: 'ネン',
        kunyomi: '-',
        radical: '心 (마음 심)'
      },
      {
        character: '頭',
        krMeaning: '머리 두',
        onyomi: 'トウ, ズ',
        kunyomi: 'あたま, かしら',
        radical: '頁 (머리 혈)'
      }
    ]
  },
  {
    id: 'm-25',
    kanji: '補う',
    reading: 'おぎなう',
    meaning: '보충하다, 메우다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '不足している知識を毎日の学習で補う。',
    exampleReading: 'ふそくしている ちしきを まいにちの がくしゅうで おぎなう。',
    exampleKr: '부족한 지식을 매일의 학습으로 보충한다.',
    slot: 'morning',
    tip: '부족분을 보충하다: 不足を補う',
    kanjiDetails: [
      {
        character: '補',
        krMeaning: '기울 보 / 도울 보',
        onyomi: 'ホ',
        kunyomi: 'おぎな・う',
        radical: '衤 (옷의변)'
      }
    ]
  },

  // ==========================================
  // 퇴근길 25개 (Evening Commute 25)
  // ==========================================
  {
    id: 'e-01',
    kanji: '一概に',
    reading: 'いちがいに',
    meaning: '일괄적으로, 딱 잘라',
    partOfSpeech: '부사',
    exampleJp: '古いものが悪いとは一概には言えない。',
    exampleReading: 'ふるい ものが わるいとは いちがいには いえない。',
    exampleKr: '오래된 것이 나쁘다고는 일률적으로 말할 수 없다.',
    slot: 'evening',
    tip: '뒤에 주로 부정표현(一概に〜とは言えない)과 호응!',
    kanjiDetails: [
      {
        character: '一',
        krMeaning: '한 일',
        onyomi: 'イチ, イツ',
        kunyomi: 'ひと・つ',
        radical: '一 (한 일)'
      },
      {
        character: '概',
        krMeaning: '대개 개 / 평미레 개',
        onyomi: 'ガイ',
        kunyomi: 'おおむ・ね',
        radical: '木 (나무 목)'
      }
    ]
  },
  {
    id: 'e-02',
    kanji: '煩雑',
    reading: 'はんざつ',
    meaning: '번잡함, 복잡하고 어수선함',
    partOfSpeech: 'な형용사 / 명사',
    exampleJp: '手続きが煩雑で、時間がかなりかかった。',
    exampleReading: 'てつづきが はんざつで、じかんが かなり かかった。',
    exampleKr: '절차가 번잡해서 시간이 꽤 걸렸다.',
    slot: 'evening',
    tip: '복잡하고 귀찮을 때: 煩雑な業務',
    kanjiDetails: [
      {
        character: '煩',
        krMeaning: '번거로울 번',
        onyomi: 'ハン, ボン',
        kunyomi: 'わずら・う',
        radical: '火 (불 화)'
      },
      {
        character: '雑',
        krMeaning: '섞일 잡',
        onyomi: 'ザツ, ゾウ',
        kunyomi: 'まじ・る',
        radical: '隹 (새 추)'
      }
    ]
  },
  {
    id: 'e-03',
    kanji: '免除',
    reading: 'めんじょ',
    meaning: '면제',
    partOfSpeech: '명사 / する동사',
    exampleJp: '成績優秀者は授業料が免除される。',
    exampleReading: 'せいせきゆうしゅうしゃは じゅぎょうりょうが めんじょされる。',
    exampleKr: '성적 우수자는 수업료가 면제된다.',
    slot: 'evening',
    tip: '수수료 면제: 手数料免除',
    kanjiDetails: [
      {
        character: '免',
        krMeaning: '면할 면',
        onyomi: 'メン',
        kunyomi: 'まぬか・れる',
        radical: '儿 (어진사람발)'
      },
      {
        character: '除',
        krMeaning: '덜 제 / 없앨 제',
        onyomi: 'ジョ, ジ',
        kunyomi: 'のぞ・く',
        radical: '阝 (좌부변 / 언덕 부)'
      }
    ]
  },
  {
    id: 'e-04',
    kanji: '遂行',
    reading: 'すいこう',
    meaning: '수행, 완수',
    partOfSpeech: '명사 / する동사',
    exampleJp: '困難な任務を最後まで遂行した。',
    exampleReading: 'こんなんな にんむを さいごまで すいこうした。',
    exampleKr: '어려운 임무를 끝까지 수행했다.',
    slot: 'evening',
    tip: '업무 완수: 業務を遂行する',
    kanjiDetails: [
      {
        character: '遂',
        krMeaning: '드디어 수 / 이룰 수',
        onyomi: 'スイ',
        kunyomi: 'と・げる',
        radical: '辶 (책받침)'
      },
      {
        character: '行',
        krMeaning: '다닐 행 / 행할 행',
        onyomi: 'コウ, ギョウ',
        kunyomi: 'い・く, おこな・う',
        radical: '行 (다닐 행)'
      }
    ]
  },
  {
    id: 'e-05',
    kanji: '巧み',
    reading: 'たくみ',
    meaning: '교묘함, 솜씨가 빼어남',
    partOfSpeech: 'な형용사 / 명사',
    exampleJp: '巧みな話術で相手を説得した。',
    exampleReading: 'たくみな わじゅつで あいてを せっとくした。',
    exampleKr: '교묘한 화술로 상대를 설득했다.',
    slot: 'evening',
    tip: '巧みに(교묘하게/솜씨 좋게)',
    kanjiDetails: [
      {
        character: '巧',
        krMeaning: '공교할 교 / 솜씨 좋을 교',
        onyomi: 'コウ',
        kunyomi: 'たく・み, たく・みな',
        radical: '工 (장인 공)'
      }
    ]
  },
  {
    id: 'e-06',
    kanji: '還元',
    reading: 'かんげん',
    meaning: '환원, 되돌려줌',
    partOfSpeech: '명사 / する동사',
    exampleJp: '利益の一部を社会に還元する。',
    exampleReading: 'りえきの いちぶを しゃかいに かんげんする。',
    exampleKr: '이익의 일부를 사회에 환원한다.',
    slot: 'evening',
    tip: '포인트 환원: ポイント還元',
    kanjiDetails: [
      {
        character: '還',
        krMeaning: '돌아올 환',
        onyomi: 'カン',
        kunyomi: 'かえ・る',
        radical: '辶 (책받침)'
      },
      {
        character: '元',
        krMeaning: '으뜸 원 / 근원 원',
        onyomi: 'ゲン, ガン',
        kunyomi: 'もと',
        radical: '儿 (어진사람발)'
      }
    ]
  },
  {
    id: 'e-07',
    kanji: '偏る',
    reading: 'かたよる',
    meaning: '치우치다, 편중되다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '偏った見方は判断を誤らせる原因になる。',
    exampleReading: 'かたよった みかたは はんだんを あやまらせる げんいんに なる。',
    exampleKr: '치우친 시각은 판단을 그르치게 하는 원인이 된다.',
    slot: 'evening',
    tip: '영양 편중: 栄養が偏る',
    kanjiDetails: [
      {
        character: '偏',
        krMeaning: '치우칠 편',
        onyomi: 'ヘン',
        kunyomi: 'かたよ・る',
        radical: '亻 (사람인변)'
      }
    ]
  },
  {
    id: 'e-08',
    kanji: '兆し',
    reading: 'きざし',
    meaning: '조짐, 징조',
    partOfSpeech: '명사',
    exampleJp: '景気回復の兆しが見え始めている。',
    exampleReading: 'けいきかいふくの きざしが みえはじめている。',
    exampleKr: '경기 회복 조짐이 보이기 시작하고 있다.',
    slot: 'evening',
    tip: '좋은 징조/회복 조짐: 回復の兆し',
    kanjiDetails: [
      {
        character: '兆',
        krMeaning: '조짐 조 / 억조 조',
        onyomi: 'チョウ',
        kunyomi: 'きざ・す, きざ・し',
        radical: '儿 (어진사람발)'
      }
    ]
  },
  {
    id: 'e-09',
    kanji: '意図',
    reading: 'いと',
    meaning: '의도',
    partOfSpeech: '명사 / する동사',
    exampleJp: '発言の意図を正確に汲み取る。',
    exampleReading: 'はつげんの いとを せいかくに くみとる。',
    exampleKr: '발언의 의도를 정확하게 헤아리다.',
    slot: 'evening',
    tip: '의도치 않게: 意図せず(いとせず)',
    kanjiDetails: [
      {
        character: '意',
        krMeaning: '뜻 의',
        onyomi: 'イ',
        kunyomi: '-',
        radical: '心 (마음 심)'
      },
      {
        character: '図',
        krMeaning: '그림 도 / 꾀할 도',
        onyomi: 'ズ, ト',
        kunyomi: 'え, はか・る',
        radical: '囗 (큰입구몸)'
      }
    ]
  },
  {
    id: 'e-10',
    kanji: '束縛',
    reading: 'そくばく',
    meaning: '속박, 구속',
    partOfSpeech: '명사 / する동사',
    exampleJp: '時間に束縛されずに自由に働きたい。',
    exampleReading: 'じかんに そくばくされずに じゆうに はたらきたい。',
    exampleKr: '시간에 속박되지 않고 자유롭게 일하고 싶다.',
    slot: 'evening',
    tip: '자유를 억누르는 굴레: 束縛',
    kanjiDetails: [
      {
        character: '束',
        krMeaning: '묶을 속',
        onyomi: 'ソク',
        kunyomi: 'たば, たば・ねる',
        radical: '木 (나무 목)'
      },
      {
        character: '縛',
        krMeaning: '얽을 박 / 묶을 박',
        onyomi: 'バク',
        kunyomi: 'しば・る',
        radical: '糸 (실 사)'
      }
    ]
  },
  {
    id: 'e-11',
    kanji: '該当',
    reading: 'がいとう',
    meaning: '해당',
    partOfSpeech: '명사 / する동사',
    exampleJp: '条件に該当する項目にチェックを入れてください。',
    exampleReading: 'じょうけんに がいとうする こうもくに ちぇっくを いれてください。',
    exampleKr: '조건에 해당하는 항목에 체크해 주세요.',
    slot: 'evening',
    tip: '해당자: 該当者(がいとうしゃ)',
    kanjiDetails: [
      {
        character: '該',
        krMeaning: '마땅할 해 / 일치할 해',
        onyomi: 'ガイ',
        kunyomi: '-',
        radical: '言 (말씀 언)'
      },
      {
        character: '当',
        krMeaning: '마땅 당',
        onyomi: 'トウ',
        kunyomi: 'あ・たる',
        radical: '⺌ (작을 소)'
      }
    ]
  },
  {
    id: 'e-12',
    kanji: '見当違い',
    reading: 'けんとうちがい',
    meaning: '엉뚱한 짐작, 번지수 잘못 찾음',
    partOfSpeech: '명사 / な형용사',
    exampleJp: '彼を疑うなんて見当違いもいいところだ。',
    exampleReading: 'かれを うたがうなんて けんとうちがいも いいところだ。',
    exampleKr: '그를 의심하다니 완전 엉뚱한 짚기다.',
    slot: 'evening',
    tip: '짐작(見当)이 어긋남(違い)!',
    kanjiDetails: [
      {
        character: '見',
        krMeaning: '볼 견',
        onyomi: 'ケン',
        kunyomi: 'み・る',
        radical: '見 (볼 견)'
      },
      {
        character: '当',
        krMeaning: '마땅 당',
        onyomi: 'トウ',
        kunyomi: 'あ・たる',
        radical: '⺌ (작을 소)'
      },
      {
        character: '違',
        krMeaning: '어긋날 위 / 다를 위',
        onyomi: 'イ',
        kunyomi: 'ちが・う, ちが・える',
        radical: '辶 (책받침)'
      }
    ]
  },
  {
    id: 'e-13',
    kanji: '一息',
    reading: 'ひといき',
    meaning: '숨 한 번 돌림, 한숨 쉼',
    partOfSpeech: '명사',
    exampleJp: 'ここで一息入れて、また頑張りましょう。',
    exampleReading: 'ここで ひといきいれて、また がんばりましょう。',
    exampleKr: '여기서 한숨 돌리고, 다시 힘냅시다.',
    slot: 'evening',
    tip: '一息入れる: 한숨 돌리다, 쉬어가다',
    kanjiDetails: [
      {
        character: '一',
        krMeaning: '한 일',
        onyomi: 'イチ, イツ',
        kunyomi: 'ひと・つ',
        radical: '一 (한 일)'
      },
      {
        character: '息',
        krMeaning: '숨 쉴 식',
        onyomi: 'ソク',
        kunyomi: 'いき',
        radical: '心 (마음 심)'
      }
    ]
  },
  {
    id: 'e-14',
    kanji: '戸惑う',
    reading: 'とまどう',
    meaning: '당황하다, 갈피를 못 잡다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '新しい職場環境に初めは戸惑った。',
    exampleReading: 'あたらしい しょくばかんきょうに はじめは とまどった。',
    exampleKr: '새로운 직장 환경에 처음에는 당황했다.',
    slot: 'evening',
    tip: '문 앞(戸)에서 헤매는(惑う) 모습 연상!',
    kanjiDetails: [
      {
        character: '戸',
        krMeaning: '지게문 호 / 집 호',
        onyomi: 'コ',
        kunyomi: 'と',
        radical: '戸 (지게문 호)'
      },
      {
        character: '惑',
        krMeaning: '미혹할 혹',
        onyomi: 'ワク',
        kunyomi: 'まど・う, まど・わす',
        radical: '心 (마음 심)'
      }
    ]
  },
  {
    id: 'e-15',
    kanji: '重宝',
    reading: 'ちょうほう',
    meaning: '요긴하게 씀, 편리함',
    partOfSpeech: '명사 / な형용사 / する동사',
    exampleJp: 'この単語帳アプリは電車内でとても重宝している。',
    exampleReading: 'この たんごちょうあぷりは でんしゃないで とても ちょうほうしている。',
    exampleKr: '이 단어장 앱은 전철 안에서 아주 요긴하게 쓰고 있다.',
    slot: 'evening',
    tip: '귀중한 보물(重宝)처럼 편리하게 잘 쓰다',
    kanjiDetails: [
      {
        character: '重',
        krMeaning: '무거울 중 / 소중할 중',
        onyomi: 'ジュウ, チョウ',
        kunyomi: 'おも・い, かさ・なる',
        radical: '里 (마을 리)'
      },
      {
        character: '宝',
        krMeaning: '보배 보',
        onyomi: 'ホウ',
        kunyomi: 'たから',
        radical: '宀 (갓머리)'
      }
    ]
  },
  {
    id: 'e-16',
    kanji: '気配',
    reading: 'けはい',
    meaning: '기척, 낌새, 기미',
    partOfSpeech: '명사',
    exampleJp: '雨が降る気配は全くない。',
    exampleReading: 'あめが ふる けはいは まったくない。',
    exampleKr: '비가 올 기척은 전혀 없다.',
    slot: 'evening',
    tip: '독음 주의! [きはい X -> けはい O]',
    kanjiDetails: [
      {
        character: '気',
        krMeaning: '기운 기',
        onyomi: 'キ, ケ',
        kunyomi: 'いき',
        radical: '气 (기운 기 엄)'
      },
      {
        character: '配',
        krMeaning: '나눌 배 / 짝 배',
        onyomi: 'ハイ',
        kunyomi: 'くば・る',
        radical: '酉 (닭 유)'
      }
    ]
  },
  {
    id: 'e-17',
    kanji: '手薄',
    reading: 'てうす',
    meaning: '허술함, 일손이나 준비가 부족함',
    partOfSpeech: 'な형용사 / 명사',
    exampleJp: '連休中は人員が手薄になりがちだ。',
    exampleReading: 'れんきゅうちゅうは じんいんが てうすに なりがちだ。',
    exampleKr: '연휴 중에는 인원이 부족해지기 십상이다.',
    slot: 'evening',
    tip: '손(手)이 얇음(薄) -> 인력 부족',
    kanjiDetails: [
      {
        character: '手',
        krMeaning: '손 수',
        onyomi: 'シュ',
        kunyomi: 'て',
        radical: '手 (손 수)'
      },
      {
        character: '薄',
        krMeaning: '엷을 박 / 적을 박',
        onyomi: 'ハク',
        kunyomi: 'うす・い',
        radical: '艹 (초두머리)'
      }
    ]
  },
  {
    id: 'e-18',
    kanji: '手掛かり',
    reading: 'てがかり',
    meaning: '단서, 실마리',
    partOfSpeech: '명사',
    exampleJp: '事件解決の手掛かりが見つかった。',
    exampleReading: 'じけんかいけつの てがかりが みつかった。',
    exampleKr: '사건 해결의 단서를 찾았다.',
    slot: 'evening',
    tip: '손을 걸 수 있는 곳 -> 문제 해결의 실마리',
    kanjiDetails: [
      {
        character: '手',
        krMeaning: '손 수',
        onyomi: 'シュ',
        kunyomi: 'て',
        radical: '手 (손 수)'
      },
      {
        character: '掛',
        krMeaning: '걸 괘',
        onyomi: 'カイ',
        kunyomi: 'か・ける, か・かる',
        radical: '扌 (재방변 / 손 수)'
      }
    ]
  },
  {
    id: 'e-19',
    kanji: '辻褄',
    reading: 'つじつま',
    meaning: '앞뒤 조리, 앞뒤 맥락',
    partOfSpeech: '명사',
    exampleJp: '彼の説明は辻褄が合わない。',
    exampleReading: 'かれの せつめいは つじつまが あわない。',
    exampleKr: '그의 설명은 앞뒤가 맞지 않는다.',
    slot: 'evening',
    tip: '辻褄が合う(앞뒤가 맞다) / 辻褄が合わない(앞뒤가 안 맞다)',
    kanjiDetails: [
      {
        character: '辻',
        krMeaning: '네거리 십 (일본 국자)',
        onyomi: '-',
        kunyomi: 'つじ',
        radical: '辶 (책받침)'
      },
      {
        character: '褄',
        krMeaning: '옷자락 처',
        onyomi: 'サイ',
        kunyomi: 'つま',
        radical: '衤 (옷의변)'
      }
    ]
  },
  {
    id: 'e-20',
    kanji: '融通',
    reading: 'ゆうずう',
    meaning: '융통성, 융통함',
    partOfSpeech: '명사 / する동사',
    exampleJp: '規則に縛られず、臨機応変に融通を利かせる。',
    exampleReading: 'きそくに しばられず、りんきおうへんに ゆうずうを きかせる。',
    exampleKr: '규칙에 얽매이지 않고 임기응변으로 융통성을 발휘하다.',
    slot: 'evening',
    tip: '融通が利く(융통성이 있다) 필수 관용구!',
    kanjiDetails: [
      {
        character: '融',
        krMeaning: '녹을 융 / 화할 융',
        onyomi: 'ユウ',
        kunyomi: 'と・ける',
        radical: '虫 (벌레 충)'
      },
      {
        character: '通',
        krMeaning: '통할 통',
        onyomi: 'ツウ, ツ',
        kunyomi: 'とお・る, かよ・う',
        radical: '辶 (책받침)'
      }
    ]
  },
  {
    id: 'e-21',
    kanji: '名残',
    reading: 'なごり',
    meaning: '자취, 잔재, 여운',
    partOfSpeech: '명사',
    exampleJp: '冬の名残を感じる冷たい風が吹く。',
    exampleReading: 'ふゆの なごりを かんじる つめたい かぜが ふく。',
    exampleKr: '겨울의 자취가 느껴지는 찬 바람이 분다.',
    slot: 'evening',
    tip: '독음 시험 빈출 특이 읽기!',
    kanjiDetails: [
      {
        character: '名',
        krMeaning: '이름 명',
        onyomi: 'メイ, ミョウ',
        kunyomi: 'な',
        radical: '口 (입 구)'
      },
      {
        character: '残',
        krMeaning: '남을 잔',
        onyomi: 'ザン',
        kunyomi: 'のこ・る, のこ・す',
        radical: '歹 (죽을사변)'
      }
    ]
  },
  {
    id: 'e-22',
    kanji: '目覚ましい',
    reading: 'めざましい',
    meaning: '눈부시다, 괄목할 만하다',
    partOfSpeech: 'い형용사',
    exampleJp: 'テクノロジーの目覚ましい発展に驚かされる。',
    exampleReading: 'てくのろじーの めざましい はってんに おどろかされる。',
    exampleKr: '기술의 눈부신 발전에 놀라게 된다.',
    slot: 'evening',
    tip: '눈이 번쩍 뜨일 만큼 놀라운 발전: 目覚ましい進歩',
    kanjiDetails: [
      {
        character: '目',
        krMeaning: '눈 목',
        onyomi: 'モク',
        kunyomi: 'め',
        radical: '目 (눈 목)'
      },
      {
        character: '覚',
        krMeaning: '깨달을 각 / 깰 각',
        onyomi: 'カク',
        kunyomi: 'おぼ・える, さ・める',
        radical: '見 (볼 견)'
      }
    ]
  },
  {
    id: 'e-23',
    kanji: '控える',
    reading: 'ひかえる',
    meaning: '삼가다, 앞두다, 메모해두다',
    partOfSpeech: '2그룹 동사',
    exampleJp: '試験を間近に控えているので夜更かしを控える。',
    exampleReading: 'しけんを まぢかに ひかえているので よふかしを ひかえる。',
    exampleKr: '시험을 목전에 앞두고 있으므로 밤샘을 삼간다.',
    slot: 'evening',
    tip: '두 가지 뜻 모두 N2 독해 핵심 (앞두다 & 삼가다)!',
    kanjiDetails: [
      {
        character: '控',
        krMeaning: '당길 강 / 절제할 강',
        onyomi: 'コウ',
        kunyomi: 'ひか・える',
        radical: '扌 (재방변 / 손 수)'
      }
    ]
  },
  {
    id: 'e-24',
    kanji: '携わる',
    reading: 'たずさわる',
    meaning: '종사하다, 관여하다',
    partOfSpeech: '1그룹 동사',
    exampleJp: '教育事業に携わることに誇りを持っている。',
    exampleReading: 'きょういくじぎょうに たずさわる ことに ほこりを もっている。',
    exampleKr: '교육 사업에 종사하는 것에 자부심을 가지고 있다.',
    slot: 'evening',
    tip: '일이나 분야에 관여할 때: ~に携わる',
    kanjiDetails: [
      {
        character: '携',
        krMeaning: '이끌 휴 / 가질 휴',
        onyomi: 'ケイ',
        kunyomi: 'たずさ・える, たずさ・わる',
        radical: '扌 (재방변 / 손 수)'
      }
    ]
  },
  {
    id: 'e-25',
    kanji: '着目',
    reading: 'ちゃくもく',
    meaning: '착목, 주목함',
    partOfSpeech: '명사 / する동사',
    exampleJp: '新しい視点に着目して課題を解決する。',
    exampleReading: 'あたらしい してんに ちゃくもくして かだいを取り組む。',
    exampleKr: '새로운 관점에 착안/주목하여 과제를 해결한다.',
    slot: 'evening',
    tip: '시선이나 주의를 집중시킬 때: ~に着目する',
    kanjiDetails: [
      {
        character: '着',
        krMeaning: '붙을 착 / 입을 착',
        onyomi: 'チャク, ジャク',
        kunyomi: 'き・る, つ・く',
        radical: '目 (눈 목)'
      },
      {
        character: '目',
        krMeaning: '눈 목',
        onyomi: 'モク',
        kunyomi: 'め',
        radical: '目 (눈 목)'
      }
    ]
  }
];
