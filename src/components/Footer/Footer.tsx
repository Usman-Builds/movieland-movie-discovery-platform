"use client";

import { useTheme } from "@/styles/useTheme";
import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { bebasNeue } from "@/styles/fonts";

export default function Footer() {
  const { theme } = useTheme();

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Usman-Builds",
      icon: <FiGithub />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/usman-ghani-763468255/",
      icon: <FiLinkedin />,
    },
  ];

  const groupedLinks = [
    {
      title: "Movies",
      links: [
        { label: "Popular", href: "/movies/popular" },
        { label: "Now Playing", href: "/movies/now-playing" },
        { label: "Top Rated", href: "/movies/top-rated" },
        { label: "Upcoming", href: "/movies/upcoming" },
        { label: "Movie Genres", href: "/genres/movies" },
      ],
    },
    {
      title: "TV Shows",
      links: [
        { label: "Popular", href: "/tv/popular" },
        { label: "On The Air", href: "/tv/on-the-air" },
        { label: "Airing Today", href: "/tv/airing-today" },
        { label: "Top Rated", href: "/tv/top-rated" },
        { label: "TV Genres", href: "/genres/tv" },
      ],
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.textSecondary,
      }}
      className="w-full mt-12 py-10 border-t border-transparent shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        {/* Logo */}
        <div className="flex items-center md:items-start">
          <Link
            href="/"
            className={`text-3xl font-extrabold ${bebasNeue.className}`}
            style={{ color: theme.colors.primary }}
          >
            MovieLand
          </Link>
        </div>

        {/* Link Groups */}
        {groupedLinks.map((group) => (
          <div key={group.title} className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold">{group.title}</h3>
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors duration-200"
                style={{ color: theme.colors.textSecondary }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Social Links */}
        <div className="flex flex-col space-y-3 items-start md:items-end">
          <h3 className="text-white font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200"
                style={{ color: theme.colors.textSecondary }}
                aria-label={link.label}
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-6 mx-6 md:mx-8" />

      {/* Copyright & Personal Credit */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center space-y-2">
        <p
          className="text-sm font-light"
          style={{ color: theme.colors.textSecondary }}
        >
          &copy; {new Date().getFullYear()} MovieLand. All rights reserved.
        </p>
        <p
          className="text-sm font-light"
          style={{ color: theme.colors.textSecondary }}
        >
          Designed & developed by{" "}
          <Link
            href="https://www.linkedin.com/in/usman-ghani-763468255/"
            target="_blank"
            className="hover:text-primary font-semibold"
          >
            Muhammad Usman Ghani
          </Link>
        </p>
      </div>
    </footer>
  );
}
