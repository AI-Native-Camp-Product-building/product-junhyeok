"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", hover = false, onClick }: CardProps) {
  const base =
    "bg-surface-800 border border-surface-700 rounded-xl p-6";
  const hoverStyles = hover
    ? "transition-all duration-200 hover:scale-[1.02] hover:border-surface-600"
    : "";
  const clickStyles = onClick ? "cursor-pointer" : "";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} ${hoverStyles} ${clickStyles} text-left w-full ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${base} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
