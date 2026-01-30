"use client";

import React from "react";
import { FiFilm } from "react-icons/fi";
import { useTheme } from "@/styles/useTheme";

interface AppLoaderProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function AppLoader({ loading, children }: AppLoaderProps) {
  const { theme } = useTheme();

  if (!loading) return <>{children}</>;

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Inline animations */}
      <style jsx>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes fade {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>

      {/* 🎥 Icon */}
      <div className="relative">
        <FiFilm
          size={56}
          style={{ color: theme.colors.primary }}
          className="animate-pulse"
        />

        {/* Glow Ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${theme.colors.primary}`,
            filter: "blur(6px)",
            animation: "spinSlow 3s linear infinite",
          }}
        />
      </div>

      {/* 🎞 Loading Text */}
      <p
        className="text-lg font-medium tracking-wide"
        style={{
          color: theme.colors.textSecondary,
          animation: "fade 1.5s ease-in-out infinite",
        }}
      >
        Loading cinematic experience…
      </p>

      {/* 🎚 Progress Bar */}
      <div
        className="w-64 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: theme.colors.surface }}
      >
        <div
          className="h-full w-1/3 rounded-full"
          style={{
            backgroundColor: theme.colors.primary,
            animation: "loading 1.2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
