"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useTheme } from "@/styles/useTheme";
import { filterByRequiredFields } from "@/utils/ValidContentFilter";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

interface TvShow {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date?: string;
  vote_average: number;
}

interface Props {
  title?: string;
  tvShows: TvShow[];
  viewAllHref?: string;
}

export default function TvCarousel({
  title,
  tvShows,
  viewAllHref,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  // ❌ Return nothing if no movies
  if (!tvShows || tvShows.length === 0) return null;

  // ✅ Filter TV shows immediately
  const filteredTvShows = filterByRequiredFields(tvShows || [], [
    "id",
    "name",
    "poster_path",
    "first_air_date",
  ]);

  // ❌ Return nothing if nothing valid
  if (filteredTvShows.length === 0) return null;
  
  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left:
        dir === "left"
          ? -scrollRef.current.clientWidth * 0.9
          : scrollRef.current.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      {/* Header */}
      {(title || viewAllHref) && (
        <div className="flex items-center justify-between px-6 mb-4">
          {title && (
            <h2
              className="text-2xl font-bold"
              style={{ color: theme.colors.textPrimary }}
            >
              {title}
            </h2>
          )}

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-sm font-semibold flex items-center gap-1
                         transition-all hover:gap-2"
              style={{ color: theme.colors.primary }}
            >
              View all <span>→</span>
            </Link>
          )}
        </div>
      )}

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                   p-2 rounded-full backdrop-blur-md transition hover:scale-110"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        }}
      >
        <FiChevronLeft size={24} />
      </button>

      {/* TV Row */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-12 py-6
                   overflow-x-auto overflow-y-visible
                   scroll-smooth scrollbar-hide"
      >
        {filteredTvShows.map((tv) => (
          <Link
            key={tv.id}
            href={`/tv/${tv.id}`}
            className="min-w-40 sm:min-w-50"
          >
            <div
              className="rounded-xl overflow-hidden
                         transition-all duration-300
                         hover:-translate-y-2 hover:shadow-2xl"
              style={{ backgroundColor: theme.colors.surface }}
            >
              {/* Poster */}
              <div className="relative aspect-2/3">
                <Image
                  src={
                    tv.poster_path
                      ? `${IMAGE_BASE}${tv.poster_path}`
                      : "/fallback.png"
                  }
                  alt={tv.name || "missing Image"}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 opacity-0 transition"
                  style={{
                    background: `linear-gradient(to top, ${theme.colors.primary}cc, transparent)`,
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-3">
                <h3
                  className="text-sm font-semibold truncate"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {tv.name}
                </h3>

                <div className="flex justify-between mt-1 text-xs opacity-80">
                  <span style={{color:theme.colors.textSecondary}}>{tv.first_air_date?.slice(0, 4) || "—"}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <FaStar size={12} />
                    {tv.vote_average?.toFixed(1) || "—"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                   p-2 rounded-full backdrop-blur-md transition hover:scale-110"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        }}
      >
        <FiChevronRight size={24} />
      </button>
    </section>
  );
}
