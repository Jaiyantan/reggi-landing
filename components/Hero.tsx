export default function Hero() {
  return (
    <section className="relative w-full aspect-[16/9] sm:aspect-[1920/982] h-auto bg-black overflow-hidden">
      <video
        className="w-full h-full object-cover object-center"
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
