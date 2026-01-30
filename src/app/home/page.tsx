"use client";
import { useEffect, useState } from "react";
import MovieHeroSlider from "@/components/MovieHeroSlider/MovieHeroSlider";
import { movieService } from "@/services/movie.service";

export default function HomePage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await movieService.getPopular();
        // console.log(res.results);
        
        setMovies(res.results);
      } catch (error) {
        console.error("Failed to fetch movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return null; // or loader

  return <MovieHeroSlider movies={movies} />;
}
