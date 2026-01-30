// app/movies/popular/page.tsx
import TvList from "@/components/TvList/TvList";
import { tvService } from "@/services/tv.service";

export default async function PopularTvShowsPage({}) {
  const data = await tvService.getPopular();

  return (
        <div className="p-6 mt-8 space-y-6">
  <TvList
        tvShows={data.results}
        header={{
          title: "Popular Tv Shows",
          description: "The most popular Tv Shows right now across the world.",
        }}
      />
    </div>
  );
}
