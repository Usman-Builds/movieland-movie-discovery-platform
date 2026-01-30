// app/movies/now-playing/page.tsx
import { movieService } from "@/services/movie.service";
import MovieList from "@/components/MovieList/MovieList";

export default async function NowPlayingPage({}) {
  const data = await movieService.getNowPlaying();

  return (
    <div className="p-6 mt-8 space-y-6">

      <MovieList
        movies={data.results}
        header={{
          title: "Now Playing",
          description:
            "Movies that are currently playing in theaters near you.",
        }}
      />
    </div>
  );
}
