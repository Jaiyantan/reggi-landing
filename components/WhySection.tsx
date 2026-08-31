import Image from 'next/image';

const whyItems = [
  {
    image: '/images/why-reggi/pure-jujube.png',
    title: 'Native Elanthai Fruit, Naturally Sourced',
    desc: 'The heart of every REGGI spread, hand-picked and naturally ripened for real flavor.',
  },
  {
    image: '/images/why-reggi/ready-to-eat.png',
    title: 'A Spread for Every Meal',
    desc: 'From breakfast toast to dinner sides, REGGI pairs effortlessly with almost anything on your plate.',
  },
  {
    image: '/images/why-reggi/spice-extracts.png',
    title: 'Rooted in Natural Spices',
    desc: 'Time-tested spices come together with jujube fruit to create bold, distinctive flavors. Nothing artificial, nothing rushed.',
  },
  {
    image: '/images/why-reggi/responsibly-made.png',
    title: 'Crafted, Not Manufactured',
    desc: 'Made in small batches with care, staying true to its roots as a real food, not a mass-produced condiment.',
  },
  {
    image: '/images/why-reggi/no-additives.png',
    title: 'One Fruit, A Family of Flavours',
    desc: 'Cumin ginger chilli, cardamom, and more: each variant is its own take on the same versatile base.',
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
            A <span className="text-amberLight">Spread for Every Meal.</span>
          </h2>
          <p className="text-[14px] text-white/55 mt-[12px] leading-[1.6]">
            REGGI is a versatile fruit spread crafted from native Elanthai fruit and natural
            spices, made to be enjoyed with almost any food, from breakfast to dinner.
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
