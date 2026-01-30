// app/movies/popular/page.tsx
import TvList from "@/components/TvList/TvList";
import { tvService } from "@/services/tv.service";

export default async function TopRatedTvShowsPage({}) {
  const data = await tvService.getOnTheAir();

  return (
        <div className="p-6 mt-8 space-y-6">
  <TvList
        tvShows={data.results}
        header={{
          title: "Top Rated",
          description: "The most Top Rated Tv Shows right now across the world.",
        }}
      />
    </div>
  );
}
