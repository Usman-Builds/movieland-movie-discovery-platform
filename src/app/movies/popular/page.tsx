// app/movies/popular/page.tsx
import { movieService } from "@/services/movie.service";
import MovieList from "@/components/MovieList/MovieList";


export default async function PopularMoviesPage({}) {
  const data = await movieService.getPopular();

  return (
        <div className="p-6 mt-8 space-y-6">

<MovieList
  movies={data.results}
  header={{
    title: "Popular Movies",
    description: "The most popular movies right now across the world.",
  }}
/>
      
    </div>
  );
}
