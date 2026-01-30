// services/person.service.ts
import { tmdbClient } from "./tmdb.client";

export const personService = {
  getPopular: (page: number = 1) =>
    tmdbClient.get("/person/popular", { params: { page } }),
  getDetails: (id: number | string) => tmdbClient.get(`/person/${id}`),
  getCredits: (id: number | string) =>
    tmdbClient.get(`/person/${id}/combined_credits`),
};
