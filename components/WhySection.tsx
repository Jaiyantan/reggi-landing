import Image from 'next/image';

const whyItems = [
  {
    image: '/images/why-reggi/pure-jujube.png',
    title: 'Pure And High-Quality Jujube',
    desc: 'We source our jujube fruits from the finest farms, ensuring they are naturally ripened.',
  },
  {
    image: '/images/why-reggi/ready-to-eat.png',
    title: 'Ready to Eat Anytime!',
    desc: 'We understand that modern lifestyles demand on-the-go nutrition.',
  },
  {
    image: '/images/why-reggi/spice-extracts.png',
    title: 'Powerful Spice Extracts',
    desc: 'We have carefully infused our extracts with functional spices such as Turmeric, Ginger, etc.',
  },
  {
    image: '/images/why-reggi/responsibly-made.png',
    title: 'Sourced & Responsibly Made',
    desc: 'We are committed to eco-friendly practices, ensuring sustainable sourcing, ethical production.',
  },
  {
    image: '/images/why-reggi/no-additives.png',
    title: 'Free from Artificial Additives',
    desc: 'No artificial flavors, and no refined sugars — just pure, wholesome goodness.',
  },
];

export default function WhySection() {
  const topRow = whyItems.slice(0, 3);
  const bottomRow = whyItems.slice(3);

  return (
    <section className="bg-greenDark py-[50px] px-[20px] md:py-[90px] md:px-[40px] text-white animate-reveal">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-[48px]">
          <div className="inline-block text-amberLight tracking-[0.18em] text-[11px] font-bold uppercase mb-[12px]">
            WHY REGGI
          </div>
          <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] font-semibold text-white tracking-[-0.01em] leading-[1.2]">
            Not Just a Sauce.<br />
            A <span className="text-amberLight">Health Revolution.</span>
          </h2>
          <p className="text-[14px] text-white/55 mt-[12px] leading-[1.6]">
            Every bottle is a story of tradition, craftsmanship, and real ingredients.
          </p>
        </div>

        {/* Top row — 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[32px] md:gap-[48px] mt-[52px]">
          {topRow.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-[90px] h-[90px] relative mb-[20px] transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-cormorant text-[19px] font-semibold text-amberLight mb-[8px] leading-[1.3]">
                {item.title}
              </h3>
              <p className="text-[13px] text-white/60 leading-[1.7] max-w-[220px]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom row — 2 items centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px] md:gap-[48px] mt-[40px] max-w-[640px] mx-auto">
          {bottomRow.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-[90px] h-[90px] relative mb-[20px] transition-transform duration-300 ease-out group-hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="font-cormorant text-[19px] font-semibold text-amberLight mb-[8px] leading-[1.3]">
                {item.title}
              </h3>
              <p className="text-[13px] text-white/60 leading-[1.7] max-w-[220px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
