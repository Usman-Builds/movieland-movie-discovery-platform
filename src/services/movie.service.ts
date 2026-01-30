// services/movie.service.ts
import { tmdbClient } from "./tmdb.client";

export const movieService = {
  // Popular movies
  getPopular: (page = 1) =>
    tmdbClient.get("/movie/popular", {
      params: { page, append_to_response: "videos" },
    }),

  // Top rated movies
  getTopRated: (page = 1) =>
    tmdbClient.get("/movie/top_rated", {
      params: {
        page,
      },
    }),

  // Upcoming movies
  getUpcoming: (page = 1) =>
    tmdbClient.get("/movie/upcoming", {
      params: { page },
    }),

  // Now playing movies
  getNowPlaying: (page = 1) =>
    tmdbClient.get("/movie/now_playing", {
      params: { page },
    }),

  // Movie details
  getDetails: (id: number | string) =>
    tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: "videos,credits",
      },
    }),

  // Credits
  getCredits: (id: number | string) => tmdbClient.get(`/movie/${id}/credits`),

  // Videos
  getVideos: (id: number | string) => tmdbClient.get(`/movie/${id}/videos`),

  // Similar movies
  getSimilar: (id: number | string) => tmdbClient.get(`/movie/${id}/similar`),

  // Movies by genre
  getByGenre: (genreId: number | string, page = 1) =>
    tmdbClient.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
      },
    }),

};
