import { RoutineTask } from '../types';

export const WEEKDAY_ROUTINES: RoutineTask[] = [
  {
    id: 'routine-01',
    timeSlot: '오전 08:00 ~ 08:30 (출근 지하철)',
    title: '출근길 단어 25개 플래시카드 스프린트',
    description: '지하철 서서 가는 동안 스마트폰으로 한 손 암기. 모르는 단어만 체크해 두기.',
    tag: '어휘',
    duration: '20~25분',
    targetTab: 'vocab'
  },
  {
    id: 'routine-02',
    timeSlot: '점심 12:30 ~ 12:45 (식사 후 10분)',
    title: '10분 문법 퀘스트 1개 클리어 + 유튜브 1편',
    description: '수수동 or 경어 등 헷갈리는 문법 공식 1개만 확실히 이해하고 예문 소리 내어 읽기.',
    tag: '문법',
    duration: '10~15분',
    targetTab: 'grammar'
  },
  {
    id: 'routine-03',
    timeSlot: '오후 18:30 ~ 19:00 (퇴근 지하철)',
    title: '퇴근길 단어 25개 암기 + 아침 단어 복습',
    description: '피곤하지만 딱 25개만 집중! 아침에 헷갈렸던 단어와 함께 빠른 훑어보기.',
    tag: '어휘',
    duration: '25분',
    targetTab: 'vocab'
  },
  {
    id: 'routine-04',
    timeSlot: '밤 22:30 ~ 23:00 (취침 전 20분)',
    title: '단문 독해 1지문 3분 컷 & 실전 퀴즈 3문제',
    description: '침대에서 편하게 질문 먼저 읽고 키워드 찾기 훈련 + 퀴즈로 오늘 공부 매듭짓기.',
    tag: '독해/퀴즈',
    duration: '20분',
    targetTab: 'reading'
  }
];

export const WEEKEND_CHECKLIST = [
  {
    id: 'wk-01',
    title: '주말 N2 하프 모의고사 (언어지식 + 독해 35분)',
    desc: '실제 시험 시간의 절반 분량으로 시간 재고 실전 감각 기르기',
    tip: '독해는 단문 2분, 중문 6분 제한시간 엄수'
  },
  {
    id: 'wk-02',
    title: '주간 오답노트 1회 정독 (틀린 문법 & 한자만)',
    desc: '평일 동안 헷갈렸던 단어와 틀린 퀴즈 문제 다시 훑기',
    tip: '틀린 이유를 한 줄 메모로 남기면 장기 기억 전환'
  },
  {
    id: 'wk-03',
    title: 'JLPT N2 청해 즉각응답 쉐도잉 (20분)',
    desc: '짧은 질문에 바로 정답 고르는 파트 5 연습',
    tip: '지하철이나 산책할 때 귀로 듣고 입으로 따라 하기'
  }
];

export interface ExternalResource {
  name: string;
  category: string;
  desc: string;
  badge: string;
  url: string;
}

export const EXTERNAL_RESOURCES: ExternalResource[] = [
  {
    name: 'JLPT 일본어능력시험 공식 사이트',
    category: '공식 기출 & 시험 정보',
    desc: '일본 국제교류기금 공식 문제 샘플, 시험 일정 안내, 공식 기출 견본 PDF 다운로드 제공.',
    badge: '공식 홈페이지',
    url: 'https://www.jlpt.jp/e/samples/sampleindex.html'
  },
  {
    name: '다락원 일본어 수험 자료실',
    category: '기출 분석 & 어휘 MP3',
    desc: 'JLPT N2 필수 한자표, 모의고사 해설 및 단어장 무료 MP3 음원 다운로드 제공.',
    badge: '국내 대표 수험포털',
    url: 'https://www.darakwon.co.kr'
  },
  {
    name: '일본국제교류기금 (JF) Minato',
    category: '공식 무료 e-Learning',
    desc: '일본 정부 산하 국제교류기금이 운영하는 무료 일본어 온라인 강좌 및 레벨 테스트.',
    badge: '공식 무료 학습',
    url: 'https://minato-jf.jp'
  },
  {
    name: '네이버 일본어 사전 (JLPT N2 단어장)',
    category: '사전 & 발음 듣기',
    desc: '등급별 JLPT N2 표제어 모음, 상세 예문 및 네이티브 일본어 발음 무료 제공.',
    badge: '필수 사전 도구',
    url: 'https://ja.dict.naver.com'
  },
  {
    name: 'NHK NEWS WEB EASY',
    category: '실전 독해 트레이닝',
    desc: '후리가나와 음성이 지원되는 쉬운 일본어 최신 뉴스. N2 독해 속독 실력 향상에 최적.',
    badge: '무료 시사 독해',
    url: 'https://www3.nhk.or.jp/news/easy/'
  }
];
