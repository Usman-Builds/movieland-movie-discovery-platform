"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/styles/useTheme";
import { filterByRequiredFields } from "@/utils/ValidContentFilter";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

type MovieListHeader = {
  title: string;
  description?: string;
  backdrop?: string | null;
  viewAllLink?: string;
};

type Props = {
  movies: Movie[];
  header?: MovieListHeader;
};

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieList({ movies, header }: Props) {
  const { theme } = useTheme();

  if (!movies || movies.length === 0) {
    return <p className="text-center py-6">No movies found.</p>;
  }

  // ✅ Filter movies directly
    const filteredMovies = filterByRequiredFields(movies || [], [
      "id",
      "title",
      "poster_path",
      "release_date",
    ]);
  
    // ❌ Return nothing if nothing valid
    if (filteredMovies.length === 0) return null;

  return (
    <section className="w-full">
      {/* ===== Header ===== */}
      {header && (
        <div className="relative mb-8 overflow-hidden rounded-xl">

          {/* Content */}
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
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.id}`}
            className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                       hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Poster */}
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title || "missing Image"}
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
                {movie.title}
              </h3>

              <div
                className="flex justify-between items-center mt-1 text-xs opacity-80"
                style={{ color: theme.colors.textSecondary }}
              >
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
                <span>{movie.release_date?.slice(0, 4)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
