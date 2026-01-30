"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MovieHeroSlider.module.css";
import { useTheme } from "@/styles/useTheme";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function MovieHeroSlider({ movies, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!movies.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, interval);

    return () => clearInterval(timer);
  }, [movies.length, interval]);

  if (!movies.length) return null;

  const movie = movies[index];

  /** 🎬 Pick best trailer (same logic as MovieCard) */
  const trailer =
    movie.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) ||
    movie.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

  const imageSrc =
    movie.backdrop_path
      ? `${IMAGE_BASE}${movie.backdrop_path}`
      : movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : "/fallback.png";

  return (
    <section className={styles.slider}>
      {/* Background */}
      <Image
        src={imageSrc}
        alt={movie.title}
        fill
        priority
        className={styles.background}
        unoptimized
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p className={styles.overview}>{movie.overview}</p>

        <div className={styles.meta}>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>

        {trailer && (
          <button
            onClick={() => setSelectedVideo(trailer)}
            className={styles.button}
            style={{ backgroundColor: theme.colors.primary }}
          >
            ▶ Watch Trailer
          </button>
        )}
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {movies.map((_, i) => (
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
