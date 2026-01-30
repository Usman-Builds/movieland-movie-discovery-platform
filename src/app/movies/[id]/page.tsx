import { movieService } from "@/services/movie.service";
import MovieCard from "@/components/MovieCard/MovieCard";
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";

interface Props {
  params: { id: string };
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;

  let movie: any = null;
  let similarMovies: any[] = [];

  try {
    const results = await Promise.all([
      movieService.getDetails(id),
      movieService.getSimilar(id),
    ]);

    movie = results[0];
    similarMovies = results[1].results;
    // console.log(similarMovies);
    

  } catch (error: any) {
    console.error("TMDB API Error:", error?.message);
    return (
      <div className="p-6 text-red-500">
        Movie not found or invalid ID: {id}
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 md:px-8 lg:px-16 space-y-12">
      <MovieCard movie={movie} />
      <MovieCarousel title={"Similar Movies"} movies={similarMovies} />
    </div>
  );
}
