// app/movies/top-rated/page.tsx
import { movieService } from "@/services/movie.service";
import MovieList from "@/components/MovieList/MovieList";

export default async function TopRatedMoviesPage({}) {
  const data = await movieService.getTopRated();

  return (
        <div className="p-6 mt-8 space-y-6">

      <MovieList
        movies={data.results}
        header={{
          title: "Top Rated Movies",
          description:
            "Critically acclaimed movies with the highest ratings of all time.",
        }}
      />
    </div>
  );
}
