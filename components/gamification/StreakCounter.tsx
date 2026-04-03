"use client";

interface StreakCounterProps {
  current: number;
  longest: number;
  className?: string;
}

export default function StreakCounter({
  current,
  longest,
  className = "",
}: StreakCounterProps) {
  const isActive = current > 0;
  const hasGlow = current >= 7;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div
        className={[
          "text-6xl font-bold tabular-nums transition-colors duration-300",
          isActive ? "text-dopamine-400" : "text-surface-800",
          isActive ? "animate-streak-pulse" : "",
          hasGlow ? "streak-glow" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span>{current}</span>
        <span className="ml-1 text-5xl">🔥</span>
      </div>
      <p className="text-sm text-surface-200 tracking-wide">현재 연속</p>
      <p className="text-xs text-surface-200/60 mt-0.5">
        최장 기록: <span className="font-semibold text-surface-200">{longest}일</span>
      </p>

      <style>{`
        @keyframes streakPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }
        .animate-streak-pulse {
          animation: streakPulse 2s ease-in-out infinite;
        }
        .streak-glow {
          filter: drop-shadow(0 0 12px #4ade80) drop-shadow(0 0 24px #22c55e88);
        }
      `}</style>
    </div>
  );
}
