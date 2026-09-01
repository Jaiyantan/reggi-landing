'use client';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  {
    num: '01',
    title: 'Naturally Nutrient-Rich',
    desc: 'Elanthai is naturally valued for its nutritional profile and dietary fibre.',
  },
  {
    num: '02',
    title: 'Rooted in Tradition',
    desc: 'A familiar fruit across generations, deeply connected to traditional Indian food culture.',
  },
  {
    num: '03',
    title: 'Sweet, Tangy & Versatile',
    desc: 'Its distinctive flavour makes Elanthai a delicious addition to everything from snacks to everyday meals.',
  },
];

export default function JujubeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setIsVisible(true);
          } else if (!entry.isIntersecting) {
            setIsVisible(false);
          }
        },
        { threshold: [0, 0.1], rootMargin: '0px' }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={`bg-cream py-[64px] md:py-[80px] px-[20px] md:px-[40px] overflow-hidden jujube-section ${isVisible ? 'is-visible' : ''}`}>
      <style>{`
        @keyframes jujubeRevealUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .jujube-anim-up { opacity: 0; transform: translateY(24px); }
        
        .jujube-section.is-visible .jujube-anim-up {
          animation: jujubeRevealUp 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .jujube-anim-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto flex flex-col md:grid md:grid-cols-2 gap-[24px] md:gap-[70px] md:items-start">
        
        {/* Image Column (Mobile: order-2, Desktop: col-1) */}
        <div className="order-2 md:order-none md:col-start-1 h-full">
          <img
            className="jujube-anim-up md:sticky md:top-[100px] rounded-[20px] md:rounded-[24px] w-full object-cover shadow-jujube-img aspect-[4/5] md:aspect-auto md:h-auto"
            style={{ animationDelay: '200ms' }}
            src="/images/reggi_cover_pic.png"
            alt="Jujube Fruit"
          />
        </div>
        
        {/* Content Column (Mobile: contents unwrapped for flex order, Desktop: flex col vertically centered) */}
        <div className="contents md:flex md:flex-col md:justify-center md:col-start-2 md:min-h-full">
          
          {/* Header (Mobile: order-1) */}
          <div className="order-1 md:order-none flex flex-col items-center md:items-start text-center md:text-left mb-[4px] md:mb-[16px]">
            <div className="jujube-anim-up inline-block text-[11px] tracking-[0.14em] uppercase text-amber font-bold mb-[12px]" style={{ animationDelay: '0ms' }}>
              MEET THE FRUIT
            </div>
            <h2 className="jujube-anim-up font-cormorant text-[clamp(32px,8vw,44px)] font-bold text-textDark leading-[1.1]" style={{ animationDelay: '100ms' }}>
              Meet the Fruit
              <br />
              Behind <span className="text-redAccent">REGGI</span>
            </h2>
          </div>
          
          {/* Intro (Mobile: order-3) */}
          <p className="order-3 md:order-none jujube-anim-up text-textMid text-[15px] leading-[1.8] mb-[8px] md:mb-[24px] max-w-[480px] text-center md:text-left mx-auto md:mx-0" style={{ animationDelay: '300ms' }}>
            Elanthai is a traditional native Indian fruit, loved for generations for its distinctive sweet-tangy taste and natural character. REGGI brings this remarkable fruit into everyday food in a delicious way.
          </p>
          
          {/* Cards (Mobile: order-4) */}
          <div className="order-4 md:order-none flex flex-col gap-[12px] md:gap-[16px]">
            {benefits.map((benefit, index) => {
              const animDelay = 400 + (index * 150);
              return (
                <div
                  key={index}
                  className="jujube-anim-up p-[20px_24px] bg-[#FAFAFA] rounded-[16px] md:rounded-[20px] border border-black/5 shadow-sm transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-card-hover flex items-start gap-[20px]"
                  style={{ animationDelay: `${animDelay}ms` }}
                >
                  <div className="font-cormorant text-[28px] md:text-[32px] text-redAccent opacity-90 leading-none font-medium mt-[-2px]">
                    {benefit.num}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-greenDark mb-[6px] tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-[14px] text-textDark/70 leading-[1.6]">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
