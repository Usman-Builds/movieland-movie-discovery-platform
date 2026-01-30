// services/genre.service.ts
import { tmdbClient } from "./tmdb.client";

export const genreService = {
  getMovieGenres: () => tmdbClient.get("/genre/movie/list"),
  getTvGenres: () => tmdbClient.get("/genre/tv/list"),
};
