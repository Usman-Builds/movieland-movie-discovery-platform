"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { bebasNeue } from "@/styles/fonts";
import { useTheme } from "@/styles/useTheme";
import { useRouter } from "next/navigation";

export default function Header() {
  const { theme } = useTheme();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [moviesDropdownOpen, setMoviesDropdownOpen] = useState(false);
  const [tvDropdownOpen, setTvDropdownOpen] = useState(false);
  const [genresDropdownOpen, setGenresDropdownOpen] = useState(false);

  const [mobileMoviesOpen, setMobileMoviesOpen] = useState(false);
  const [mobileTvOpen, setMobileTvOpen] = useState(false);
  const [mobileGenresOpen, setMobileGenresOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", description: "Back to homepage" },
    { label: "Movies", href: "/movies", description: "Browse all movies" },
    { label: "TV Shows", href: "/tv", description: "Watch TV series" },
    { label: "Genres", href: "/genres", description: "Browse Genres" },
    { label: "People", href: "/people", description: "Actors & creators" },
  ];

  const movieCategories = [
    {
      label: "Popular",
      href: "/movies/popular",
      description: "See Popular Movies",
    },
    {
      label: "Upcoming",
      href: "/movies/upcoming",
      description: "See Upcoming Movies",
    },
    {
      label: "Top Rated",
      href: "/movies/top-rated",
      description: "See Top Rated Movies",
    },
    {
      label: "Now Playing",
      href: "/movies/now-playing",
      description: "See Now Playing Movies",
    },
  ];

  const tvCategories = [
    {
      label: "Popular",
      href: "/tv/popular",
      description: "See Popular TV Shows",
    },
    {
      label: "Top Rated",
      href: "/tv/top-rated",
      description: "See Top Rated TV Shows",
    },
    {
      label: "Airing Today",
      href: "/tv/airing-today",
      description: "See Airing Today Shows",
    },
    {
      label: "On The Air",
      href: "/tv/on-the-air",
      description: "See Currently Airing Shows",
    },
  ];

  const genresCategories = [
    {
      label: "Movies Genres",
      href: "/genres/movies",
      description: "Browse Movie Genres",
    },
    { label: "TV Genres", href: "/genres/tv", description: "Browse TV Genres" },
  ];

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
    setMenuOpen(false); // close mobile menu
  };

  return (
    <header
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.textPrimary,
      }}
      className="w-full fixed top-0 left-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className={`text-3xl font-extrabold ${bebasNeue.className}`}
          style={{ color: theme.colors.primary }}
        >
          MovieLand
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 relative">
          {navItems.map((item) => {
            // Movies dropdown
            if (item.label === "Movies") {
              return (
                <div
                  key={`${item.href}-${item.description.slice(0, 10)}`}
                  className="relative"
                  onMouseEnter={() => setMoviesDropdownOpen(true)}
                  onMouseLeave={() => setMoviesDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {item.label} <FiChevronDown />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-40 rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200
                      ${moviesDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    {movieCategories.map((cat) => (
                      <Link
                        key={`${cat.href}-${cat.description.slice(0, 10)}`}
                        href={cat.href}
                        className="block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // TV Shows dropdown
            if (item.label === "TV Shows") {
              return (
                <div
                  key={`${item.href}-${item.description.slice(0, 10)}`}
                  className="relative"
                  onMouseEnter={() => setTvDropdownOpen(true)}
                  onMouseLeave={() => setTvDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {item.label} <FiChevronDown />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200
                      ${tvDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    {tvCategories.map((cat) => (
                      <Link
                        key={`${cat.href}-${cat.description.slice(0, 10)}`}
                        href={cat.href}
                        className="block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Genres dropdown
            if (item.label === "Genres") {
              return (
                <div
                  key={`${item.href}-${item.description.slice(0, 10)}`}
                  className="relative"
                  onMouseEnter={() => setGenresDropdownOpen(true)}
                  onMouseLeave={() => setGenresDropdownOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 hover:text-primary transition-colors duration-200 font-semibold"
                    style={{ color: theme.colors.textPrimary }}
                  >
                    {item.label} <FiChevronDown />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200
                      ${genresDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    style={{ backgroundColor: theme.colors.surface }}
                  >
                    {genresCategories.map((cat) => (
                      <Link
                        key={`${cat.href}-${cat.description.slice(0, 10)}`}
                        href={cat.href}
                        className="block px-4 py-2 text-sm hover:bg-primary hover:text-white transition-colors duration-200"
                        style={{ color: theme.colors.textPrimary }}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Regular link
            return (
              <Link
                key={`${item.href}-${item.description.slice(0, 10)}`}
                href={item.href}
                className="hover:text-primary transition-colors duration-200"
                style={{ color: theme.colors.textPrimary }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Desktop Search */}
          <div className="relative ml-6">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
            <input
              type="text"
              placeholder="Search movies ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 pr-4 py-1 rounded-lg border focus:outline-none transition-colors duration-200"
              style={{
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.surface,
                color: theme.colors.textPrimary,
              }}
            />
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl font-bold"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden w-full px-6 flex flex-col space-y-3 transition-all duration-300 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
        style={{ backgroundColor: theme.colors.surface }}
      >
        {navItems.map((item) => {
          // Movies mobile
          if (item.label === "Movies") {
            return (
              <div
                key={`${item.href}-${item.description.slice(0, 10)}`}
                className="flex flex-col"
              >
                <button
                  onClick={() => setMobileMoviesOpen(!mobileMoviesOpen)}
                  className="flex justify-between items-center font-semibold py-2 hover:text-primary transition-colors duration-200"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {item.label}{" "}
                  <FiChevronRight
                    className={`${mobileMoviesOpen ? "rotate-90" : ""} transition-transform`}
                  />
                </button>
                {mobileMoviesOpen && (
                  <div className="flex flex-col pl-4 space-y-1">
                    {movieCategories.map((cat) => (
                      <>
                        <Link
                          key={`${cat.href}-${cat.description.slice(0, 10)}`}
                          href={cat.href}
                          className="py-1 hover:text-primary transition-colors duration-200 font-semibold"
                          style={{ color: theme.colors.textPrimary }}
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                        <span
                          className="text-xs opacity-70"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {cat.description}
                        </span>
                      </>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // TV Shows mobile
          if (item.label === "TV Shows") {
            return (
              <div
                key={`${item.href}-${item.description.slice(0, 10)}`}
                className="flex flex-col"
              >
                <button
                  onClick={() => setMobileTvOpen(!mobileTvOpen)}
                  className="flex justify-between items-center font-semibold py-2 hover:text-primary transition-colors duration-200"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {item.label}{" "}
                  <FiChevronRight
                    className={`${mobileTvOpen ? "rotate-90" : ""} transition-transform`}
                  />
                </button>
                {mobileTvOpen && (
                  <div className="flex flex-col pl-4 space-y-1">
                    {tvCategories.map((cat) => (
                      <>
                        <Link
                          key={`${cat.href}-${cat.description.slice(0, 10)}`}
                          href={cat.href}
                          className="py-1 hover:text-primary transition-colors duration-200 font-semibold"
                          style={{ color: theme.colors.textPrimary }}
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                        <span
                          className="text-xs opacity-70"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {cat.description}
                        </span>
                      </>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Genres mobile
          if (item.label === "Genres") {
            return (
              <div
                key={`${item.href}-${item.description.slice(0, 10)}`}
                className="flex flex-col"
              >
                <button
                  onClick={() => setMobileGenresOpen(!mobileGenresOpen)}
                  className="flex justify-between items-center font-semibold py-2 hover:text-primary transition-colors duration-200"
                  style={{ color: theme.colors.textPrimary }}
                >
                  {item.label}{" "}
                  <FiChevronRight
                    className={`${mobileGenresOpen ? "rotate-90" : ""} transition-transform`}
                  />
                </button>
                {mobileGenresOpen && (
                  <div className="flex flex-col pl-4 space-y-1">
                    {genresCategories.map((cat) => (
                      <>
                        <Link
                          key={`${cat.href}-${cat.description.slice(0, 10)}`}
                          href={cat.href}
                          className="py-1 hover:text-primary transition-colors duration-200 font-semibold"
                          style={{ color: theme.colors.textPrimary }}
                          onClick={() => setMenuOpen(false)}
                        >
                          {cat.label}
                        </Link>
                        <span
                          className="text-xs opacity-70"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {cat.description}
                        </span>
                      </>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Regular link
          return (
            <div
              key={`${item.href}-${item.description.slice(0, 10)}`}
              className="flex flex-col"
            >
              <Link
                href={item.href}
                className="hover:text-primary transition-colors duration-200 font-semibold"
                style={{ color: theme.colors.textPrimary }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              <span
                className="text-sm opacity-70"
                style={{ color: theme.colors.textSecondary }}
              >
                {item.description}
              </span>
            </div>
          );
        })}

        {/* Mobile Search */}
        <div className="relative m-4">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl" />
          <input
            type="text"
            placeholder="Search movies, TV shows or people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 pr-4 py-1 rounded-lg border w-full focus:outline-none"
            style={{
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.surface,
              color: theme.colors.textPrimary,
            }}
          />
        </div>
      </div>
    </header>
  );
}
