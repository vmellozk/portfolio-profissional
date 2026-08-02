export function BackgroundVideo() {
  return (
    <video
      className="site-background-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/videos/background.mp4" type="video/mp4" />
    </video>
  );
}
