"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/lib/state-context";
import { getDays } from "@/lib/curriculum-loader";
import StreakCounter from "@/components/gamification/StreakCounter";
import ProgressBar from "@/components/ui/ProgressBar";

function computeBreadcrumb(pathname: string): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [
    { label: "온보딩", href: "/onboarding" },
  ];

  const segments = pathname.split("/").filter(Boolean);
  // segments: ["onboarding"] or ["onboarding", "day-1"] or ["onboarding", "day-1", "agentic-loop"]

  if (segments.length >= 2) {
    const dayId = segments[1];
    const days = getDays();
    const day = days.find((d) => d.id === dayId);
    const dayLabel = day ? day.title : dayId;
    crumbs.push({ label: dayLabel, href: `/onboarding/${dayId}` });

    if (segments.length >= 3) {
      const blockId = segments[2];
      if (blockId !== "skip-quiz") {
        const block = day?.blocks.find((b) => b.id === blockId);
        const blockLabel = block ? block.title : blockId;
        crumbs.push({
          label: blockLabel,
          href: `/onboarding/${dayId}/${blockId}`,
        });
      }
    }
  }

  return crumbs;
}

function computeOverallProgress(
  daysState: Record<string, { blocks: Record<string, { status: string }> }>
): number {
  const days = getDays();
  let totalBlocks = 0;
  let completedBlocks = 0;

  for (const day of days) {
    totalBlocks += day.blocks.length;
    const dayProgress = daysState[day.id];
    if (dayProgress) {
      for (const block of day.blocks) {
        if (dayProgress.blocks[block.id]?.status === "completed") {
          completedBlocks++;
        }
      }
    }
  }

  return totalBlocks === 0 ? 0 : Math.round((completedBlocks / totalBlocks) * 100);
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useAppState();

  const breadcrumbs = computeBreadcrumb(pathname);
  const overallProgress = computeOverallProgress(state.onboarding.days);

  return (
    <div className="min-h-screen bg-[#020617] text-surface-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-surface-800 bg-[#020617]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between gap-4">
          {/* Left: back + breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => {
                if (breadcrumbs.length > 1) {
                  router.push(breadcrumbs[breadcrumbs.length - 2].href);
                } else {
                  router.push("/");
                }
              }}
              className="shrink-0 text-surface-400 hover:text-surface-200 transition-colors text-sm flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              뒤로
            </button>

            <nav className="flex items-center gap-1.5 text-sm min-w-0 truncate">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-surface-600">&gt;</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-surface-200 font-medium truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => router.push(crumb.href)}
                      className="text-surface-400 hover:text-surface-200 transition-colors truncate"
                    >
                      {crumb.label}
                    </button>
                  )}
                </span>
              ))}
            </nav>
          </div>

          {/* Right: compact streak */}
          <div className="shrink-0 flex items-center gap-1 text-sm">
            <span className="text-dopamine-400 font-bold tabular-nums">
              {state.streak.current}
            </span>
            <span className="text-lg leading-none">🔥</span>
          </div>
        </div>

        {/* Course progress bar */}
        <div className="mx-auto max-w-4xl px-4 pb-3">
          <ProgressBar
            value={overallProgress}
            label={`전체 진행률 ${overallProgress}%`}
            color="dopamine"
          />
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}
