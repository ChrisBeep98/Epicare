"use client";

import React from "react";
import { CheckCircle, Sparkle } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { AgentAgencyFeatureCardsProps } from "./types";

export function AgentAgencyFeatureCards({
  isAgent,
  features,
  activeSlide,
  isPaused,
  onSelectSlide,
}: AgentAgencyFeatureCardsProps) {
  const t = useTranslations('goAms.agentAgency');

  return (
    <div className="col-span-6 md:col-span-8 lg:col-span-6 flex flex-col justify-between gap-6 py-2 order-1 lg:order-2">
      <div className="flex flex-col gap-4">
        {/* Badges de Modo */}
        <div className="aa-feature-badge flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-meta font-mono bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/20">
            <Sparkle weight="fill" className="w-3.5 h-3.5" />
            <span>{isAgent ? t('agentBadge1') : t('agencyBadge1')}</span>
          </span>
          <span className="text-meta text-[var(--color-text-muted)] font-mono">
            {isAgent ? t('agentBadge2') : t('agencyBadge2')}
          </span>
        </div>

        {/* Titular de Rol */}
        <h3 className="aa-feature-headline text-display-sm text-[var(--color-text-primary)]">
          {isAgent ? t('agentHeadline') : t('agencyHeadline')}
        </h3>
      </div>

      {/* 3 Cards Interactivas con Timer Visual Integrado (Arquetipo 3 Wave Stagger) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
        {features.map((f, idx) => {
          const isActive = idx === activeSlide;
          return (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              className={`aa-feature-card p-3.5 rounded-2xl text-left flex flex-col justify-between gap-3 transition-all duration-300 min-h-[165px] cursor-pointer relative overflow-hidden will-change-transform ${
                isActive
                  ? "bg-[var(--color-surface-BG-2)] border-2 border-[var(--color-brand-blue)] shadow-elevation-2"
                  : "bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] hover:border-[var(--color-border-Strokes-strong)] hover:bg-[var(--color-surface-BG-2)]"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <CheckCircle
                  weight="fill"
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-[var(--color-brand-blue)]"
                      : "text-[var(--color-text-muted)]"
                  }`}
                />
                <span
                  className={`text-meta font-mono px-2 py-0.5 rounded transition-colors ${
                    isActive
                      ? "bg-[var(--color-brand-blue)]/10 text-[var(--color-text-accent-blue)] border border-[var(--color-brand-blue)]/30"
                      : "bg-[var(--color-surface-BG-base)] text-[var(--color-text-muted)] border border-[var(--color-border-Strokes-default)]"
                  }`}
                >
                  {f.badge}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h4
                  className={`text-h6 font-semibold transition-colors ${
                    isActive
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-secondary)]"
                  }`}
                >
                  {f.title}
                </h4>
                <p className="text-caption text-[var(--color-text-secondary)]">
                  {f.description}
                </p>
              </div>

              {/* Barra de Progreso Minimalista Integrada al Fondo de la Card */}
              <div className="w-full h-[2px] rounded-full bg-[var(--color-border-Strokes-default)] overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-[var(--color-brand-blue)]"
                  style={{
                    width: isActive ? "100%" : "0%",
                    transition: isActive && !isPaused ? "width 4500ms linear" : "none",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
