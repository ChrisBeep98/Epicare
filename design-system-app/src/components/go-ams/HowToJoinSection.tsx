"use client";

import React from "react";

const steps = [
  { id: "01", title: "APLICAS", desc: "Contracting te contacta en 24-48 horas hábiles." },
  { id: "02", title: "FIRMAS", desc: "Digitalmente, desde el mismo portal tu acuerdo de productor." },
  { id: "03", title: "CUENTA", desc: "Recibes la invitación, creas tu contraseña y entras automáticamente." },
  { id: "04", title: "PRODUCES", desc: "Con tus appointments, tus licencias y tu book ya cargados." }
];

export default function HowToJoinSection() {
  return (
    <section className="w-full bg-[var(--color-surface-BG-1)] relative pt-0 pb-section-md">
      
      {/* CABECERA */}
      <div className="w-full max-w-section-lg mx-auto px-gutter-md pt-24 pb-8 md:text-left relative z-20">
        <h2 className="text-overline uppercase tracking-widest text-[var(--color-brand-blue)] mb-4 inline-block border-b border-[var(--color-brand-blue)]/30 pb-4">
          Activación Inmediata
        </h2>
        <h3 className="text-display-lg text-[var(--color-text-primary)] leading-[1.1] tracking-tight mb-space-static-sm">
          Cómo lo obtienes.
        </h3>
      </div>

      {/* DATA TABLE (Estilo Suizo) */}
      <div className="w-full max-w-section-lg mx-auto px-4 md:px-8 relative z-10">
        <div className="border border-[var(--color-border-Strokes-strong)] grid grid-cols-1 md:grid-cols-4 bg-[var(--color-surface-BG-base)] shadow-elevation-2 rounded-lg overflow-hidden">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative border-b md:border-b-0 md:border-r border-[var(--color-border-Strokes-strong)] last:border-0 p-8 flex flex-col hover:bg-[var(--color-surface-BG-2)] transition-colors duration-300"
            >
              {/* Animación de barra superior al hacer hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-brand-blue)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              
              <span className="text-meta font-mono text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-blue)] transition-colors mb-12">
                {step.id}
              </span>
              <h3 className="text-h4 font-display uppercase tracking-tight text-[var(--color-text-primary)] mb-4">
                {step.title}
              </h3>
              <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
