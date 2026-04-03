"use client";

interface BadgeProps {
  icon: string;
  name: string;
  locked?: boolean;
  className?: string;
}

export default function Badge({ icon, name, locked = false, className = "" }: BadgeProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 ${className}`}
      aria-label={locked ? `${name} 배지 (잠김)` : `${name} 배지 (획득)`}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <span
          className={`text-4xl select-none transition-all duration-300 ${
            locked
              ? "grayscale opacity-50"
              : "drop-shadow-[0_0_8px_rgba(232,121,249,0.6)] animate-pulse"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
        {locked && (
          <span
            className="absolute bottom-0 right-0 text-base leading-none"
            aria-hidden="true"
          >
            🔒
          </span>
        )}
      </div>
      <span
        className={`text-xs font-medium text-center max-w-[72px] leading-tight ${
          locked ? "text-surface-500" : "text-surface-200"
        }`}
      >
        {name}
      </span>
    </div>
  );
}
