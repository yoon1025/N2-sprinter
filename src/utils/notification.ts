import { soundService } from './sound';

export interface AlarmSetting {
  id: string;
  title: string;
  time: string; // e.g. '08:00'
  enabled: boolean;
  message: string;
  category: 'morning' | 'lunch' | 'evening' | 'night';
}

export const DEFAULT_ALARMS: AlarmSetting[] = [
  {
    id: 'alarm-morning',
    title: '🌅 출근길 단어 스프린트',
    time: '08:00',
    enabled: true,
    message: '지하철 탑승하셨나요? 출근길 20분, N2 단어 25개 플래시카드로 가볍게 시작해요!',
    category: 'morning'
  },
  {
    id: 'alarm-lunch',
    title: '🍱 점심 10분 문법 퀘스트',
    time: '12:30',
    enabled: true,
    message: '식사 후 딱 10분! 수수동·경어 퀘스트 1개 풀고 유튜브 핵심 강의 확인하세요.',
    category: 'lunch'
  },
  {
    id: 'alarm-evening',
    title: '🚇 퇴근길 단어 복습 & 25개',
    time: '18:30',
    enabled: true,
    message: '오늘 하루도 수고하셨습니다! 퇴근길 지하철에서 25개 암기하고 하루 50개 채워봐요.',
    category: 'evening'
  },
  {
    id: 'alarm-night',
    title: '🌙 취침 전 3분 단문 독해 & 퀴즈',
    time: '22:30',
    enabled: true,
    message: '침대에서 편하게 1지문 풀고 미니 퀴즈 3문제로 오늘 학습을 완벽하게 마무리해요.',
    category: 'night'
  }
];

const ALARM_STORAGE_KEY = 'n2_alarm_settings';
const LAST_NOTIFIED_KEY = 'n2_last_notified_timestamps';

export const getStoredAlarms = (): AlarmSetting[] => {
  try {
    const saved = localStorage.getItem(ALARM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return DEFAULT_ALARMS;
};

export const saveStoredAlarms = (alarms: AlarmSetting[]) => {
  try {
    localStorage.setItem(ALARM_STORAGE_KEY, JSON.stringify(alarms));
  } catch {
    // fallback
  }
};

// Check if browser notifications are supported & allowed
export const checkNotificationPermission = (): NotificationPermission | 'unsupported' => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
};

// Request system notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    const perm = await Notification.requestPermission();
    return perm === 'granted';
  } catch {
    return false;
  }
};

// Trigger a local notification (System push + in-app audio chime)
export const sendLocalNotification = (title: string, body: string): boolean => {
  // Play attention chime
  soundService.playFanfare();

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'n2-sprinter-reminder'
      });
      return true;
    } catch {
      // In sandbox/iframe fallback to in-app notification
      return false;
    }
  }
  return false;
};
