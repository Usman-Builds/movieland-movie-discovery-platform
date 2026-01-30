"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/styles/useTheme";
import { filterByRequiredFields } from "@/utils/ValidContentFilter";

type TvShow = {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
};

type TvListHeader = {
  title: string;
  description?: string;
  backdrop?: string | null;
  viewAllLink?: string;
};

type Props = {
  tvShows: TvShow[];
  header?: TvListHeader;
};

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function TvList({ tvShows, header }: Props) {
  const { theme } = useTheme();

  if (!tvShows || tvShows.length === 0) {
    return <p className="text-center py-6">No TV shows found.</p>;
  }

  // ✅ Filter TV shows immediately
  const filteredTvShows = filterByRequiredFields(tvShows || [], [
    "id",
    "name",
    "poster_path",
    "first_air_date",
  ]);

  // ❌ Return nothing if nothing valid
  if (filteredTvShows.length === 0) return null;

  return (
    <section className="w-full">
      {/* ===== Header ===== */}
      {header && (
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <div className="relative z-10 px-6 py-10 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: theme.colors.textPrimary }}
              >
                {header.title}
              </h1>
              {header.description && (
                <p
                  className="opacity-80 text-sm md:text-base"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {header.description}
                </p>
              )}
            </div>

            {header.viewAllLink && (
              <Link
                href={header.viewAllLink}
                className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                }}
              >
                View All
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ===== Grid ===== */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4">
        {filteredTvShows.map((tv) => (
          <Link
            key={tv.id}
            href={`/tv/${tv.id}`}
            className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                       hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Poster */}
            {tv.poster_path ? (
              <Image
                src={`${IMAGE_BASE}${tv.poster_path}`}
                alt={tv.name || "missing Image"}
                width={500}
                height={750}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div
                className="w-full h-75 flex items-center justify-center text-sm"
                style={{ backgroundColor: theme.colors.border }}
              >
                No Image
              </div>
            )}

            {/* Info */}
            <div className="p-2">
              <h3
                className="font-semibold text-sm truncate"
                style={{ color: theme.colors.textPrimary }}
              >
                {tv.name}
              </h3>

              <div
                className="flex justify-between items-center mt-1 text-xs opacity-80"
                style={{ color: theme.colors.textSecondary }}
              >
                <span>⭐ {tv.vote_average.toFixed(1)}</span>
                <span>{tv.first_air_date?.slice(0, 4)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
