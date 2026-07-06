import { useEffect } from "react";

export function useCursorGlow() {
  useEffect(() => {
    let rafId: number | null = null;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    function update() {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;

      const xPct = `${((cx / window.innerWidth) * 100).toFixed(2)}%`;
      const yPct = `${((cy / window.innerHeight) * 100).toFixed(2)}%`;

      document.documentElement.style.setProperty("--mx", xPct);
      document.documentElement.style.setProperty("--my", yPct);

      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    }

    function onMouseMove(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
}
