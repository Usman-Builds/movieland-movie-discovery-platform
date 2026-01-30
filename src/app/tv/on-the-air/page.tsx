// app/movies/popular/page.tsx
import TvList from "@/components/TvList/TvList";
import { tvService } from "@/services/tv.service";

export default async function OnTheAirTvShowsPage({}) {
  const data = await tvService.getOnTheAir();

  return (
        <div className="p-6 mt-8 space-y-6">
  <TvList
        tvShows={data.results}
        header={{
          title: "On The Air",
          description: "Tv Shows that are currently being broadcast, keeping audiences entertained across the world.",
        }}
      />
    </div>
  );
}
