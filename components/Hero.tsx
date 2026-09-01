export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-auto md:aspect-[1920/982] bg-black overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/reggimain-page.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
