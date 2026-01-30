"use client";

import { useTheme } from "@/styles/useTheme";
import { tvService } from "@/services/tv.service";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { YouTubeThumbnail } from "@/components/YoutubeThumbnail/YoutubeThumbnail";
import SpinLoader from "@/components/SpinLoader/SpinLoader";

interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  still_path: string | null;
  air_date: string;
}

interface Season {
  id: number;
  name: string;
  season_number: number;
  overview: string;
  episodes: Episode[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  official: boolean;
}

export default function SeasonPage() {
  const { id, season_number } = useParams<{
    id: string;
    season_number: string;
  }>();

  const { theme } = useTheme();
  const router = useRouter();

  const [season, setSeason] = useState<Season | null>(null);
  const [allSeasons, setAllSeasons] = useState<Season[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const activeSeasonRef = useRef<HTMLButtonElement>(null);

  const IMAGE_BASE = "https://image.tmdb.org/t/p";

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const load = async () => {
      try {
        const [seasonData, videosData, tvDetails] = await Promise.all([
          tvService.getEpisodes(id, Number(season_number)),
          tvService.getSeasonVideos(id, Number(season_number)),
          tvService.getDetails(id),
        ]);

        setSeason(seasonData);
        setAllSeasons(tvDetails.seasons || []);
        setVideos(
          (videosData?.results ?? []).filter(
            (v: Video) => v.site === "YouTube" && v.official
          )
        );
      } catch (err) {
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    load();
  }, [id, season_number]);

  /* ---------------- MOBILE SCROLL ---------------- */

  useEffect(() => {
    if (activeSeasonRef.current && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const button = activeSeasonRef.current;

      container.scrollTo({
        left:
          button.offsetLeft -
          container.clientWidth / 2 +
          button.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [season_number, allSeasons]);

  /* ---------------- LOADER ---------------- */

  if (initialLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <SpinLoader />
      </div>
    );
  }

  if (!season) {
    return (
      <p className="text-center py-20 text-gray-400">Season not found</p>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div
      className="pt-24 px-6 max-w-6xl mx-auto space-y-10"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1
          className="text-3xl font-bold"
          style={{ color: theme.colors.textPrimary }}
        >
          {season.name}
        </h1>

        {/* DESKTOP SELECT */}
        <select
          value={season_number}
          onChange={(e) =>
            router.push(`/tv/${id}/season/${e.target.value}`)
          }
          className="hidden md:block px-3 py-2 rounded-lg border"
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.textPrimary,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          {allSeasons.map((s) => (
            <option key={s.id} value={s.season_number}>
              {s.name}
            </option>
          ))}
        </select>

        {/* MOBILE BUTTONS */}
        <div
          ref={mobileScrollRef}
          className="flex md:hidden gap-2 overflow-x-auto pb-2"
        >
          {allSeasons.map((s) => (
            <button
              key={s.id}
              ref={
                s.season_number === Number(season_number)
                  ? activeSeasonRef
                  : null
              }
              onClick={() =>
                router.push(`/tv/${id}/season/${s.season_number}`)
              }
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                s.season_number === Number(season_number)
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-red-600"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      {season.overview && (
        <p className="text-gray-400 max-w-3xl">{season.overview}</p>
      )}

      {/* VIDEOS (FIXED HEIGHT – NO OVERFLOW) */}
      {videos.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Videos
          </h2>

          <div className="flex flex-wrap gap-4">
            {videos.slice(0, 5).map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="w-64 rounded-lg overflow-hidden cursor-pointer bg-gray-900 hover:scale-105 transition"
              >
                {/* HARD HEIGHT CONSTRAINT */}
                <div className="relative w-full h-36">
                  <YouTubeThumbnail
                    videoKey={video.key}
                    alt={video.name}
                  />
                </div>
                <p className="p-2 text-sm text-white truncate">
                  {video.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EPISODES */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Episodes
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {season.episodes.map((ep) => (
            <div
              key={ep.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
            >
              {/* HARD IMAGE HEIGHT */}
              <div className="relative w-full h-48">
                <Image
                  src={
                    ep.still_path
                      ? `${IMAGE_BASE}/w500${ep.still_path}`
                      : "/fallback.png"
                  }
                  alt={ep.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-white text-sm">
                  {ep.episode_number}. {ep.name}
                </h3>
                <p className="text-xs text-gray-400">{ep.air_date}</p>
                <p className="text-sm text-gray-300 line-clamp-3">
                  {ep.overview || "No description"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-[90%] max-w-3xl aspect-video bg-black rounded-lg">
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
    </div>
  );
}
