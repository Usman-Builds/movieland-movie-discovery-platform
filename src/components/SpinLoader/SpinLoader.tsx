"use client";

import { useTheme } from "@/styles/useTheme";

export default function SpinLoader() {
  const { theme } = useTheme();

  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ minHeight: "80vh" }}
    >
      <div className="relative">
        {/* Outer ring */}
        <div
          className="w-16 h-16 rounded-full border-4 animate-spin"
          style={{
            borderColor: `${theme.colors.border}`,
            borderTopColor: theme.colors.primary,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 animate-pulse"
          style={{ backgroundColor: theme.colors.primary }}
        />
      </div>
    </div>
  );
}
