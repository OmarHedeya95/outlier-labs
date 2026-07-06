import { RefObject, useEffect, useRef } from "react";

export function useHeroTilt(heroRef: RefObject<HTMLElement | null>) {
  const colRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = heroRef.current;
    const col = colRef.current;
    if (!section || !col) return;

    const els = { section, col };

    let tRX = 0;
    let tRY = 0;
    let cRX = 0;
    let cRY = 0;
    let tiltRaf: number | null = null;

    function tiltTick() {
      cRX += (tRX - cRX) * 0.1;
      cRY += (tRY - cRY) * 0.1;
      els.col.style.transform = `perspective(1000px) rotateY(${cRY.toFixed(2)}deg) rotateX(${cRX.toFixed(2)}deg)`;
      tiltRaf =
        Math.abs(tRX - cRX) > 0.05 || Math.abs(tRY - cRY) > 0.05
          ? requestAnimationFrame(tiltTick)
          : null;
    }

    function onMouseMove(e: MouseEvent) {
      const r = els.section.getBoundingClientRect();
      tRY = ((e.clientX - r.left) / r.width - 0.5) * 7;
      tRX = -((e.clientY - r.top) / r.height - 0.5) * 4;
      if (tiltRaf === null) tiltRaf = requestAnimationFrame(tiltTick);
    }

    function onMouseLeave() {
      tRX = 0;
      tRY = 0;
      if (tiltRaf === null) tiltRaf = requestAnimationFrame(tiltTick);
    }

    els.section.addEventListener("mousemove", onMouseMove);
    els.section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      els.section.removeEventListener("mousemove", onMouseMove);
      els.section.removeEventListener("mouseleave", onMouseLeave);
      if (tiltRaf !== null) cancelAnimationFrame(tiltRaf);
    };
  }, [heroRef]);

  return colRef;
}
