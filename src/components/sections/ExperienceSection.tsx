import { useCallback, useState, type TransitionEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselCountdown } from "../carousel/CarouselCountdown";
import { ExperienceCard } from "../experience/ExperienceCard";
import { EXPERIENCE_CAROUSEL_INTERVAL_MS } from "../../config/carousel";
import { experiences } from "../../data/experiences";
import { useCarouselCountdown } from "../../hooks/useCarouselCountdown";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function ExperienceSection() {
  const [experienceSlide, setExperienceSlide] = useState(1);
  const [experienceTransitionEnabled, setExperienceTransitionEnabled] = useState(true);
  const [experienceIsAnimating, setExperienceIsAnimating] = useState(false);
  const [experiencesPaused, setExperiencesPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const experienceCarouselItems = [
    experiences[experiences.length - 1],
    ...experiences,
    experiences[0],
  ];
  const experienceAutoplayEnabled =
    !experiencesPaused && !experienceIsAnimating && !prefersReducedMotion && experiences.length > 1;
  const advanceExperiencesAutomatically = useCallback(() => {
    setExperienceTransitionEnabled(true);
    setExperienceIsAnimating(true);
    setExperienceSlide((currentSlide) => currentSlide + 1);
  }, []);
  const experienceCountdownSeconds = useCarouselCountdown({
    durationMs: EXPERIENCE_CAROUSEL_INTERVAL_MS,
    isRunning: experienceAutoplayEnabled,
    resetKey: experienceSlide,
    onComplete: advanceExperiencesAutomatically,
  });

  const moveExperiences = (direction: -1 | 1) => {
    if (experienceIsAnimating) return;

    setExperienceTransitionEnabled(true);
    setExperienceIsAnimating(true);
    setExperienceSlide((currentSlide) => currentSlide + direction);
  };

  const finishExperienceTransition = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (experienceSlide === 0 || experienceSlide === experiences.length + 1) {
      setExperienceTransitionEnabled(false);
      setExperienceSlide(experienceSlide === 0 ? experiences.length : 1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setExperienceTransitionEnabled(true));
      });
    }

    setExperienceIsAnimating(false);
  };

  return (
    <section id="experience" className="w-full overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="page-contrast-text uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">
          Experiências
        </h4>
        <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">O que já fiz</h2>
      </div>

      <div
        className="experience-carousel-shell"
        onMouseEnter={() => setExperiencesPaused(true)}
        onMouseLeave={() => setExperiencesPaused(false)}
        onFocusCapture={() => setExperiencesPaused(true)}
        onBlurCapture={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
            setExperiencesPaused(false);
          }
        }}
      >
        <div className="experience-carousel-backdrop" aria-hidden="true" />
        {!prefersReducedMotion && experiences.length > 1 && (
          <CarouselCountdown
            label="Próxima troca de experiência"
            paused={experiencesPaused}
            seconds={experienceCountdownSeconds}
          />
        )}

        <div
          className="experience-carousel-viewport"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Experiências profissionais"
        >
          <div
            className="experience-carousel-track"
            style={{
              transform: `translateX(-${experienceSlide * 100}%)`,
              transition: experienceTransitionEnabled
                ? "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={finishExperienceTransition}
          >
            {experienceCarouselItems.map((experience, slideIndex) => {
              const isActiveSlide = slideIndex === experienceSlide;

              return (
                <div
                  className="experience-carousel-page"
                  key={`${experience.id}-${slideIndex}`}
                  aria-hidden={!isActiveSlide}
                >
                  <ExperienceCard experience={experience} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="experience-carousel-control experience-carousel-control-left"
          onClick={() => moveExperiences(-1)}
          aria-label="Ver experiência anterior"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="experience-carousel-control experience-carousel-control-right"
          onClick={() => moveExperiences(1)}
          aria-label="Ver próxima experiência"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
