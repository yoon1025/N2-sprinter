export interface PraiseQuote {
  title: string;
  message: string;
  coachNote: string;
}

export const PRAISE_MESSAGES: PraiseQuote[] = [
  {
    title: "대단해요! 1단계 돌파! 🚀",
    message: "퇴근길 피곤한 몸을 이끌고 해낸 당신, 정말 대단합니다!",
    coachNote: "작은 1개 완료가 모여 N2 합격증이 됩니다. 지금 뇌에 완벽히 각인되었어요."
  },
  {
    title: "이 페이스라면 합격 확실합니다! 🎯",
    message: "집중력 폭발! 쪼개기 학습의 위력을 제대로 발휘하고 계시네요.",
    coachNote: "지하철 15분의 기적! 남들이 멍하니 쇼츠 볼 때 합격권으로 질주 중입니다."
  },
  {
    title: "상위 1% 실행력 인정! ⚡",
    message: "일과 공부를 병행하는 건 결코 쉽지 않지만 해내고 있습니다.",
    coachNote: "N2 독해와 청해는 꾸준한 어휘 누적이 90%입니다. 완벽한 페이스예요!"
  },
  {
    title: "도파민 충전 완료! 🔥",
    message: "오늘 미션 한 칸 클리어! 뇌세포가 N2 뇌로 진화하는 중입니다.",
    coachNote: "단어 25개 암기는 합격선 90점 돌파를 위한 최고의 무기입니다."
  },
  {
    title: "합격 시그널 감지! 💯",
    message: "오늘의 누적 학습량이 N2 합격 턱걸이가 아닌 고득점 합격을 만듭니다.",
    coachNote: "헷갈렸던 문형도 이렇게 체크해 두면 실전 시험장에서 바로 튀어나옵니다."
  },
  {
    title: "완벽한 스프린트! 🏃‍♂️",
    message: "짧은 시간 몰입이 3시간 멍때리는 공부보다 10배 효과적입니다.",
    coachNote: "출퇴근 자투리 시간 30분이 한 달이면 15시간의 순공 시간이 됩니다!"
  },
  {
    title: "JLPT 합격 코치의 감탄! ⭐",
    message: "피곤을 이겨낸 자기관리, 스스로를 마음껏 칭찬해 주세요!",
    coachNote: "주말 모의고사에서 오늘 외운 표현이 분명히 지문에 등장할 거예요."
  }
];

export const getRandomPraise = (): PraiseQuote => {
  const index = Math.floor(Math.random() * PRAISE_MESSAGES.length);
  return PRAISE_MESSAGES[index];
};

export const DAILY_MOTIVATIONS = [
  "퇴근 후 10분이 주말 5시간보다 값집니다. 오늘도 1문장만 더!",
  "N2는 천재를 뽑는 시험이 아니라 꾸준히 본 사람을 붙여주는 시험입니다.",
  "출퇴근길 지하철 손잡이를 잡고 외운 단어가 시험장에선 가장 먼저 떠오릅니다.",
  "집중력이 짧아도 괜찮습니다. 5분씩 6번 쪼개면 30분 완주입니다!",
  "당신의 꾸준한 열정은 배신하지 않습니다. 합격증을 쥐는 그날을 상상해보세요."
];
