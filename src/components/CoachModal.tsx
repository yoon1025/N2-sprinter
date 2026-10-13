import React, { useEffect } from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';
import { PraiseQuote } from '../data/praise';
import confetti from 'canvas-confetti';

interface CoachModalProps {
  praise: PraiseQuote | null;
  onClose: () => void;
  triggerConfetti?: boolean;
}

export const CoachModal: React.FC<CoachModalProps> = ({
  praise,
  onClose,
  triggerConfetti = true
}) => {
  useEffect(() => {
    if (!praise) return;

    if (triggerConfetti) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
        });
      } catch {
        // canvas-confetti fallback
      }
    }

    // Auto dismiss after 4 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 4500);

    return () => clearTimeout(timer);
  }, [praise, onClose, triggerConfetti]);

  if (!praise) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 shadow-xl shadow-emerald-950/20 border border-emerald-400/30">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-amber-300 animate-bounce" />
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <h4 className="font-extrabold text-sm text-white tracking-tight leading-snug">
                {praise.title}
              </h4>
            </div>
            <p className="text-xs font-semibold text-emerald-100 leading-snug mb-1">
              {praise.message}
            </p>
            <p className="text-[11px] text-emerald-200/90 leading-tight bg-black/15 rounded-lg p-1.5 border border-white/10">
              💡 코치 한마디: {praise.coachNote}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 text-white/80 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
