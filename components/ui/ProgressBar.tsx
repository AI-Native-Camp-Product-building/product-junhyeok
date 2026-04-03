"use client";

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: "dopamine" | "spark" | "streak";
  className?: string;
}

const colorMap: Record<NonNullable<ProgressBarProps["color"]>, string> = {
  dopamine: "bg-dopamine-400",
  spark: "bg-spark-400",
  streak: "bg-streak-400",
};

export default function ProgressBar({
  value,
  label,
  color = "dopamine",
  className = "",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <p className="mb-1 text-sm text-surface-200">{label}</p>
      )}
      <div
        className="w-full h-2 rounded-full bg-surface-800 overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "진행률"}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorMap[color]}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
