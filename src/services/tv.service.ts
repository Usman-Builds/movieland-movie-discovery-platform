// services/tv.service.ts
import { tmdbClient } from "./tmdb.client";

export const tvService = {
  getPopular: () => tmdbClient.get("/tv/popular"),
  getTopRated: () => tmdbClient.get("/tv/top_rated"),
  getAiringToday: () => tmdbClient.get("/tv/airing_today"),
  getOnTheAir: () => tmdbClient.get("/tv/on_the_air"),
  getDetails: (id: number | string) => tmdbClient.get(`/tv/${id}`),
  getSeasons: (id: number | string) => tmdbClient.get(`/tv/${id}/season`),
  getEpisodes: (id: number | string, seasonNumber: number) =>
    tmdbClient.get(`/tv/${id}/season/${seasonNumber}`),
  getSimilar: (id: number | string) => tmdbClient.get(`/tv/${id}/similar`),
  getByGenre: (genreId: number | string, page: number | string) =>
    tmdbClient.get("/discover/tv", { params: { with_genres: genreId, page } }),
  getVideos: (id: number | string) => tmdbClient.get(`/tv/${id}/videos`),
  getSeasonVideos: (id: number | string, seasonNumber: number) =>
    tmdbClient.get(`/tv/${id}/season/${seasonNumber}/videos`),
};
