"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CelebrationAnimationProps {
  show: boolean;
  type?: "confetti" | "badge" | "streak";
  onComplete?: () => void;
}

const CONFETTI_COLORS = [
  "#e879f9", // dopamine-400
  "#d946ef", // dopamine-500
  "#f0abfc", // dopamine-300
  "#fb923c", // spark-400
  "#f97316", // spark-500
  "#4ade80", // streak-400
  "#22c55e", // streak-500
];

const BADGE_EMOJI = "🏅";
const FIRE_EMOJI = "🔥";

interface Particle {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 1.2,
    duration: 1.8 + Math.random() * 1.2,
    size: 6 + Math.floor(Math.random() * 8),
    rotation: Math.random() * 360,
  }));
}

export default function CelebrationAnimation({
  show,
  type = "confetti",
  onComplete,
}: CelebrationAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particles = useRef<Particle[]>(makeParticles(30));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (show) {
      particles.current = makeParticles(30);
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 3000);
    } else {
      setVisible(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [show, onComplete]);

  if (!mounted || !visible) return null;

  const content = (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {type === "confetti" && (
        <>
          {particles.current.map((p) => (
            <div
              key={p.id}
              className="confetti-particle absolute top-0"
              style={
                {
                  left: `${p.x}%`,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                  "--rot": `${p.rotation}deg`,
                } as React.CSSProperties
              }
            />
          ))}
        </>
      )}

      {type === "badge" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="badge-burst text-8xl">{BADGE_EMOJI}</div>
        </div>
      )}

      {type === "streak" && (
        <>
          {particles.current.map((p) => (
            <div
              key={p.id}
              className="fire-particle absolute top-0 text-2xl select-none"
              style={{
                left: `${p.x}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            >
              {FIRE_EMOJI}
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="streak-counter-anim text-7xl font-black text-streak-400">
              🔥
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(var(--rot, 360deg));
            opacity: 0;
          }
        }
        .confetti-particle {
          animation: confettiFall linear forwards;
        }

        @keyframes badgeBurst {
          0% {
            transform: scale(0.2) rotate(-20deg);
            opacity: 0;
          }
          40% {
            transform: scale(1.3) rotate(8deg);
            opacity: 1;
          }
          60% {
            transform: scale(0.95) rotate(-4deg);
          }
          80% {
            transform: scale(1.08) rotate(2deg);
          }
          90% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0;
          }
        }
        .badge-burst {
          animation: badgeBurst 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          filter: drop-shadow(0 0 24px #e879f9) drop-shadow(0 0 48px #d946ef88);
        }

        @keyframes fireFall {
          0% {
            transform: translateY(-30px) scale(1);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) scale(0.6);
            opacity: 0;
          }
        }
        .fire-particle {
          animation: fireFall linear forwards;
        }

        @keyframes streakPop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          30% {
            transform: scale(1.4);
            opacity: 1;
          }
          60% {
            transform: scale(0.9);
          }
          80% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .streak-counter-anim {
          animation: streakPop 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          filter: drop-shadow(0 0 20px #4ade80) drop-shadow(0 0 40px #22c55e88);
        }
      `}</style>
    </div>
  );

  return createPortal(content, document.body);
}
