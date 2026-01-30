import { tvService } from "@/services/tv.service";
import TvShowCard from "@/components/TvShowCard/TvShowCard";
import TvCarousel from "@/components/TvCarousel/TvCarousel";

interface Props {
  params: { id: string };
}

export default async function TvDetailPage({ params }: Props) {
  const { id } = await params;

  let tv, similar;

  try {
    const [tvRes, similarRes] = await Promise.all([
      tvService.getDetails(id),
      tvService.getSimilar(id),
    ]);

    tv = tvRes;
    similar = similarRes.results || [];

    // console.log("tv",tv);
    
  } catch (error: any) {
    console.error("TMDB TV Error:", error.response?.data || error.message);
    return (
      <div className="p-6 text-red-500">
        TV Show not found or invalid ID: {id}
      </div>
    );
  }

  return (
    <div className="mt-24 px-2">
      <TvShowCard tv={tv} />
      <TvCarousel title={"Similar Shows"} tvShows={similar}/>
    </div>
  );
}
