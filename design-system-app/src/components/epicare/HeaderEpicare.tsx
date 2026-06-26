"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

interface HeaderEpicareProps {
  isHeaderPill?: boolean;
  isHeaderForcedDark?: boolean;
}

export default function HeaderEpicare({
  isHeaderPill = false,
  isHeaderForcedDark = false,
}: HeaderEpicareProps) {
  const t = useTranslations("landingV2.nav");
  const tHero = useTranslations("landingV2.hero");
  const [isDark, setIsDark] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Cambia al instante para máxima reactividad sin delay
    setActiveMenu(key);
  };

  const handleMouseLeaveNav = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Solo 50ms para poder cruzar el espacio de 4px (mt-1) entre el botón y el panel
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 50);
  };

  const navItems = [
    {
      key: "about",
      label: t("about"),
      items: [
        { title: t("aboutCompany"), desc: t("aboutCompanyDesc"), comingSoon: true, href: "#" },
        { title: t("aboutTeam"), desc: t("aboutTeamDesc"), href: "#" },
        { title: t("aboutLicensing"), desc: t("aboutLicensingDesc"), href: "#" },
      ]
    },
    {
      key: "gohub",
      label: t("gohub"),
      items: [
        { title: t("gohubCrm"), desc: t("gohubCrmDesc"), href: "#" },
        { title: t("gohubAms"), desc: t("gohubAmsDesc"), href: "#" },
        { title: t("gohubCalls"), desc: t("gohubCallsDesc"), href: "#" },
        { title: t("gohubAcademy"), desc: t("gohubAcademyDesc"), href: "#" },
      ]
    },
    {
      key: "solutions",
      label: t("solutions"),
      items: [
        { title: t("solMarketing"), desc: t("solMarketingDesc"), comingSoon: true, href: "#" },
        { title: t("solTech"), desc: t("solTechDesc"), href: "#" },
      ]
    }
  ];

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
    ? (isHeaderForcedDark || isDark)
      ? "bg-white/5 border-white/10 backdrop-blur-md shadow-elevation-2 rounded-none md:rounded-lg border-b md:border" 
      : "bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-blur-md shadow-elevation-2 rounded-none md:rounded-lg border-b md:border"
    : "bg-transparent border-transparent shadow-none rounded-none";

  const dropdownBgClass = isHeaderForcedDark || isDark 
    ? "bg-white/5 border-white/10 backdrop-blur-md" 
    : "bg-white/50 dark:bg-white/5 border-black/10 dark:border-white/10 backdrop-blur-md";

  const iconColorClass = (isHeaderForcedDark || isDark)
    ? "text-white hover:text-white/80"
    : "text-[var(--color-text-Black-100)] hover:opacity-80";

  const secondaryCtaClass = (isHeaderForcedDark || isDark)
    ? "bg-white/10 border-white/40 text-white hover:bg-white/20"
    : "bg-white/50 border-white text-[var(--color-text-primary)] hover:bg-white/80";

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

        {/* Desktop Navigation (Center) */}
        <div className="hidden md:flex items-center gap-fluid-sm absolute left-1/2 -translate-x-1/2 h-full">
          {navItems.map((item) => (
            <div 
              className="relative h-full flex items-center" 
              key={item.key}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeaveNav}
            >
              <button className={`flex items-center h-full text-body-sm transition-colors duration-300 ${iconColorClass}`}>
                <div className="relative flex items-center gap-1.5">
                  {item.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 transition-transform duration-300 ${activeMenu === item.key ? 'rotate-180' : ''}`}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                  {/* Animated Bottom Line - Anchored to text */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] bg-current transition-all duration-300 ease-out ${activeMenu === item.key ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></span>
                </div>
              </button>
              
              {/* Dropdown Panel - Single Node for Blur Performance */}
              <div 
                className={`absolute top-[100%] left-1/2 -translate-x-1/2 mt-1 z-[1000000] p-2 rounded-[8px] shadow-elevation-2 border flex flex-col w-[340px] transform-gpu transition-[opacity,transform,visibility] duration-200 ease-out ${dropdownBgClass} ${activeMenu === item.key ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}
              >
                  {item.items.map((subItem, idx) => (
                    <a href={subItem.href} key={idx} className={`flex flex-col gap-2 p-static-lg rounded-[6px] transition-colors duration-150 ${isHeaderForcedDark ? 'hover:bg-white/[0.08]' : 'hover:bg-black/5 dark:hover:bg-white/[0.08]'}`}>
                      <div className="flex flex-col items-start gap-1">
                        {subItem.comingSoon && (
                          <span className={`text-[0.625rem] uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1 ${isHeaderForcedDark || isDark ? 'bg-white/20 text-white border-white/20' : 'bg-black/5 text-[var(--color-text-primary)] border-black/5'}`}>
                            {t("comingSoon")}
                          </span>
                        )}
                        <span className={`text-body-sm font-medium transition-colors duration-200 ${isHeaderForcedDark || isDark ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>
                          {subItem.title}
                        </span>
                      </div>
                      <span className={`text-body-xs leading-relaxed ${isHeaderForcedDark || isDark ? 'text-white/70' : 'text-[var(--color-text-Black-100)] opacity-80'}`}>
                        {subItem.desc}
                      </span>
                    </a>
                  ))}
              </div>
            </div>
          ))}
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
            className="md:hidden w-10 h-10 flex items-center justify-center cursor-pointer relative z-50 transition-opacity hover:opacity-70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
          
          {/* CTA Desktop Secundario */}
          <button className={`hidden md:flex h-[44px] px-6 rounded-full border text-body-sm font-medium normal-case transition-all items-center justify-center shadow-elevation-1 backdrop-blur-md ${secondaryCtaClass}`}>
            {tHero('ctaAgents')}
          </button>
        </div>
      </nav>
    </>
  );
}
