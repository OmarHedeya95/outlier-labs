import { useCallback, useRef, useState } from "react";
import { CursorGlow } from "./components/CursorGlow";
import { Events } from "./components/Events";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { IntroOverlay } from "./components/IntroOverlay";
import { Manifesto } from "./components/Manifesto";
import { Nav } from "./components/Nav";
import { PastEvents } from "./components/PastEvents";
import { SubscribeModal } from "./components/SubscribeModal";
import { SubscribeSection } from "./components/SubscribeSection";
import { useCursorGlow } from "./hooks/useCursorGlow";
import { useHeroTilt } from "./hooks/useHeroTilt";
import { useTypewriter } from "./hooks/useTypewriter";

export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroColRef = useHeroTilt(heroSectionRef);
  const { text: terminalText, startTypewriter } = useTypewriter();

  useCursorGlow();

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const onIntroComplete = useCallback(() => startTypewriter(), [startTypewriter]);

  return (
    <>
      <IntroOverlay onComplete={onIntroComplete} />
      <CursorGlow />
      <Nav onSubscribe={openModal} />
      <main>
        <Hero
          sectionRef={heroSectionRef}
          colRef={heroColRef}
          terminalText={terminalText}
        />
        <Manifesto />
        <Events />
        <PastEvents />
        <SubscribeSection onSubscribe={openModal} />
      </main>
      <Footer />
      <SubscribeModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
