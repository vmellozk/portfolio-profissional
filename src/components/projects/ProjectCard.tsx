import type { CSSProperties } from "react";
import type { Project } from "../../types/portfolio";

interface ProjectCardProps {
  project: Project;
  activeImageIndex: number;
  isActiveSlide: boolean;
  onImageSelect: (imageIndex: number) => void;
}

export function ProjectCard({
  project,
  activeImageIndex,
  isActiveSlide,
  onImageSelect,
}: ProjectCardProps) {
  const { id, title, description, image, repoLink, shine } = project;

  return (
    <article
      className="project-sticker-card"
      style={{
        "--card-accent-rgb": shine.primary,
        "--card-accent-secondary-rgb": shine.secondary,
        "--card-shine-angle": shine.angle,
      } as CSSProperties}
    >
      <div className="project-sticker-media">
        <img
          key={`${id}-${activeImageIndex}`}
          src={image[activeImageIndex]}
          alt={isActiveSlide ? `${title} — imagem ${activeImageIndex + 1} de ${image.length}` : ""}
          className="project-sticker-image"
          draggable={false}
        />

        {image.length > 1 && (
          <div className="project-image-dots" aria-label={`Imagens de ${title}`}>
            {image.map((_, imageIndex) => (
              <button
                type="button"
                key={imageIndex}
                className={`project-image-dot${imageIndex === activeImageIndex ? " project-image-dot-active" : ""}`}
                onClick={() => onImageSelect(imageIndex)}
                tabIndex={isActiveSlide ? undefined : -1}
                aria-label={`Mostrar imagem ${imageIndex + 1} de ${image.length}`}
                aria-current={imageIndex === activeImageIndex ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <h3 className="project-sticker-title">{title}</h3>
        <p className="project-sticker-description">{description}</p>

        <div className="mt-5 flex justify-center">
          {repoLink ? (
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActiveSlide ? undefined : -1}
              className="project-sticker-button"
              aria-label={`Visualizar ${title} no GitHub`}
            >
              Visualizar projeto
            </a>
          ) : (
            <button
              type="button"
              className="project-sticker-button"
              aria-label={`Repositório de ${title} ainda não configurado`}
            >
              Visualizar projeto
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
