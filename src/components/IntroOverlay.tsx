import { useIntroAnimation } from "../hooks/useIntroAnimation";

type IntroOverlayProps = {
  onComplete: () => void;
};

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const { overlayRef, canvasRef } = useIntroAnimation(onComplete);

  return (
    <div id="intro-overlay" ref={overlayRef} aria-hidden="true">
      <canvas id="intro-canvas" ref={canvasRef} />
      <button id="intro-skip" type="button">
        Skip ↓
      </button>
    </div>
  );
}
