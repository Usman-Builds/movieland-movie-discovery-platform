import Pagination from "@/components/Pagination/Pagination";
import MovieList from "@/components/MovieList/MovieList";
import { movieService } from "@/services/movie.service";
import { notFound } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

const movieGenres: { id: number; name: string }[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

interface Props {
  params: { genreId: string };
  searchParams?: { page?: string | number };
}

export default async function MovieGenrePage({ params, searchParams }: Props) {
  const { genreId } = await params; // ❌ DO NOT TOUCH
  const { page } = await searchParams; // ❌ DO NOT TOUCH
  const currentPage = Number(page) || 1;

  const genre = movieGenres.find((g) => g.id == genreId);
  if (page>500) return notFound();
  if (!genre) return notFound();

  let movies: Movie[] = [];
  let totalPages = 1;

  try {
    const res = await movieService.getByGenre(genreId, currentPage);
    movies = res.results || [];
    totalPages = res.total_pages || 1;

    // ✅ Cap total pages at 500
    totalPages = Math.min(totalPages, 500);
  } catch (error) {
    console.error(`Failed to fetch movies for genre ${genre.name}:`, error);
  }

  return (
    <div className="p-6 mt-8 space-y-6">


      <MovieList header={{title:`${genre.name}`,description:` Explore movies in the "${genre.name}" genre.`}} movies={movies} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/genres/movies/${genreId}`}
        />
      )}
    </div>
  );
}
