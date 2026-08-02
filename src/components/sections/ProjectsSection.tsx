import { useCallback, useEffect, useState, type TransitionEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselCountdown } from "../carousel/CarouselCountdown";
import { ProjectCard } from "../projects/ProjectCard";
import { PROJECT_CAROUSEL_INTERVAL_MS, PROJECT_IMAGE_INTERVAL_MS } from "../../config/carousel";
import { projects } from "../../data/projects";
import { useCarouselCountdown } from "../../hooks/useCarouselCountdown";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

function greatestCommonDivisor(firstNumber: number, secondNumber: number): number {
  return secondNumber === 0
    ? firstNumber
    : greatestCommonDivisor(secondNumber, firstNumber % secondNumber);
}

function getProjectsPerPage() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

export function ProjectsSection() {
  const [projectsPerPage, setProjectsPerPage] = useState(getProjectsPerPage);
  const [projectSlide, setProjectSlide] = useState(1);
  const [projectTransitionEnabled, setProjectTransitionEnabled] = useState(true);
  const [projectIsAnimating, setProjectIsAnimating] = useState(false);
  const [projectsPaused, setProjectsPaused] = useState(false);
  const [projectImageIndexes, setProjectImageIndexes] = useState<Record<string, number>>({});
  const prefersReducedMotion = usePrefersReducedMotion();

  const totalProjectPages = projects.length / greatestCommonDivisor(projects.length, projectsPerPage);
  const projectPages = Array.from({ length: totalProjectPages }, (_, pageIndex) =>
    Array.from({ length: projectsPerPage }, (_, cardIndex) =>
      projects[((pageIndex * projectsPerPage) % projects.length + cardIndex) % projects.length]
    )
  );
  const projectCarouselPages = [
    projectPages[projectPages.length - 1],
    ...projectPages,
    projectPages[0],
  ];
  const projectAutoplayEnabled =
    !projectsPaused && !projectIsAnimating && !prefersReducedMotion && projectPages.length > 1;
  const advanceProjectsAutomatically = useCallback(() => {
    setProjectTransitionEnabled(true);
    setProjectIsAnimating(true);
    setProjectSlide((currentSlide) => currentSlide + 1);
  }, []);
  const projectCountdownSeconds = useCarouselCountdown({
    durationMs: PROJECT_CAROUSEL_INTERVAL_MS,
    isRunning: projectAutoplayEnabled,
    resetKey: `${projectSlide}-${projectsPerPage}`,
    onComplete: advanceProjectsAutomatically,
  });

  useEffect(() => {
    const updateProjectsPerPage = () => setProjectsPerPage(getProjectsPerPage());

    updateProjectsPerPage();
    window.addEventListener("resize", updateProjectsPerPage);
    return () => window.removeEventListener("resize", updateProjectsPerPage);
  }, []);

  useEffect(() => {
    setProjectTransitionEnabled(false);
    setProjectSlide(1);
    setProjectIsAnimating(false);

    const frame = window.requestAnimationFrame(() => setProjectTransitionEnabled(true));
    return () => window.cancelAnimationFrame(frame);
  }, [projectsPerPage]);

  useEffect(() => {
    if (prefersReducedMotion || !projectsPaused || !projects.some(({ image }) => image.length > 1)) {
      return;
    }

    const timer = window.setInterval(() => {
      setProjectImageIndexes((currentIndexes) => {
        const nextIndexes = { ...currentIndexes };

        projects.forEach(({ id, image }) => {
          if (image.length > 1) {
            nextIndexes[id] = ((currentIndexes[id] ?? 0) + 1) % image.length;
          }
        });

        return nextIndexes;
      });
    }, PROJECT_IMAGE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, projectsPaused]);

  const moveProjects = (direction: -1 | 1) => {
    if (projectIsAnimating || projectPages.length <= 1) return;

    setProjectTransitionEnabled(true);
    setProjectIsAnimating(true);
    setProjectSlide((currentSlide) => currentSlide + direction);
  };

  const finishProjectTransition = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;

    if (projectSlide === 0 || projectSlide === projectPages.length + 1) {
      setProjectTransitionEnabled(false);
      setProjectSlide(projectSlide === 0 ? projectPages.length : 1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setProjectTransitionEnabled(true));
      });
    }

    setProjectIsAnimating(false);
  };

  return (
    <section id="projects" className="w-full overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="page-contrast-text uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">Meu trabalho</h4>
        <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">Projetos Recentes</h2>
      </div>

      <div
        className="projects-carousel-shell"
        onMouseEnter={() => setProjectsPaused(true)}
        onMouseLeave={() => setProjectsPaused(false)}
        onFocusCapture={() => setProjectsPaused(true)}
        onBlurCapture={(event) => {
          if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
            setProjectsPaused(false);
          }
        }}
      >
        <div className="projects-carousel-backdrop" aria-hidden="true" />
        {!prefersReducedMotion && projectPages.length > 1 && (
          <CarouselCountdown
            label="Próxima troca de projetos"
            paused={projectsPaused}
            seconds={projectCountdownSeconds}
          />
        )}
        <div
          className="projects-carousel-viewport"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Projetos recentes"
        >
          <div
            className="projects-carousel-track"
            style={{
              transform: `translateX(-${projectSlide * 100}%)`,
              transition: projectTransitionEnabled
                ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
            }}
            onTransitionEnd={finishProjectTransition}
          >
            {projectCarouselPages.map((pageProjects, slideIndex) => {
              const isActiveSlide = slideIndex === projectSlide;

              return (
                <div
                  className="projects-carousel-page"
                  key={slideIndex}
                  aria-hidden={!isActiveSlide}
                  style={{ gridTemplateColumns: `repeat(${projectsPerPage}, minmax(0, 20rem))` }}
                >
                  {pageProjects.map((project, cardIndex) => {
                    const activeImageIndex = (projectImageIndexes[project.id] ?? 0) % project.image.length;

                    return (
                      <ProjectCard
                        key={`${slideIndex}-${cardIndex}-${project.id}`}
                        project={project}
                        activeImageIndex={activeImageIndex}
                        isActiveSlide={isActiveSlide}
                        onImageSelect={(imageIndex) =>
                          setProjectImageIndexes((currentIndexes) => ({
                            ...currentIndexes,
                            [project.id]: imageIndex,
                          }))
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="projects-carousel-control projects-carousel-control-left"
          onClick={() => moveProjects(-1)}
          aria-label="Ver projetos anteriores"
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <button
          type="button"
          className="projects-carousel-control projects-carousel-control-right"
          onClick={() => moveProjects(1)}
          aria-label="Ver próximos projetos"
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
