"use client";

import React, { useEffect, useState } from "react";

interface HeaderEpicareProps {
  isHeaderPill?: boolean;
  isHeaderForcedDark?: boolean;
}

export default function HeaderEpicare({
  isHeaderPill = false,
  isHeaderForcedDark = false,
}: HeaderEpicareProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navLayoutClass = isHeaderPill
    ? "top-0 md:top-2 h-16"
    : "top-4 md:top-6 h-16";

  const navPositionClass = "fixed left-0 right-0 mx-auto w-full md:w-[calc(100%-2*var(--space-gutter-sm))] lg:w-[calc(100%-2*var(--space-gutter-md))] max-w-section-xl";

  const navBgClass = isHeaderPill
    ? (isHeaderForcedDark 
        ? "bg-black/20 border-white/10 dark:border-white/5 shadow-elevation-2 rounded-none md:rounded-lg border-b md:border backdrop-blur-md" 
        : "bg-white/50 dark:bg-black/20 border-black/10 dark:border-white/5 shadow-elevation-2 rounded-none md:rounded-lg border-b md:border backdrop-blur-md")
    : "bg-transparent border-transparent shadow-none rounded-none";

  const iconColorClass = (isHeaderForcedDark || isDark)
    ? "text-white hover:text-white/80"
    : "text-[var(--color-text-Black-100)] hover:opacity-80";

  return (
    <>
      {/* Background Pill Layer */}
      <div 
        className={`${navPositionClass} pointer-events-none transition-[top,background-color,border-color,box-shadow,opacity] duration-300 ${navLayoutClass} ${navBgClass} z-[999998]`}
      />

      {/* Controls & Logo Layer */}
      <nav 
        className={`${navPositionClass} flex justify-between items-center px-4 md:px-6 z-[999999] pointer-events-auto transition-[top,background-color,border-color,box-shadow,opacity] duration-300 ${navLayoutClass}`}
      >
        {/* Logo en el header */}
        <div 
          id="fixed-navbar-logo" 
          className="flex-shrink-0 flex items-center"
        >
          <img 
            src="/short_logo.svg" 
            alt="Epicare" 
            className="h-[36px] md:h-[44px] w-auto select-none pointer-events-none"
          />
        </div>
        
        {/* Botones de acción */}
        <div id="fixed-navbar-actions" className={`flex items-center gap-fluid-xs transition-colors duration-300 ${iconColorClass}`}>
          <button 
            id="header-theme-toggle"
            type="button" 
            onClick={toggleTheme} 
            className="w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            {isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
          <button 
            id="header-menu-button"
            type="button" 
            className="w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-opacity hover:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
