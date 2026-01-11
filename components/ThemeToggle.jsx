"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle({ onChange }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    onChange?.(dark);
  }, [dark, onChange]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="fixed top-3 right-3 md:top-6 md:right-8 z-[110] 
                 bg-white/90 dark:bg-black/40 backdrop-blur-xl
                 border border-black/10 dark:border-white/20 
                 shadow-lg px-3 py-2 md:px-5 md:py-2.5 
                 rounded-full transition-all hover:scale-105 active:scale-95"
    >
      <span className="text-sm md:text-lg">{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
