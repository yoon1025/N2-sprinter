import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Clock,
  Sparkles,
  Link,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';
import { WEEKDAY_ROUTINES, WEEKEND_CHECKLIST, EXTERNAL_RESOURCES } from '../data/schedule';
import { ActiveTab } from '../types';
import { soundService } from '../utils/sound';

interface ScheduleViewProps {
  completedRoutineIds: string[];
  onToggleRoutineCheck: (routineId: string) => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  completedRoutineIds,
  onToggleRoutineCheck,
  onNavigateTab
}) => {
  return (
    <div className="space-y-6 pb-6">
      {/* 1. Weekday Routine Table for Commuter / Part-timer */}
      <section className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                주중 평일 쪼개기 루틴표 (월~금)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                출퇴근 지하철 이동과 알바/직장 병행 맞춤 자투리 시간표
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 tabular-nums">
            {WEEKDAY_ROUTINES.filter((r) => completedRoutineIds.includes(r.id)).length} / {WEEKDAY_ROUTINES.length} 완료
          </span>
        </div>

        <div className="space-y-2.5">
          {WEEKDAY_ROUTINES.map((routine) => {
            const isCompleted = completedRoutineIds.includes(routine.id);

            return (
              <div
                key={routine.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/50'
                    : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Large Checkbox */}
                  <button
                    type="button"
                    onClick={() => onToggleRoutineCheck(routine.id)}
                    className="mt-0.5 shrink-0 min-h-[44px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-400 hover:text-emerald-500 transition-colors" />
                    )}
                  </button>

                  {/* Routine Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                        {routine.timeSlot}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                        소요: {routine.duration}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-medium">
                        {routine.tag}
                      </span>
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {routine.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {routine.description}
                    </p>
                  </div>

                  {/* Go to relevant tab button */}
                  {routine.targetTab && (
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playClick();
                        onNavigateTab(routine.targetTab!);
                      }}
                      className="px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 shrink-0 transition-colors"
                    >
                      바로가기
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Weekend Mock Test & Review Checklist */}
      <section className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              주말 모의고사 & 집중 복습 체크리스트
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              평일에 쪼개어 쌓은 실력을 주말에 실전 모의고사로 굳히기
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WEEKEND_CHECKLIST.map((item) => {
            const isDone = completedRoutineIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onToggleRoutineCheck(item.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      주말 필수
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <h4
                    className={`text-xs sm:text-sm font-bold leading-snug ${
                      isDone
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-amber-700 dark:text-amber-400">
                  💡 {item.tip}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Authoritative External Resources & Official Exam Links Cards */}
      <section className="bg-white dark:bg-slate-800/95 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Link className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              공식 기출문제 및 공신력 수험 자료 링크
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              클릭 시 새 창에서 공식 시험 사이트 및 무료 학습 포털로 연결됩니다
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXTERNAL_RESOURCES.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                    {res.badge}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {res.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                <span>자료실 바로가기</span>
                <span>&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
