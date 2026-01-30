"use client";

import { useTheme } from "@/styles/useTheme";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { YouTubeThumbnail } from "../YoutubeThumbnail/YoutubeThumbnail";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

interface Movie {
  title: string;
  tagline: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  homepage: string;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  videos: { results: Video[] };
}

interface Props {
  movie: Movie;
}

const IMAGE_BASE = "https://image.tmdb.org/t/p";
const PLACEHOLDER_IMG = "/placeholder-profile.png";

export default function MovieCard({ movie }: Props) {
  const { theme } = useTheme();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const trailer =
    movie.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    movie.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

  const uniqueCrew = Array.from(
    new Map(movie.credits.crew.map((c) => [`${c.name}-${c.job}`, c])).values()
  );

  return (
    <section className="max-w-7xl mx-auto">
      <div
        className="relative rounded-2xl shadow-xl p-8 overflow-hidden"
        style={{
          backgroundColor: theme.colors.surface,
          color: theme.colors.textPrimary,
        }}
      >
        {/* POSTER */}
        <div className="relative mb-6 md:absolute md:top-8 md:right-8 md:mb-0 w-full max-w-[220px] mx-auto">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={
                movie.poster_path
                  ? `${IMAGE_BASE}/w500${movie.poster_path}`
                  : "/fallback.png"
              }
              alt={movie.title}
              fill
              priority
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="md:pr-[260px]">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

          {movie.tagline && (
            <p className="italic opacity-70 mb-4">{movie.tagline}</p>
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
            {movie.overview}
          </p>

          {/* GENRES */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
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

          {/* INFO */}
          <div className="flex flex-wrap gap-6 text-sm opacity-80 mb-10">
            <span>Release: {movie.release_date}</span>
            <span>Runtime: {movie.runtime} min</span>
            <span>
              Rating: {movie.vote_average} ({movie.vote_count})
            </span>
          </div>

          {/* CAST */}
          {movie.credits.cast.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Cast</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {movie.credits.cast.slice(0, 10).map((cast) => (
                  <Link
                    key={cast.id}
                    href={`/people/${cast.id}`}
                    className="w-20 text-center group"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                      <Image
                        src={
                          cast.profile_path
                            ? `${IMAGE_BASE}/w200${cast.profile_path}`
                            : PLACEHOLDER_IMG
                        }
                        alt={cast.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium">{cast.name}</p>
                    <p className="text-[11px] opacity-70">{cast.character}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CREW */}
          {uniqueCrew.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Crew</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {uniqueCrew.slice(0, 10).map((crew, i) => (
                  <Link
                    key={`${crew.name}-${crew.job}-${i}`}
                    href={`/people/${crew.id}`}
                    className="w-20 text-center group"
                  >
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto">
                      <Image
                        src={
                          crew.profile_path
                            ? `${IMAGE_BASE}/w200${crew.profile_path}`
                            : PLACEHOLDER_IMG
                        }
                        alt={crew.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <p className="mt-2 text-xs font-medium">{crew.name}</p>
                    <p className="text-[11px] opacity-70">{crew.job}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* VIDEOS */}
          {movie.videos.results.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-8">Clips & Videos</h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {movie.videos.results.slice(0, 5).map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setSelectedVideo(video)}
                    className="w-48 cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition"
                  >
                    <div className="relative w-full aspect-video">
                      <YouTubeThumbnail videoKey={video.key} alt={video.name} />
                    </div>
                    <p className="p-2 text-sm font-medium">{video.name}</p>
                  </div>
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
