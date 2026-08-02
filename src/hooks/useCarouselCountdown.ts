import { useEffect, useState } from "react";

interface UseCarouselCountdownOptions {
  durationMs: number;
  isRunning: boolean;
  resetKey: number | string;
  onComplete: () => void;
}

export function useCarouselCountdown({
  durationMs,
  isRunning,
  resetKey,
  onComplete,
}: UseCarouselCountdownOptions) {
  const totalSeconds = Math.ceil(durationMs / 1000);
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds);

  useEffect(() => {
    setRemainingSeconds(totalSeconds);

    if (!isRunning) return;

    const deadline = Date.now() + durationMs;
    const updateRemainingSeconds = () => {
      const nextSeconds = Math.max(1, Math.ceil((deadline - Date.now()) / 1000));
      setRemainingSeconds(nextSeconds);
    };

    const countdown = window.setInterval(updateRemainingSeconds, 250);
    const completion = window.setTimeout(onComplete, durationMs);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(completion);
    };
  }, [durationMs, isRunning, onComplete, resetKey, totalSeconds]);

  return remainingSeconds;
}
