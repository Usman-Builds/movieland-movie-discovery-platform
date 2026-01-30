"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./TvHeroSlider.module.css";
import { useTheme } from "@/styles/useTheme";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

interface TvHeroSliderProps {
  shows: any[];
  interval?: number;
}

export default function TvHeroSlider({ shows, interval = 5000 }: TvHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!shows?.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % shows.length);
    }, interval);

    return () => clearInterval(timer);
  }, [shows, interval]);

  if (!shows?.length) return null;

  const show = shows[index];

  /** 🎬 Pick best trailer */
  const trailer =
    show.videos?.results?.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    show.videos?.results?.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer"
    );

  const imageSrc =
    show.backdrop_path
      ? `${IMAGE_BASE}${show.backdrop_path}`
      : show.poster_path
      ? `${IMAGE_BASE}${show.poster_path}`
      : "/fallback.png";

  return (
    <section className={styles.slider}>
      {/* Background */}
      <Image
        src={imageSrc}
        alt={show.name}
        fill
        priority
        className={styles.background}
        unoptimized
      />

      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{show.name}</h1>

        <p className={styles.overview}>{show.overview}</p>

        <div className={styles.meta}>
          {show.vote_average && <span>⭐ {show.vote_average.toFixed(1)}</span>}
          {show.number_of_seasons && (
            <span>{show.number_of_seasons} Seasons</span>
          )}
          {show.first_air_date && (
            <span>{show.first_air_date.slice(0, 4)}</span>
          )}
          {show.status && <span>{show.status}</span>}
        </div>

        <div className={styles.actions}>
          {trailer && (
            <button
              onClick={() => setSelectedVideo(trailer)}
              className={styles.button}
              style={{ backgroundColor: theme.colors.primary }}
            >
              ▶ Watch Trailer
            </button>
          )}

          <a
            href={`/tv/${show.id}`}
            className={styles.secondaryButton}
          >
            View Details
          </a>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {shows.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* 🎥 Trailer Modal */}
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
              className="absolute top-3 right-3 bg-black/70 text-white
                         w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
