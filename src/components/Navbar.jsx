import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 px-6 py-4 flex flex-row justify-between items-center text-white transition-all duration-300 ${
          scrolled
            ? "bg-black bg-opacity-70 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/cyberpunk.png`}
          alt="Cyberpunk Logo"
          className="w-48 mix-blend-screen filter saturate-200 contrast-150 hover:scale-105 transition-transform duration-300"
        />
        <ul className="flex flex-row gap-6 text-sm font-bold uppercase tracking-wider">
          {["Games", "Leaderboard", "Community", "Shop", "Support"].map(
            (item) => (
              <li key={item} className="relative group">
                <a
                  href="#"
                  className="py-2 px-3 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );
}
