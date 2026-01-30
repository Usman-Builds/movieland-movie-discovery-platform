"use client";

import { useTheme } from "@/styles/useTheme";
import Link from "next/link";

export default function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <div
      style={{ backgroundColor: theme.colors.background, color: theme.colors.textPrimary }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
    >
      <h1 style={{ color: theme.colors.primary }} className="text-4xl font-bold mb-4">
        404
      </h1>
      <p className="mb-6 text-textSecondary text-lg">Page Not Found</p>
      <Link
        href="/"
        style={{ backgroundColor: theme.colors.primary, color: theme.colors.textPrimary }}
        className="px-6 py-2 rounded-xl font-semibold"
      >
        Go Home
      </Link>
    </div>
  );
}
