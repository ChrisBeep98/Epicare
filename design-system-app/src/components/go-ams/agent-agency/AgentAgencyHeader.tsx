"use client";

import React from "react";
import { User, Buildings } from "@phosphor-icons/react";
import { AgentAgencyHeaderProps } from "./types";

export function AgentAgencyHeader({
  activeRole,
  onRoleChange,
  title,
  description = "Un botón permanente en la barra superior alterna entre tu cuenta de productor individual y tu vista de agencia. Dos espacios optimizados dentro de la misma plataforma.",
}: AgentAgencyHeaderProps) {
  const isAgent = activeRole === "agent";

  return (
    <div className="grid-layout items-end gap-y-fluid-md">
      {/* Título y Subtítulo Principal (Izquierda, Cols 1-7) */}
      <div className="col-span-6 md:col-span-8 lg:col-span-7 flex flex-col gap-3">
        <h2 className="role-reveal-elem text-display-lg text-[var(--color-text-primary)] leading-[1.08] tracking-tight">
          {title || (
            <>
              Si tienes agencia,
              <br />
              <span className="text-[var(--color-text-accent-blue)]">
                el portal cambia contigo.
              </span>
            </>
          )}
        </h2>

        <p className="role-reveal-elem text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-[620px]">
          {description}
        </p>
      </div>

      {/* Selector de Pestañas Interactivo (Derecha, Cols 8-12) */}
      <div className="role-reveal-elem col-span-6 md:col-span-8 lg:col-span-5 flex lg:justify-end">
        <div className="p-1.5 rounded-2xl bg-[var(--color-surface-BG-1)] border border-[var(--color-border-Strokes-default)] flex items-center gap-1.5 shadow-elevation-1 w-full sm:w-auto">
          {/* Botón Agente */}
          <button
            onClick={() => onRoleChange("agent")}
            aria-pressed={isAgent}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-ui-label transition-all duration-300 cursor-pointer ${
              isAgent
                ? "bg-[var(--color-brand-blue)] text-white shadow-elevation-2 font-semibold"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-BG-2)]"
            }`}
          >
            <User weight={isAgent ? "fill" : "bold"} className="w-4 h-4" />
            <span>Cuenta de Agente</span>
          </button>

          {/* Botón Agencia */}
          <button
            onClick={() => onRoleChange("agency")}
            aria-pressed={!isAgent}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-ui-label transition-all duration-300 cursor-pointer ${
              !isAgent
                ? "bg-[var(--color-brand-blue)] text-white shadow-elevation-2 font-semibold"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-BG-2)]"
            }`}
          >
            <Buildings weight={!isAgent ? "fill" : "bold"} className="w-4 h-4" />
            <span>Cuenta de Agencia</span>
          </button>
        </div>
      </div>
    </div>
  );
}
