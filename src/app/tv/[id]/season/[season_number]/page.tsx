"use client";

import { useTheme } from "@/styles/useTheme";
import { tvService } from "@/services/tv.service";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { YouTubeThumbnail } from "@/components/YoutubeThumbnail/YoutubeThumbnail";

interface Props {
  params: { id: string; season_number: string };
}

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
  poster_path: string | null;
  episodes: Episode[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export default function SeasonPage({ params }: Props) {
  const { id, season_number } = useParams();
  const { theme } = useTheme();
  const router = useRouter();

  const [season, setSeason] = useState<Season | null>(null);
  const [allSeasons, setAllSeasons] = useState<Season[]>([]);
  const [seasonVideos, setSeasonVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeasonNumber, setSelectedSeasonNumber] = useState<number>(
    Number(season_number)
  );

  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const activeSeasonRef = useRef<HTMLButtonElement>(null);

  const IMAGE_BASE = "https://image.tmdb.org/t/p";

  // Fetch season details and videos
  const fetchSeason = async (seasonNum: number) => {
    setLoading(true);
    try {
      const seasonData = await tvService.getEpisodes(id, seasonNum);
      setSeason(seasonData);

      const videosData = await tvService.getSeasonVideos(id, seasonNum);
      const officialYouTubeVideos = (videosData?.results ?? []).filter(
        (v: Video) => v.site === "YouTube" && v.official
      );

      setSeasonVideos(officialYouTubeVideos);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Season fetch error:", error);
      setSeason(null);
      setSeasonVideos([]);
      setSelectedVideo(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all seasons of the TV show
  const fetchAllSeasons = async () => {
    try {
      const tvDetails = await tvService.getDetails(id);
      setAllSeasons(tvDetails.seasons || []);
    } catch (error) {
      console.error("TV show fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAllSeasons();
    fetchSeason(Number(season_number));
  }, [id, season_number]);

  // Handle season change
  const handleSeasonChange = (seasonNum: number) => {
    setSelectedSeasonNumber(seasonNum);
    router.push(`/tv/${id}/season/${seasonNum}`);
  };

  // Scroll mobile buttons to center active season
  useEffect(() => {
    if (activeSeasonRef.current && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const button = activeSeasonRef.current;

      const offsetLeft = button.offsetLeft - container.offsetLeft;
      const scrollPos = offsetLeft - container.clientWidth / 2 + button.clientWidth / 2;

      container.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }
  }, [selectedSeasonNumber, allSeasons]);

  if (!season) {
    return (
      <div
        className="p-6 text-center rounded"
        style={{ color: theme.colors.textPrimary }}
      >
        {loading ? "Loading season..." : "Season not found"}
      </div>
    );
  }

  return (
    <div
      className="pt-24 px-6 max-w-6xl mx-auto space-y-8"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Season Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1
          className="text-3xl font-bold"
          style={{ color: theme.colors.textPrimary }}
        >
          {season.name}
        </h1>

        {/* Responsive Season Selector */}
        {allSeasons.length > 1 && (
          <>
            {/* Desktop: Select */}
            <select
              value={selectedSeasonNumber}
              onChange={(e) => handleSeasonChange(Number(e.target.value))}
              className="p-2 rounded-lg border shadow-sm hover:shadow-md transition hidden md:block"
              style={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: "0.5rem",
              }}
            >
              {allSeasons.map((s) => (
                <option
                  key={s.id}
                  value={s.season_number}
                  className="hover:bg-red-600"
                >
                  {s.name}
                </option>
              ))}
            </select>

            {/* Mobile: Horizontal scrollable buttons */}
            <div
              className="flex md:hidden gap-2 overflow-x-auto pb-2 -mx-2 scroll-smooth"
              ref={mobileScrollRef}
            >
              {allSeasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSeasonChange(s.season_number)}
                  ref={s.season_number === selectedSeasonNumber ? activeSeasonRef : null}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedSeasonNumber === s.season_number
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Season Overview */}
      {season.overview && (
        <p
          className="text-lg opacity-80 mb-6"
          style={{ color: theme.colors.textSecondary }}
        >
          {season.overview}
        </p>
      )}

      {/* Season Videos */}
      {seasonVideos.length > 0 && (
        <section className="mb-8">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: theme.colors.textPrimary }}
          >
            Videos
          </h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {seasonVideos.slice(0, 5).map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="w-64 cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition transform bg-gray-900"
              >
                <div className="relative w-full aspect-video">
                  <YouTubeThumbnail videoKey={video.key} alt={video.name} />
                </div>
                <p className="p-2 text-sm font-medium text-white">{video.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Episodes */}
      <h2
        className="text-2xl font-semibold mb-4"
        style={{ color: theme.colors.textPrimary }}
      >
        Episodes
      </h2>

      {season.episodes?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {season.episodes.map((ep) => (
            <div
              key={ep.id}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition bg-gradient-to-b from-gray-800 to-gray-900"
            >
              <div className="relative w-full h-52">
                <Image
                  src={
                    ep.still_path
                      ? `${IMAGE_BASE}/w500${ep.still_path}`
                      : "/fallback.png"
                  }
                  alt={ep.name || "Episode image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">
                  {ep.episode_number}. {ep.name}
                </h3>
                <p
                  className="text-xs opacity-70 mb-2"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {ep.air_date}
                </p>
                <p className="text-sm text-gray-200">
                  {ep.overview || "No description"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-center text-lg opacity-70"
          style={{ color: theme.colors.textSecondary }}
        >
          No episodes found for this season.
        </p>
      )}

      {/* Video Modal */}
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
    </div>
  );
}
