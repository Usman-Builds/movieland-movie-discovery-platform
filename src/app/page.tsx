import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import MovieHeroSlider from "@/components/MovieHeroSlider/MovieHeroSlider";
import TvCarousel from "@/components/TvCarousel/TvCarousel";
import TvHeroSlider from "@/components/TvHeroSlider/TvHeroSlider";

import { movieService } from "@/services/movie.service";
import { tvService } from "@/services/tv.service";

export const revalidate = 60; // cache page for 60 seconds (ISR)

export default async function Home() {
  // -------------------------
  // 1️⃣ Parallel fetches
  // -------------------------
  const [moviesRes, tvRes] = await Promise.all([
    Promise.all([
      movieService.getPopular(),
      movieService.getNowPlaying(),
      movieService.getTopRated(),
      movieService.getUpcoming(),
    ]),
    Promise.all([
      tvService.getPopular(),
      tvService.getOnTheAir(),
      tvService.getAiringToday(),
      tvService.getTopRated(),
    ]),
  ]);

  const [popularRes, nowPlayingRes, topRatedRes, upcomingRes] = moviesRes;
  const [popularTvRes, onTheAirTvRes, airingTodayTvRes, topRatedTvRes] = tvRes;

  // -------------------------
  // 2️⃣ Hero Movies (enriched)
  // -------------------------
  const heroMoviesBase = popularRes.results.slice(0, 5);
  const heroMovies = await Promise.all(
    heroMoviesBase.map(async (movie) => ({
      ...movie,
      ...(await movieService.getDetails(movie.id)), // enrich only hero
    }))
  );

  // -------------------------
  // 3️⃣ Movie & TV lists (lightweight)
  // -------------------------
  const popularMovies = popularRes.results;
  const nowPlayingMovies = nowPlayingRes.results;
  const topRatedMovies = topRatedRes.results;
  const upcomingMovies = upcomingRes.results;

  const popularTvShows = popularTvRes.results;
  const onTheAirTvShows = onTheAirTvRes.results;
  const airingTodayTvShows = airingTodayTvRes.results;
  const topRatedTvShows = topRatedTvRes.results;

  // -------------------------
  // 4️⃣ Render
  // -------------------------
  return (
    <div className="pt-16 space-y-16">
      {/* ================= HERO ================= */}
      <MovieHeroSlider movies={heroMovies} interval={5000} />

      {/* ================= MOVIES ================= */}
      <MovieCarousel
        title="Popular Movies"
        movies={popularMovies}
        viewAllHref="/movies/popular"
      />
      <MovieCarousel
        title="Now Playing Movies"
        movies={nowPlayingMovies}
        viewAllHref="/movies/now-playing"
      />
      <MovieCarousel
        title="Top Rated Movies"
        movies={topRatedMovies}
        viewAllHref="/movies/top-rated"
      />
      <MovieCarousel
        title="Upcoming Movies"
        movies={upcomingMovies}
        viewAllHref="/movies/upcoming"
      />

      {/* ================= SECTION DIVIDER ================= */}
      <div className="px-6 pt-16 pb-6 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          TV Shows
        </h2>
        <div className="w-16 h-1 bg-red-500 rounded-full my-4" />
        <p className="max-w-xl text-sm md:text-base text-white/70">
          Binge-worthy series airing now and timeless shows worth watching again
        </p>
      </div>

      {/* ================= TV HERO ================= */}
      <TvHeroSlider shows={popularTvShows.slice(0, 5)} />

      {/* ================= TV CAROUSELS ================= */}
      <TvCarousel
        title="Popular TV Shows"
        tvShows={popularTvShows}
        viewAllHref="/tv/popular"
      />
      <TvCarousel
        title="On The Air"
        tvShows={onTheAirTvShows}
        viewAllHref="/tv/on-the-air"
      />
      <TvCarousel
        title="Airing Today"
        tvShows={airingTodayTvShows}
        viewAllHref="/tv/airing-today"
      />
      <TvCarousel
        title="Top Rated TV Shows"
        tvShows={topRatedTvShows}
        viewAllHref="/tv/top-rated"
      />
    </div>
  );
}
