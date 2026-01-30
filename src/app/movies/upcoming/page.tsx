// app/movies/upcoming/page.tsx
import { movieService } from "@/services/movie.service";
import MovieList from "@/components/MovieList/MovieList";

export default async function UpcomingMoviesPage({}) {
  const data = await movieService.getUpcoming();

  return (
        <div className="p-6 mt-8 space-y-6">

      <MovieList
        movies={data.results}
        header={{
          title: "Upcoming Movies",
          description:
            "Discover movies that are coming soon to theaters and streaming.",
        }}
      />
    </div>
  );
}
