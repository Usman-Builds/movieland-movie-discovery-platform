"use client";

import Link from "next/link";
import { useTheme } from "@/styles/useTheme";
import { useEffect, useState } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: Props) {
  const { theme } = useTheme();
  const [maxVisible, setMaxVisible] = useState(10);

  // Adjust max visible pages based on screen width
  useEffect(() => {
    const updateMax = () => {
      if (window.innerWidth < 640) setMaxVisible(5); // mobile
      else if (window.innerWidth < 1024) setMaxVisible(7); // tablet
      else setMaxVisible(10); // desktop
    };

    updateMax();
    window.addEventListener("resize", updateMax);
    return () => window.removeEventListener("resize", updateMax);
  }, []);

  const half = Math.floor(maxVisible / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisible - 1);

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const baseBtn = "px-3 py-1 rounded transition font-medium whitespace-nowrap";

  const buttonStyle = {
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
  };

  return (
    <div className="flex justify-center mt-10 overflow-x-auto scrollbar-hide py-2 gap-2">
      <div className="flex gap-2">
        {/* First page */}
        {start > 1 && (
          <Link href={`${basePath}?page=1`} className={baseBtn} style={buttonStyle}>
            1
          </Link>
        )}

        {start > 2 && <span style={{ color: theme.colors.textSecondary }}>…</span>}

        {/* Prev */}
        {currentPage > 1 && (
          <Link href={`${basePath}?page=${currentPage - 1}`} className={baseBtn} style={buttonStyle}>
            Prev
          </Link>
        )}

        {/* Pages */}
        {pages.map((p) => (
          <Link
            key={p}
            href={`${basePath}?page=${p}`}
            className={baseBtn}
            style={{
              backgroundColor: p === currentPage ? theme.colors.primary : theme.colors.surface,
              color: p === currentPage ? theme.colors.textPrimary : theme.colors.textSecondary,
            }}
          >
            {p}
          </Link>
        ))}

        {/* Next */}
        {currentPage < totalPages && (
          <Link href={`${basePath}?page=${currentPage + 1}`} className={baseBtn} style={buttonStyle}>
            Next
          </Link>
        )}

        {end < totalPages - 1 && <span style={{ color: theme.colors.textSecondary }}>…</span>}

        {/* Last page */}
        {end < totalPages && (
          <Link href={`${basePath}?page=${totalPages}`} className={baseBtn} style={buttonStyle}>
            {totalPages}
          </Link>
        )}
      </div>
    </div>
  );
}
