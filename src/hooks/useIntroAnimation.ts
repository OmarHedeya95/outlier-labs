import { useEffect, useRef } from "react";

function easOutC(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easInC(t: number) {
  return t * t * t;
}

const PHASES = [
  { s: 0, e: 1000 },
  { s: 1000, e: 2000 },
  { s: 2000, e: 2800 },
];

function getPhase(el: number) {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    const phase = PHASES[i]!;
    if (el >= phase.s) {
      return {
        id: i,
        t: Math.min((el - phase.s) / (phase.e - phase.s), 1),
      };
    }
  }
  return { id: 0, t: 0 };
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  fade: number,
  elapsed: number,
) {
  if (fade <= 0) return;
  const cx = W / 2;
  const cy = H / 2;
  const r = Math.min(W, H) * 0.15;
  const pulse = 1 + 0.06 * Math.sin(elapsed * 0.0008);

  const g1 = ctx.createRadialGradient(cx, cy, r, cx, cy, r * 6 * pulse);
  g1.addColorStop(0, `rgba(255,248,220,${0.08 * fade})`);
  g1.addColorStop(0.2, `rgba(240,235,200,${0.04 * fade})`);
  g1.addColorStop(0.6, `rgba(200,190,160,${0.015 * fade})`);
  g1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, W, H);

  const g2 = ctx.createRadialGradient(cx, cy, r * 0.82, cx, cy, r * 2.2 * pulse);
  g2.addColorStop(0, `rgba(255,252,235,${0.32 * fade})`);
  g2.addColorStop(0.18, `rgba(255,248,220,${0.18 * fade})`);
  g2.addColorStop(0.45, `rgba(232,220,180,${0.06 * fade})`);
  g2.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, W, H);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = "#060608";
  ctx.fill();
}

export function useIntroAnimation(onComplete: () => void) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hiddenRef.current = true;
      if (overlayRef.current) overlayRef.current.style.display = "none";
      onComplete();
      return;
    }

    const canvasEl = canvasRef.current;
    const overlayEl = overlayRef.current;
    if (!canvasEl || !overlayEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    const els = { canvasEl, overlayEl, context };

    let running = true;
    let iStart = 0;
    let iRaf: number | null = null;

    function resize() {
      els.canvasEl.width = window.innerWidth;
      els.canvasEl.height = window.innerHeight;
    }

    function finish() {
      if (!running) return;
      running = false;
      if (iRaf !== null) cancelAnimationFrame(iRaf);

      els.overlayEl.classList.add("fade-out");
      const onTransitionEnd = () => {
        els.overlayEl.removeEventListener("transitionend", onTransitionEnd);
        els.overlayEl.style.display = "none";
        els.canvasEl.width = 1;
        els.canvasEl.height = 1;
        onComplete();
      };
      els.overlayEl.addEventListener("transitionend", onTransitionEnd);
    }

    function frame(now: number) {
      if (!running) return;
      const el = now - iStart;
      if (el >= PHASES[PHASES.length - 1]!.e + 200) {
        finish();
        return;
      }

      const ph = getPhase(el);
      const W = els.canvasEl.width;
      const H = els.canvasEl.height;

      els.context.fillStyle = "#060608";
      els.context.fillRect(0, 0, W, H);

      switch (ph.id) {
        case 0:
          drawScene(els.context, W, H, easOutC(ph.t), el);
          break;
        case 1:
          drawScene(els.context, W, H, 1.0, el);
          break;
        case 2:
          drawScene(els.context, W, H, 1 - easInC(ph.t), el);
          break;
      }

      iRaf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    iStart = performance.now();
    iRaf = requestAnimationFrame(frame);

    const skipBtn = els.overlayEl.querySelector("#intro-skip");
    skipBtn?.addEventListener("click", finish);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      skipBtn?.removeEventListener("click", finish);
      if (iRaf !== null) cancelAnimationFrame(iRaf);
    };
  }, [onComplete]);

  return { overlayRef, canvasRef, hidden: hiddenRef.current };
}
