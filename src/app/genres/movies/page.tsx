import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import { movieService } from "@/services/movie.service";

interface Genre {
  id: number;
  name: string;
}

const genres: Genre[] = [
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

export default async function MovieGenresPage() {
  // Fetch movies for all genres in parallel using Promise.all
  const moviesByGenre: { [key: number]: any[] } = {};

  await Promise.all(
    genres.map(async (genre) => {
      try {
        const res = await movieService.getByGenre(genre.id, 1); // page 1
        // console.log(res);
        
        moviesByGenre[genre.id] = res.results;

      } catch (error) {
        console.error(`Failed to fetch movies for genre ${genre.name}`, error);
        moviesByGenre[genre.id] = [];
      }
    })
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 space-y-6">
      <h1 className="text-4xl font-bold mb-2 text-white">Movies by Genre</h1>
      <p className="text-gray-400 mb-16">
        Explore movies by their genres. Scroll horizontally to discover more movies in each category.
      </p>
     
      {genres.map((genre) => (
        <div key={genre.id}>
          {moviesByGenre[genre.id] && moviesByGenre[genre.id].length > 0 && (
            <MovieCarousel
              title={genre.name}
              movies={moviesByGenre[genre.id]}
              viewAllHref={`/genres/movies/${genre.id}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
