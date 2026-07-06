import { RefObject } from "react";

type HeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
  colRef: RefObject<HTMLDivElement | null>;
  terminalText: string;
};

export function Hero({ sectionRef, colRef, terminalText }: HeroProps) {
  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="col" ref={colRef}>
        <p className="hero-terminal">
          <span id="terminal-text">{terminalText}</span>
          <span className="cursor">▌</span>
        </p>
        <h1 className="hero-heading">
          The non-obvious
          <br />
          <span className="hi">bet.</span>
        </h1>
        <p className="hero-sub">
          A builder salon for top technical talent exploring non-obvious
          directions in AI and the physical world. We surface the most promising
          contrarian ideas and bring them to the people who can build on them.
        </p>
        <p className="hero-edition">Edition 01 · 2026</p>
      </div>
    </section>
  );
}
