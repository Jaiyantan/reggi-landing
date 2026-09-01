'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const useCases = [
  { title: 'Breakfast', image: '/images/dosa_with_reggi.png', positionClass: 'object-[85%_center]', desc: 'Start your day with a delicious twist.' },
  { title: 'Mid-morning Cravings', image: '/images/reggi_with_bread.png', positionClass: 'object-[85%_center]', desc: 'A tasty companion when hunger strikes.' },
  { title: 'Lunch', image: '/images/reggi_with_noodles.png', positionClass: 'object-[85%_center]', desc: 'Add a unique twist to your favourite meal.' },
  { title: 'Evening Snacks', image: '/images/samosa_with_reggi.png', positionClass: 'object-[85%_center]', desc: 'Make snack time even more enjoyable.' },
  { title: 'Dinner', image: '/images/reggi_with_roti.png', positionClass: 'object-[85%_center]', desc: 'A flavourful addition to end the day your way.' },
  { title: 'Cooking', image: '/images/reggi_cooking.png', positionClass: 'object-center', desc: 'Bring a unique twist to your favourite recipes.' },
  { title: 'Salads & Toppings', image: '/images/reggi_with_salad.png', positionClass: 'object-[85%_center]', desc: 'Add a delicious touch to salads, fruit bowls and more.' },
  { title: 'Fruit Drink', image: '/images/reggi_with_drink.png', positionClass: 'object-right', desc: 'Mix with water for a refreshing fruit drink.' },
];

const valueProps = [
  {
    imageSrc: '/images/cuisine_circle.png',
    title: 'Enjoy It with Any Cuisine',
    desc: 'From South Indian and North Indian to Continental, Chinese and Oriental dishes.'
  },
  {
    imageSrc: '/images/cooking_circle.png',
    title: 'Cook With It',
    desc: 'Try it in stir-fries, sautés and your favourite recipes.'
  },
  {
    imageSrc: '/images/salad_circle.png',
    title: 'Top Your Favourites',
    desc: 'Add a unique twist to salads, milkshakes and more.'
  },
  {
    imageSrc: '/images/drink_circle.png',
    title: 'Mix & Drink',
    desc: 'Dissolve it in cold or warm water for a refreshing drink.'
  }
];

