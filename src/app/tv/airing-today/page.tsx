// app/movies/popular/page.tsx
import TvList from "@/components/TvList/TvList";
import { tvService } from "@/services/tv.service";

export default async function AiringTodayTvShowsPage({}) {
  const data = await tvService.getAiringToday();

  return (
        <div className="p-6 mt-8 space-y-6">
  <TvList
        tvShows={data.results}
        header={{
          title: "Airing Today",
          description: "Tv Shows that are premiering new episodes today, fresh from the network.",
        }}
      />
    </div>
  );
}
