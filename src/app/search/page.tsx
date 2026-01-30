import SearchClient from "./SearchClient";
import { searchService } from "@/services/search.service";

interface Props {
  searchParams?: {
    q?: string;
    type?: "movie" | "tv" | "person";
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
 const params=await searchParams;
 console.log("params",params);
 
    const query = (await params?.q) ?? "";
  const type = (await params?.type) ?? "movie";
  const page = await Number(params?.page ?? 1);

  console.log("query", query);
  console.log("type", type);
  console.log("page", page);

  if (!query) {
    return <SearchClient results={[]} totalPages={0} />;
  }

  let res;

  switch (type) {
    case "tv":
      res = await searchService.searchTv(query, page);
      break;
    case "person":
      res = await searchService.searchPeople(query, page);
      break;
    default:
      res = await searchService.searchMovies(query, page);
  }

  return (
    <SearchClient
      results={res.results || []}
      totalPages={Math.min(res.total_pages || 1, 500)}
    />
  );
}
