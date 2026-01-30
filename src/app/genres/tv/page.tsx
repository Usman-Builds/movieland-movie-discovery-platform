import TvCarousel from "@/components/TvCarousel/TvCarousel";
import { tvService } from "@/services/tv.service";

interface Genre {
  id: number;
  name: string;
}

const tvGenres: Genre[] = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 10762, name: "Kids" },
  { id: 9648, name: "Mystery" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 10768, name: "War & Politics" },
  { id: 37, name: "Western" },
];

export default async function TvGenresPage() {
  // Fetch TV shows for all genres in parallel
  const tvByGenre: { [key: number]: any[] } = {};

  await Promise.all(
    tvGenres.map(async (genre) => {
      try {
        const res = await tvService.getByGenre(genre.id);
        tvByGenre[genre.id] = res.results || [];
      } catch (error) {
        console.error(`Failed to fetch TV shows for genre ${genre.name}`, error);
        tvByGenre[genre.id] = [];
      }
    })
  );

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24 space-y-6">
      <h1 className="text-4xl font-bold mb-2 text-white">TV Shows by Genre</h1>
      <p className="text-gray-400 mb-16">
        Explore TV shows by their genres. Scroll horizontally to discover more shows in each category.
      </p>

      {tvGenres.map((genre) => (
        <div key={genre.id}>
          {tvByGenre[genre.id] && tvByGenre[genre.id].length > 0 && (
            <TvCarousel
              title={genre.name}
              tvShows={tvByGenre[genre.id]}
              viewAllHref={`/genres/tv/${genre.id}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
