'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const whyItems = [
  {
    imageSrc: '/images/native_elanthai.png',
    colorClass: 'bg-greenLight text-white',
    title: 'Native Elanthai (Indian Jujube)',
    desc: <>A traditional Indian fruit naturally containing <strong>important nutrients</strong>.</>,
  },
  {
    imageSrc: '/images/natural_spices.png',
    colorClass: 'bg-amber text-white',
    title: 'Blended with Natural Spices',
    desc: <><strong>Five unique flavour combinations</strong> for every kind of taste.</>,
  },
  {
    imageSrc: '/images/reggi_cuisine.png',
    colorClass: 'bg-[#C16238] text-white', // Terracotta/orange custom inline since it's not in tailwind
    title: 'One Spread, Many Uses',
    desc: <><strong>Spread, dip, top, cook, mix or drink</strong> REGGI.</>,
  },
  {
    imageSrc: '/images/reggi_all.png',
    colorClass: 'bg-brownWarm text-white',
    title: 'For Every Generation',
    desc: <>From <strong>kids to senior citizens</strong>, enjoy REGGI your way.</>,
  },
];

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            // Trigger animation when at least 30% is visible (using 0.25 as a safe float margin)
            setIsVisible(true);
          } else if (!entry.isIntersecting) {
            // Only reset the animation when the section is COMPLETELY off-screen (0%)
            setIsVisible(false);
          }
        },
        { 
          threshold: [0, 0.3], 
          rootMargin: '0px' 
        }
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
    <section ref={sectionRef} className={`bg-cream py-[50px] px-[20px] md:py-[90px] md:px-[40px] overflow-hidden why-section ${isVisible ? 'is-visible' : ''}`}>
      <style>{`
        @keyframes whyRevealUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes whyRevealScale {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        /* Initial hidden states */
        .why-anim-up { opacity: 0; transform: translateY(20px); }
        .why-anim-scale { opacity: 0; transform: scale(0.92); }
        
        /* Triggered animation states */
        .why-section.is-visible .why-anim-up {
          animation: whyRevealUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .why-section.is-visible .why-anim-scale {
          animation: whyRevealScale 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Respect user reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .why-anim-up, .why-anim-scale {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-[48px] md:mb-[64px]">
          <div 
            className="why-anim-up inline-block text-amber tracking-[0.18em] text-[11px] font-bold uppercase mb-[12px]"
            style={{ animationDelay: '0ms' }}
          >
            WHY REGGI
          </div>
          <div className="why-anim-up" style={{ animationDelay: '100ms' }}>
            <h2 className="font-cormorant text-[clamp(32px,4vw,40px)] font-extrabold text-textDark tracking-[-0.01em] leading-[1.2]">
              Why REGGI is Special
            </h2>
          </div>
          <div className="why-anim-up" style={{ animationDelay: '250ms' }}>
            <p className="text-[16px] text-greenDark font-medium italic mt-[12px] leading-[1.6]">
              A native fruit. Selected spices. Endless possibilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[32px] md:gap-[40px]">
          {whyItems.map((item, index) => {
            const baseDelay = 200 + (index * 150);
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center group p-[10px] md:hover:-translate-y-2 transition-transform duration-300 ease-out"
              >
                <div className="why-anim-scale" style={{ animationDelay: `${baseDelay}ms` }}>
                  <div className={`w-[120px] h-[120px] rounded-full flex items-center justify-center mb-[20px] overflow-hidden shadow-sm md:group-hover:scale-105 transition-transform duration-300 ease-out ${item.colorClass}`}>
                    <Image src={item.imageSrc} alt={item.title} width={120} height={120} className="w-full h-full object-cover" />
                  </div>
                </div>
                
                <div className="why-anim-up" style={{ animationDelay: `${baseDelay + 100}ms` }}>
                  <h3 className="font-cormorant text-[20px] md:text-[22px] font-extrabold text-textDark mb-[12px] leading-[1.2]">
                    {item.title}
                  </h3>
                </div>
                
                <div className="why-anim-up" style={{ animationDelay: `${baseDelay + 180}ms` }}>
                  <p className="text-[16px] text-textDark/80 leading-[1.6] max-w-[260px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
