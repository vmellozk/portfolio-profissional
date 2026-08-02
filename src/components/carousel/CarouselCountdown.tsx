interface CarouselCountdownProps {
  label: string;
  paused: boolean;
  seconds: number;
}

export function CarouselCountdown({ label, paused, seconds }: CarouselCountdownProps) {
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <div
      className={`carousel-countdown${paused ? " carousel-countdown--paused" : ""}`}
      role="timer"
      aria-live="off"
      aria-label={paused ? `${label} pausada` : `${label} em ${seconds} segundos`}
    >
      <span className="carousel-countdown-indicator" aria-hidden="true" />
      <span>{formattedSeconds}s</span>
    </div>
  );
}
