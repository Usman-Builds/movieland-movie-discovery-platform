// services/tmdb.client.ts
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

tmdbClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("TMDB API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
