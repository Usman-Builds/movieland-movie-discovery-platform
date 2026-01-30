// services/search.service.ts
import { tmdbClient } from "./tmdb.client";

export const searchService = {
  searchMovies: (query: string, page = 1) =>
    tmdbClient.get("/search/movie", {
      params: { query, page },
    }),

  searchTv: (query: string, page = 1) =>
    tmdbClient.get("/search/tv", {
      params: { query, page },
    }),

  searchPeople: (query: string, page = 1) =>
    tmdbClient.get("/search/person", {
      params: { query, page },
    }),
};
