// app/people/[personId]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { personService } from "@/services/person.service";

interface PersonPageProps {
  params: { personId: string };
}

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default async function PersonPage({ params }: PersonPageProps) {
  const { personId } = await params;

  let person: any = null;
  let credits: any = null;

  try {
    const res = await personService.getDetails(personId);
    person = res;

    const creditRes = await personService.getCredits(personId);
    credits = creditRes;
  } catch (error) {
    console.error(`Failed to fetch person ${personId}:`, error);
    return notFound();
  }

  if (!person) return notFound();

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Image
            src={
              person.profile_path
                ? `${IMAGE_BASE}${person.profile_path}`
                : "/fallback.png"
            }
            alt={person.name || "missing Image"}
            width={400}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-white">{person.name}</h1>
          {person.known_for_department && (
            <p className="text-gray-400">
              Department: {person.known_for_department}
            </p>
          )}
          {person.biography && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Biography
              </h2>
              <p className="text-gray-300">{person.biography}</p>
            </div>
          )}
        </div>
      </div>

      {/* Known For */}
      {credits?.cast?.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Known For</h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {credits.cast.map((item: any) => (
              <Link
                key={`${item.id}-${item.character}`}
                href={
                  item.media_type === "movie"
                    ? `/movies/${item.id}`
                    : `/tv/${item.id}`
                }
                className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl"
              >
                {item.poster_path ? (
                  <div className="relative w-full pt-[150%] rounded-lg overflow-hidden">
                    <Image
                      src={`${IMAGE_BASE}${item.poster_path}`}
                      alt={item.title || item.name || "missing Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative w-full pt-[150%] rounded-lg overflow-hidden">
                    <Image
                      src="/fallback.png" // your fallback image
                      alt={item.title || item.name || "No Image"}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-2">
                  <h3 className="font-semibold text-sm text-white truncate">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {item.release_date?.slice(0, 4) ||
                      item.first_air_date?.slice(0, 4) ||
                      "—"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
