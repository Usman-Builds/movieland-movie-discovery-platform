"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/styles/useTheme";
import { useState } from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const PLACEHOLDER_IMG = "/placeholder-profile.png";

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  poster_path: string | null;
}

interface TvShow {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  first_air_date: string;
  last_air_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  backdrop_path: string | null;
  poster_path: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: Season[];
  videos: { results: Video[] };
}

interface Props {
  tv: TvShow;
}

export default function TvShowCard({ tv }: Props) {
  const { theme } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const trailer =
    tv.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    tv.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div
        className="relative rounded-2xl shadow-xl p-8 overflow-hidden"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        }}
      >
        {/* POSTER – TOP RIGHT */}
        <div className="relative mb-6 md:absolute md:top-8 md:right-8 md:mb-0 w-full max-w-[220px] mx-auto">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={
                tv.poster_path
                  ? `${IMAGE_BASE}/w500${tv.poster_path}`
                  : "/fallback.png"
              }
              alt={tv.name}
              fill
              priority
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:pr-[260px]">
          <h1 className="text-4xl font-bold mb-2">{tv.name}</h1>

          {tv.tagline && (
            <p className="italic opacity-70 mb-4">{tv.tagline}</p>
          )}

          {trailer && (
            <button
              onClick={() => setSelectedVideo(trailer)}
              className="mb-6 inline-flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary, color: "#fff" }}
            >
              ▶ Watch Trailer
            </button>
          )}

          <p className="text-lg leading-relaxed mb-6 opacity-90">
            {tv.overview}
          </p>

          {/* GENRES */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tv.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                }}
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* META */}
          <div className="flex flex-wrap gap-6 text-sm opacity-80 mb-10">
            <span>First Air: {tv.first_air_date}</span>
            <span>Last Air: {tv.last_air_date}</span>
            <span>
              Rating: {tv.vote_average} ({tv.vote_count})
            </span>
            <span>
              Seasons: {tv.number_of_seasons} | Episodes:{" "}
              {tv.number_of_episodes}
            </span>
          </div>

          {/* SEASONS */}
          {tv.seasons?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Seasons</h2>
              <div className="space-y-4">
                {tv.seasons.map((season) => (
                  <Link
                    key={season.id}
                    href={`/tv/${tv.id}/season/${season.season_number}`}
                    className="flex items-center gap-4 border rounded-lg p-4 hover:opacity-90 transition"
                  >
                    <Image
                      src={
                        season.poster_path
                          ? `${IMAGE_BASE}/w200${season.poster_path}`
                          : PLACEHOLDER_IMG
                      }
                      alt={season.name}
                      width={80}
                      height={120}
                      className="rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{season.name}</h3>
                      <p className="text-sm opacity-70">
                        Episodes: {season.episode_count}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          
        </div>
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2 aspect-video bg-black rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-3 right-3 bg-black/70 text-white w-8 h-8 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
