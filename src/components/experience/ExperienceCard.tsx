import type { Experience } from "../../types/portfolio";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <article className="experience-glass-panel experience-carousel-card rounded-2xl p-6 shadow-lg flex flex-col gap-4">
      <div className="experience-card-header flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
        <span className="experience-role-badge bg-[#1387f1] text-xs px-3 py-1 rounded-full font-bold mr-0 sm:mr-2 whitespace-nowrap">
          {experience.role}
        </span>
        <span className="experience-company text-[#4da5d2] whitespace-nowrap">{experience.company}</span>
        <span className="experience-period ml-0 sm:ml-auto text-[#dbd6d3] text-xs whitespace-nowrap">
          {experience.period}
        </span>
      </div>

      <div className="experience-details-grid">
        <div className="experience-detail-block experience-detail-primary">
          <ul
            className={`experience-detail-list list-disc pl-5 text-[#dbd6d3] text-sm${
              experience.highlightColumns === 2 ? " experience-detail-list--two-columns" : ""
            }`}
          >
            {experience.highlights.map((highlight, highlightIndex) => (
              <li key={highlightIndex}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
