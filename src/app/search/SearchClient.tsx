"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";
import { useTheme } from "@/styles/useTheme";

import MovieList from "@/components/MovieList/MovieList";
import TvList from "@/components/TvList/TvList";
import PersonList from "@/components/PersonList/PersonList";

// ==========================
// No Results Found Component
// ==========================
interface NoResultsProps {
  query?: string;
  iconSize?: number;
  message?: string;
}

const NoResultsFound: React.FC<NoResultsProps> = ({
  query,
  iconSize = 100,
  message,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center h-[60vh] space-y-4 px-4 text-center"
      style={{ color: theme.colors.textSecondary }}
    >
      {/* Icon */}
      {query ? (
        <MdOutlineSentimentDissatisfied size={iconSize} />
      ) : (
        <FiSearch size={iconSize} />
      )}

      {/* Message */}
      <p className="text-lg opacity-80">
        {message
          ? message
          : query
          ? `No results found for “${query}”`
          : "Start typing to search for movies, TV shows, or people 🎬"}
      </p>
    </div>
  );
};

// ==========================
// Search Page Component
// ==========================
const TYPES = [
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
  { label: "People", value: "person" },
];

interface Props {
  results: any[];
  totalPages: number;
}

export default function SearchClient({ results, totalPages }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const { theme } = useTheme();

  const queryParam = params.get("q") || "";
  const typeParam = params.get("type") || "movie";
  const pageParam = Number(params.get("page") || 1);

  const [query, setQuery] = useState(queryParam);
  const [type, setType] = useState(typeParam);

  // Sync state with URL
  useEffect(() => {
    setQuery(queryParam);
    setType(typeParam);
  }, [queryParam, typeParam]);

  // Search handler
  const handleSearch = (page = 1) => {
    if (!query.trim()) return;
    router.push(`/search?q=${query}&type=${type}&page=${page}`);
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    if (query.trim()) {
      router.push(`/search?q=${query}&type=${newType}&page=1`);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 px-4 flex flex-col"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-7xl mx-auto space-y-8 flex-1 flex flex-col">
        {/* 🔍 Search Controls */}
        <div
          className="flex flex-col md:flex-row gap-3 p-4 rounded-xl shadow-md"
          style={{ backgroundColor: theme.colors.surface }}
        >
          {/* Input */}
          <div className="relative flex-1">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: theme.colors.textSecondary }}
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows or people..."
              className="w-full pl-10 pr-10 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.textPrimary,
                border: `1px solid ${theme.colors.border}`,
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </div>

          {/* Type Tabs */}
          <div className="flex gap-2 flex-wrap">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => handleTypeChange(t.value)}
                className="px-4 py-3 rounded-lg font-medium transition"
                style={{
                  backgroundColor:
                    type === t.value
                      ? theme.colors.primary
                      : theme.colors.background,
                  color: type === t.value ? "#fff" : theme.colors.textPrimary,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Search Button */}
          <button
            onClick={() => handleSearch()}
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: theme.colors.primary,
              color: "#fff",
            }}
          >
            Search
          </button>
        </div>

        {/* ===================== */}
        {/* Empty / No Results */}
        {/* ===================== */}
        {!query && <NoResultsFound />}
        {query && results.length === 0 && <NoResultsFound query={query} />}

        {/* ===================== */}
        {/* Results */}
        {/* ===================== */}
        {results.length > 0 && (
          <>
            {type === "movie" && <MovieList movies={results} />}
            {type === "tv" && <TvList tvShows={results} />}
            {type === "person" && <PersonList people={results} />}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
                <button
                  disabled={pageParam <= 1}
                  onClick={() => handleSearch(pageParam - 1)}
                  className="px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Prev
                </button>

                <span className="opacity-70">
                  Page {pageParam} of {totalPages}
                </span>

                <button
                  disabled={pageParam >= totalPages}
                  onClick={() => handleSearch(pageParam + 1)}
                  className="px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
