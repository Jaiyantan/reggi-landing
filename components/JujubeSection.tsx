const benefits = [
  {
    title: 'Natural Stress Reliever',
    desc: 'Rich in saponins and flavonoids with proven calming, stress-relieving properties.',
  },
  {
    title: 'Supports Heart Health',
    desc: 'Bioactive compounds in jujube help support overall cardiovascular wellness.',
  },
  {
    title: 'Boosts Immunity',
    desc: 'Used in ancient traditional medicines for its potent antiviral properties.',
  },
  {
    title: 'Rich in Dietary Fibre',
    desc: 'High fibre content aids in regulating digestion and healthy bowel movements.',
  },
];

export default function JujubeSection() {
  return (
    <section className="bg-cream animate-reveal">
      <div className="max-w-[1100px] mx-auto py-[50px] px-[20px] md:py-[80px] md:px-[40px] grid grid-cols-1 md:grid-cols-2 gap-[36px] md:gap-[70px] items-center">
        <div>
          <img
            className="rounded-[24px] w-full object-cover shadow-jujube-img"
            src="https://www.reggi.in/wp-content/uploads/2025/02/92641364_Hand-drawn-Jujube-isolated-Vector-cartoon-white-background-1-copy.png"
            alt="Jujube Fruit"
          />
        </div>
        <div>
          <div className="inline-block text-[11px] tracking-[0.14em] uppercase text-amber font-bold mb-[12px]">
            The Superfruit
          </div>
          <h2 className="font-cormorant text-[clamp(28px,4vw,40px)] font-bold text-greenDark leading-[1.2] mb-[14px]">
            The Ancient Power
            <br />
            of <span className="text-redAccent">Jujube</span>
          </h2>
          <p className="text-textMid text-[14px] leading-[1.7] mb-[24px]">
            For centuries, Jujube fruit (Ziziphus jujuba) has been revered across Asia, the Middle East and the Mediterranean. It is known as the <em>&quot;Fruit of Immortality&quot;</em> and <em>&quot;Red Date&quot;</em> in ancient wellness traditions.
          </p>
          <div className="flex flex-col gap-[20px] mt-[28px]">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-[16px_20px] bg-white rounded-[16px] border border-creamDark shadow-sm transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-card-hover"
              >
                <div>
                  <div className="text-[14px] font-bold text-greenDark mb-[4px]">
                    {benefit.title}
                  </div>
                  <p className="text-[12px] text-textMid leading-[1.5]">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
