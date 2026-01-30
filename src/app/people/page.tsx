import PersonList from "@/components/PersonList/PersonList";
import Pagination from "@/components/Pagination/Pagination";
import { personService } from "@/services/person.service";
import { notFound } from "next/navigation";

interface Props {
  searchParams?: { page?: string | number };
}

export default async function PeoplePage({ searchParams }: Props) {
  const { page } = await searchParams; // ❌ Do not touch

  // Fix: convert to number safely, fallback to 1, cap at 500
  const currentPage = Math.min(Math.max(Number(page) || 1, 1), 500);

  let people: any[] = [];
  let totalPages = 1;

  try {
    const res = await personService.getPopular(currentPage);
    people = res.results || [];
    console.log(people);
    
    totalPages = res.total_pages || 1;

    if (totalPages > 500) totalPages = 500; // TMDB max page is 500
  } catch (error) {
    console.error("Failed to fetch popular people:", error);
    people = [];
    totalPages = 1;
  }

  if (!people || people.length === 0) return notFound();

  return (
    <div className=" p-6 mt-8 space-y-6">
      

      <PersonList header={{title:"Popular People",description:"Explore popular actors and personalities."}} people={people} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/people"
        />
      )}
    </div>
  );
}
