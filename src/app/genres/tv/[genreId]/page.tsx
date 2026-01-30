import Pagination from "@/components/Pagination/Pagination";
import TvList from "@/components/TvList/TvList";
import { tvService } from "@/services/tv.service";
import { notFound } from "next/navigation";

interface TvShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
}

const tvGenres: { id: number; name: string }[] = [
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

interface Props {
  params: { id: string };
  searchParams?: { page?: string };
}

export default async function TvGenrePage({ params, searchParams }: Props) {
  const { genreId } = await params; // ❌ DO NOT TOUCH
  const { page } = await searchParams; // ❌ DO NOT TOUCH

  const currentPage = Number(page) || 1;
  const genre = tvGenres.find((g) => g.id == genreId);
  if (page>500) return notFound();
  if (!genre) return notFound();

  let tvShows: TvShow[] = [];
  let totalPages = 1;

  try {
    const res = await tvService.getByGenre(genreId, currentPage);
    tvShows = res.results || [];
    totalPages = res.total_pages || 1;

    // ✅ Cap TMDB limit at 500 pages
    totalPages = Math.min(totalPages, 500);
  } catch (error) {
    console.error(`Failed to fetch TV shows for genre ${genre.name}:`, error);
  }

  return (
    <div className="p-6 mt-8 space-y-6">
      

      <TvList header={{title:`${genre.name}`,description:` Explore TV SHOWS in the "${genre.name}" genre.`}} tvShows={tvShows} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/genres/tv/${genreId}`}
        />
      )}
    </div>
  );
}
