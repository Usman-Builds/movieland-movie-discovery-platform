"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/styles/useTheme";
import { filterByRequiredFields } from "@/utils/ValidContentFilter";

type Person = {
  id: number;
  name: string;
  profile_path: string | null;
  popularity:number;
  known_for_department: string;
  known_for: any[];
};

type PersonListHeader = {
  title: string;
  description?: string;
  backdrop?: string | null;
  viewAllLink?: string;
};

type Props = {
  people: Person[];
  header?: PersonListHeader;
};

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function PersonList({ people, header }: Props) {
  const { theme } = useTheme();

  if (!people || people.length === 0) {
    return <p className="text-center py-6">No people found.</p>;
  }

  // ✅ Filter incomplete people
  const filteredPeople = filterByRequiredFields(people || [], 
  ["id", "name", "profile_path", "popularity"],
  { popularity: 0 }
);


  // ❌ Nothing valid to show
  if (filteredPeople.length === 0) {
    return <p className="text-center py-6">No people found.</p>;
  }

  return (
    <section className="w-full">
      {/* ===== Header ===== */}
      {header && (
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <div className="relative z-10 px-6 py-10 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: theme.colors.textPrimary }}
              >
                {header.title}
              </h1>

              {header.description && (
                <p
                  className="opacity-80 text-sm md:text-base"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {header.description}
                </p>
              )}
            </div>

            {header.viewAllLink && (
              <Link
                href={header.viewAllLink}
                className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: "#fff",
                }}
              >
                View All
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ===== Grid ===== */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-4">
        {filteredPeople.map((person) => (
          <Link
            key={person.id}
            href={`/people/${person.id}`}
            className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300
                       hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: theme.colors.surface }}
          >
            {/* Profile Image */}
            {person.profile_path ? (
              <Image
                src={`${IMAGE_BASE}${person.profile_path}`}
                alt={person.name || "missing Image"}
                width={500}
                height={750}
                className="w-full h-auto object-cover"
              />
            ) : (
              <Image
                src={"/fallback.png"}
                alt={person.name || "missing Image"}
                width={500}
                height={750}
                className="w-full h-auto object-cover"
              />
            )}

            {/* Info */}
            <div className="p-2">
              <h3
                className="font-semibold text-sm truncate"
                style={{ color: theme.colors.textPrimary }}
              >
                {person.name}
              </h3>

              <div
                className="flex justify-between items-center mt-1 text-xs opacity-80"
                style={{ color: theme.colors.textSecondary }}
              >
                <span>{person.known_for_department}</span>
                <span>⭐ {person.popularity.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
