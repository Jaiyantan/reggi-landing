'use client';
import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Truck, SealCheck } from '@phosphor-icons/react';

export default function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-[80px] md:py-[100px] lg:py-[120px] overflow-hidden cta-section ${isVisible ? 'is-visible' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #F7F2E8 0%, #F3EFE5 55%, #EDF0E5 100%)'
      }}
    >
      <style>{`
        @keyframes ctaFadeUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ctaFadeIn {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0) }
        }
        
        .cta-anim-image { opacity: 0; }
        .cta-anim-text { opacity: 0; }
        
        .cta-section.is-visible .cta-anim-image {
          animation: ctaFadeUp 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .cta-section.is-visible .cta-anim-text {
          animation: ctaFadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .cta-anim-image, .cta-anim-text {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px] relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-y-[32px] md:gap-x-[48px] lg:gap-x-[80px] items-center">
          
          {/* Content Column (5 columns on desktop, full width on mobile) */}
          <div className="w-full md:col-span-5 z-10 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="cta-anim-text font-cormorant text-[clamp(40px,5vw,56px)] font-bold text-textDark leading-[1.2] md:mb-[20px] tracking-tight" style={{ animationDelay: '0ms' }}>
              Find Your Favourite REGGI
            </h2>
            
            <p className="cta-anim-text text-[16px] md:text-[18px] text-textMid leading-[1.6] md:mb-[40px] max-w-[480px] mx-auto md:mx-0" style={{ animationDelay: '100ms' }}>
              From bold and fiery to warm and aromatic — find your flavour.
            </p>
            
            {/* MOBILE IMAGE (Hidden on Desktop) - Interleaved between copy and buttons */}
            <div className="cta-anim-image w-full relative flex justify-center md:hidden mt-[24px] mb-[32px]" style={{ animationDelay: '150ms' }}>
              <div className="w-full relative rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(55,43,25,0.12)] border border-white/50">
                <img 
                  src="/images/reggi_CTA.png" 
                  alt="REGGI Lifestyle" 
                  className="w-full h-[320px] sm:h-[400px] object-cover object-right block"
                />
              </div>
            </div>

            <div className="cta-anim-text w-full flex flex-col sm:flex-row items-center justify-center md:justify-start gap-[16px] md:mb-[48px]" style={{ animationDelay: '250ms' }}>
              <button 
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-greenDark hover:bg-greenDark/90 text-white font-dmSans font-bold text-[16px] py-[16px] px-[40px] rounded-pill transition-all duration-300 hover:-translate-y-[2px] shadow-sm"
              >
                Shop REGGI &rarr;
              </button>
              <button 
                onClick={scrollToProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-greenDark/20 hover:border-greenDark text-greenDark font-dmSans font-bold text-[16px] py-[16px] px-[40px] rounded-pill transition-all duration-300 hover:-translate-y-[2px]"
              >
                View Combos
              </button>
            </div>

            {/* Trust Markers - Single Row */}
            <div className="cta-anim-text w-full max-w-full flex flex-row items-center justify-center md:justify-start gap-[8px] lg:gap-[16px] pt-[24px] mt-[24px] md:mt-0 border-t border-black/5 whitespace-nowrap overflow-x-auto md:overflow-visible no-scrollbar" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-[4px] text-textMid opacity-90">
                <ShieldCheck size={16} weight="duotone" className="text-greenDark shrink-0" />
                <span className="font-dmSans text-[10px] sm:text-[11px] lg:text-[12px] tracking-wide font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center gap-[4px] text-textMid opacity-90">
                <Truck size={16} weight="duotone" className="text-greenDark shrink-0" />
                <span className="font-dmSans text-[10px] sm:text-[11px] lg:text-[12px] tracking-wide font-medium">Pan India Delivery</span>
              </div>
              <div className="flex items-center gap-[4px] text-textMid opacity-90">
                <SealCheck size={16} weight="duotone" className="text-greenDark shrink-0" />
                <span className="font-dmSans text-[10px] sm:text-[11px] lg:text-[12px] tracking-wide font-medium">100% Quality Assured</span>
              </div>
            </div>
          </div>

          {/* DESKTOP IMAGE Column (7 columns on desktop, hidden on mobile) */}
          <div className="cta-anim-image hidden md:flex w-full md:col-span-7 relative justify-end md:-mt-[20px] lg:-mt-[40px]" style={{ animationDelay: '150ms' }}>
            {/* Subtle organic radial glow behind the image */}
            <div className="absolute inset-0 bg-white blur-[80px] opacity-40 rounded-full scale-[0.8] translate-y-[5%]"></div>
            
            {/* Image container with fixed minimum height, cropping from the left to preserve the jars on the right */}
            <div className="w-full relative rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(55,43,25,0.12)] border border-white/50 md:-mb-[40px] lg:-mb-[60px]">
              <img 
                src="/images/reggi_CTA.png" 
                alt="REGGI Lifestyle" 
                className="w-full md:h-[450px] lg:h-[500px] object-cover object-right block"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
