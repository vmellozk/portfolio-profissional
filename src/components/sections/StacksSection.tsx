import { useState } from "react";
import { technologies } from "../../data/technologies";

export function StacksSection() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleTooltip = (technologyKey: string) => {
    setActiveTooltip((currentTooltip) =>
      currentTooltip === technologyKey ? null : technologyKey
    );
  };

  return (
    <section id="services" className="w-full overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="page-contrast-text uppercase tracking-widest text-[#4da5d2] font-semibold mb-3 text-center lg:text-left">Stacks</h4>
        <h2 className="text-3xl font-extrabold mb-8 text-center lg:text-left">
          Tecnologias e Ferramentas
        </h2>
      </div>

      <div
        className={`tech-marquee-shell${
          activeTooltip ? " tech-marquee-shell--tooltip-open" : ""
        }`}
      >
        <div className="tech-marquee-viewport" role="group" aria-label="Tecnologias que utilizo">
          <div className="tech-marquee-track">
            {[0, 1].map((groupIndex) => (
              <div
                className="tech-marquee-group"
                key={groupIndex}
                aria-hidden={groupIndex === 1}
              >
                {technologies.map(({ title, image, imageScale = 1 }, technologyIndex) => {
                  const technologyKey = `${groupIndex}-${title}`;
                  const tooltipId = `technology-tooltip-${groupIndex}-${technologyIndex}`;
                  const tooltipIsOpen = activeTooltip === technologyKey;

                  return (
                    <span
                      className={`tech-logo-frame${
                        tooltipIsOpen ? " tech-logo-frame--tooltip-open" : ""
                      }`}
                      key={technologyKey}
                      role={groupIndex === 0 ? "button" : undefined}
                      tabIndex={groupIndex === 0 ? 0 : -1}
                      aria-label={groupIndex === 0 ? `Identificar tecnologia: ${title}` : undefined}
                      aria-pressed={groupIndex === 0 ? tooltipIsOpen : undefined}
                      aria-describedby={
                        groupIndex === 0 && tooltipIsOpen ? tooltipId : undefined
                      }
                      onClick={() => toggleTooltip(technologyKey)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleTooltip(technologyKey);
                        }
                      }}
                      onBlur={() =>
                        setActiveTooltip((currentTooltip) =>
                          currentTooltip === technologyKey ? null : currentTooltip
                        )
                      }
                    >
                      <img
                        src={image}
                        alt=""
                        className="tech-logo"
                        draggable={false}
                        style={{ transform: `scale(${Math.min(2, Math.max(0.1, imageScale))})` }}
                      />
                      <span
                        className="tech-logo-tooltip"
                        id={tooltipId}
                        role="tooltip"
                        aria-hidden={!tooltipIsOpen}
                      >
                        {title}
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
