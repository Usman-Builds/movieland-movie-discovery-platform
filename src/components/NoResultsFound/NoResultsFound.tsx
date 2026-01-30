"use client";

import { FC } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";
import { useTheme } from "@/styles/useTheme";

interface NoResultsProps {
  query?: string;
  iconSize?: number;
  message?: string;
}

const NoResultsFound: FC<NoResultsProps> = ({
  query,
  iconSize = 80,
  message,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center mt-16 space-y-4 px-4 text-center"
      style={{ color: theme.colors.textSecondary }}
    >
      {/* Icon */}
      {query ? (
        <MdOutlineSentimentDissatisfied size={iconSize} />
      ) : (
        <FiSearch size={iconSize} />
      )}

      {/* Message */}
      <p className="text-lg opacity-80">
        {message
          ? message
          : query
          ? `No results found for “${query}”`
          : "Start typing to search for movies, TV shows, or people 🎬"}
      </p>
    </div>
  );
};

export default NoResultsFound;
