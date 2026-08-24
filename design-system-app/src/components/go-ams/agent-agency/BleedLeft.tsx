"use client";

import React, { useRef, useState, useLayoutEffect } from "react";

export interface BleedLeftProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * @description Helper para sangrar un contenedor hacia el borde físico izquierdo del viewport (x = 0).
 * Calcula en useLayoutEffect la distancia desde el parent hasta el borde de pantalla y aplica
 * margen negativo y compensación de ancho exacto.
 */
export function BleedLeft({ children, className = "" }: BleedLeftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (ref.current && ref.current.parentElement) {
        const rect = ref.current.parentElement.getBoundingClientRect();
        setOffset(rect.left > 0 ? rect.left : 0);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        marginLeft: offset > 0 ? `-${offset}px` : "0px",
        width: offset > 0 ? `calc(100% + ${offset}px)` : "100%",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