export default function EnjoySection() {
  // Value Props Animation State
  const valuePropsRef = useRef<HTMLDivElement>(null);
  const [isValuePropsVisible, setIsValuePropsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;

    const timeout = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          // Increased threshold to 0.25 so it doesn't trigger when only the empty padding is visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            setIsValuePropsVisible(true);
          } else if (!entry.isIntersecting) {
            setIsValuePropsVisible(false);
          }
        },
        { threshold: [0, 0.3], rootMargin: '0px' }
      );

      if (valuePropsRef.current) {
        observer.observe(valuePropsRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section className="pt-[10px] pb-[50px] md:pt-[20px] md:pb-[90px] animate-reveal overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
        <div className="text-center mb-[48px] md:mb-[64px]">
          <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] font-bold text-textDark leading-[1.2]">
            Enjoy REGGI Your Way
          </h2>
          <p className="text-[16px] text-textMid mt-[12px]">
            From breakfast to dinner, every moment has a REGGI moment.
          </p>
        </div>
      </div>

      {/* Use Case Gallery - Full Bleed Auto-Marquee */}
      <div className="w-full relative mt-[20px] mb-[40px] md:mb-[60px]">
        <style>{`
          @keyframes autoMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .custom-marquee-track {
            animation: autoMarquee 32s linear infinite;
          }
          .custom-marquee-wrapper {
            overflow: hidden;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .custom-marquee-track {
              animation: none !important;
              transform: none !important;
            }
            .custom-marquee-wrapper {
              overflow-x: auto !important;
            }
          }
        `}</style>
        
        <div className="flex hide-scrollbar custom-marquee-wrapper py-[20px] px-[20px] md:px-0 -my-[20px]">
          <div className="flex w-max custom-marquee-track">
            {/* Set 1 */}
            <div className="flex gap-[20px] px-[10px]">
              {useCases.map((useCase, index) => (
                <div 
                  key={`set1-${index}`} 
                  className="min-w-[260px] w-[80vw] md:w-[340px] flex-shrink-0 bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:scale-[1.06] hover:z-10 transition-all duration-[250ms] ease-out flex flex-col cursor-default group relative"
                >
                  <div className="w-full aspect-[5/4] bg-[#F8F6F0] relative overflow-hidden">
                    <Image
                      src={useCase.image}
                      alt={useCase.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 340px"
                      className={`object-cover ${useCase.positionClass || 'object-center'}`}
                      priority={index < 3}
                    />
                  </div>
                  <div className="p-[14px] md:p-[16px] text-center flex-grow flex flex-col items-center justify-center">
                    <h3 className="font-dmSans font-medium text-[15px] md:text-[16px] text-textDark leading-[1.3]">{useCase.title}</h3>
                    <p className="text-[13px] text-textMid leading-[1.4] mt-[4px] md:mt-[6px] max-w-[220px]">
                      {useCase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Set 2 (Seamless Loop Duplicate) */}
            <div className="flex gap-[20px] px-[10px]">
              {useCases.map((useCase, index) => (
                <div 
                  key={`set2-${index}`} 
                  className="min-w-[260px] w-[80vw] md:w-[340px] flex-shrink-0 bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover hover:scale-[1.06] hover:z-10 transition-all duration-[250ms] ease-out flex flex-col cursor-default group relative"
                >
                  <div className="w-full aspect-[5/4] bg-[#F8F6F0] relative overflow-hidden">
                    <Image
                      src={useCase.image}
                      alt={useCase.title}
                      fill
                      sizes="(max-width: 768px) 80vw, 340px"
                      className={`object-cover ${useCase.positionClass || 'object-center'}`}
                      priority={false}
                    />
                  </div>
                  <div className="p-[14px] md:p-[16px] text-center flex-grow flex flex-col items-center justify-center">
                    <h3 className="font-dmSans font-medium text-[15px] md:text-[16px] text-textDark leading-[1.3]">{useCase.title}</h3>
                    <p className="text-[13px] text-textMid leading-[1.4] mt-[4px] md:mt-[6px] max-w-[220px]">
                      {useCase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Value Props Strip */}
      <div 
        ref={valuePropsRef} 
        className={`bg-greenDark mt-[60px] md:mt-[60px] pt-[70px] pb-[70px] md:pt-[90px] md:pb-[90px] value-props-section ${isValuePropsVisible ? 'is-visible' : ''}`}
      >
        <style>{`
          @keyframes valueRevealUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes valueRevealScale {
            0% { opacity: 0; transform: scale(0.92); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          .value-anim-up { opacity: 0; transform: translateY(20px); }
          .value-anim-scale { opacity: 0; transform: scale(0.92); }
          
          .value-props-section.is-visible .value-anim-up {
            animation: valueRevealUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .value-props-section.is-visible .value-anim-scale {
            animation: valueRevealScale 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .value-anim-up, .value-anim-scale {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          }
        `}</style>
        
        <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
          <div className="text-center mb-[48px] md:mb-[64px]">
            <div 
              className="value-anim-up inline-block text-[#D6A14D] tracking-[0.18em] text-[11px] font-bold uppercase mb-[12px]"
              style={{ animationDelay: '0ms' }}
            >
              MORE WAYS TO ENJOY REGGI
            </div>
            <div className="value-anim-up" style={{ animationDelay: '100ms' }}>
              <h2 className="font-cormorant text-[clamp(28px,3vw,36px)] font-bold text-white leading-[1.2]">
                More than a spread. Make it your own.
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] md:gap-[32px]">
            {valueProps.map((prop, index) => {
              const baseDelay = 200 + (index * 150);
              
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center group p-[10px] md:hover:-translate-y-2 transition-transform duration-300 ease-out"
                >
                  <div className="value-anim-scale" style={{ animationDelay: `${baseDelay}ms` }}>
                    <div className="w-[96px] h-[96px] rounded-full bg-[#365640] flex items-center justify-center mb-[20px] text-[#D6A14D] overflow-hidden shadow-sm md:group-hover:scale-105 transition-transform duration-300 ease-out">
                      <Image src={prop.imageSrc} alt={prop.title} width={96} height={96} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="value-anim-up" style={{ animationDelay: `${baseDelay + 100}ms` }}>
                    <h3 className="font-dmSans font-bold text-[16px] text-white leading-[1.3] mb-[12px]">
                      {prop.title}
                    </h3>
                  </div>
                  
                  <div className="value-anim-up" style={{ animationDelay: `${baseDelay + 180}ms` }}>
                    <p className="text-white/80 text-[14px] leading-[1.6] max-w-[200px] mx-auto">
                      {prop.desc}
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
