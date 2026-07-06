import { useCallback, useEffect, useRef, useState } from "react";

const MESSAGE = "> exploring unorthodox ideas...";

export function useTypewriter(startDelay = 400) {
  const [text, setText] = useState("");
  const startedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let i = 0;
    function type() {
      if (i < MESSAGE.length) {
        const char = MESSAGE[i]!;
        i += 1;
        setText((prev) => prev + char);
        timeoutRef.current = setTimeout(type, 45 + Math.random() * 30);
      }
    }

    timeoutRef.current = setTimeout(type, startDelay);
  }, [startDelay]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      start();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [start]);

  return { text, startTypewriter: start };
}
