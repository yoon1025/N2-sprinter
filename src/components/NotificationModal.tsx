import React, { useState } from 'react';
import {
  Bell,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Send,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import {
  AlarmSetting,
  requestNotificationPermission,
  sendLocalNotification,
  DEFAULT_ALARMS
} from '../utils/notification';
import { soundService } from '../utils/sound';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  alarms: AlarmSetting[];
  onUpdateAlarms: (newAlarms: AlarmSetting[]) => void;
  onShowInAppAlert: (title: string, message: string) => void;
  permissionStatus: NotificationPermission | 'unsupported';
  onRefreshPermission: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  alarms,
  onUpdateAlarms,
  onShowInAppAlert,
  permissionStatus,
  onRefreshPermission
}) => {
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggleAlarm = (id: string) => {
    soundService.playClick();
    const updated = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    );
    onUpdateAlarms(updated);
  };

  const handleTimeChange = (id: string, newTime: string) => {
    const updated = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, time: newTime } : alarm
    );
    onUpdateAlarms(updated);
  };

  const handleRequestPermission = async () => {
    soundService.playClick();
    await requestNotificationPermission();
    onRefreshPermission();
  };

  const handleSendTestNotification = () => {
    soundService.playClick();
    const title = '📢 [N2 스프린터] 알림 테스트 성공!';
    const message = '출퇴근 시간에 맞춰 이렇게 학습 알림이 도착합니다. 지하철에서 단어 25개 달려볼까요?';

    sendLocalNotification(title, message);
    onShowInAppAlert(title, message);
    setTestSent(true);

    setTimeout(() => {
      setTestSent(false);
    }, 4000);
  };

  const handleResetDefaults = () => {
    soundService.playClick();
    onUpdateAlarms(DEFAULT_ALARMS);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 font-bold mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>로컬 알림 스케줄러</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                출퇴근 시간 맞춤 푸시 알림 예약
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Permission Status Box */}
          <div className="rounded-2xl p-3.5 border bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {permissionStatus === 'granted' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                )}
                <div className="text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    브라우저 알림 권한:
                  </span>{' '}
                  <span
                    className={`font-bold ${
                      permissionStatus === 'granted'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {permissionStatus === 'granted'
                      ? '활성화됨 (시스템 푸시 수신 가능)'
                      : permissionStatus === 'denied'
                      ? '차단됨 (앱 내 알림음으로 작동)'
                      : '권한 필요'}
                  </span>
                </div>
              </div>

              {permissionStatus !== 'granted' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shrink-0 cursor-pointer"
                >
                  권한 허용하기
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
              💡 권한이 차단되어 있어도 앱이 켜져 있거나 홈 화면에 추가되어 있으면 앱 내 팝업과 효과음으로 알려드립니다.
            </p>
          </div>

          {/* Alarm Schedules List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                예약된 쪼개기 학습 알람 (4타임)
              </h4>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1"
                title="기본 시간으로 복원"
              >
                <RotateCcw className="w-3 h-3" /> 기본값 복원
              </button>
            </div>

            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  alarm.enabled
                    ? 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 shadow-xs'
                    : 'bg-slate-100/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {alarm.title}
                    </span>
                  </div>

                  {/* Toggle Switch & Time input */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Time Input */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="time"
                        value={alarm.time}
                        disabled={!alarm.enabled}
                        onChange={(e) => handleTimeChange(alarm.id, e.target.value)}
                        className="bg-transparent text-xs font-extrabold text-slate-900 dark:text-white tabular-nums focus:outline-none cursor-pointer"
                      />
                    </div>

                    {/* Enable/Disable Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleAlarm(alarm.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        alarm.enabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          alarm.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                  {alarm.message}
                </p>
              </div>
            ))}
          </div>

          {/* Test Notification Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSendTestNotification}
              className="w-full py-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{testSent ? '🔔 테스트 알림이 발송되었습니다!' : '알림 테스트하기 (지금 바로 테스트)'}</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-sm"
          >
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
};
