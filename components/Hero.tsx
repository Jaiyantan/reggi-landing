'use client';

import React from 'react';

export default function Hero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('products');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', '#products');
    }
  };

  return (
    <section
      aria-label="Hero Banner"
      className="relative w-full overflow-hidden bg-[#F5EFE4] min-h-[760px] h-[86svh] max-h-[860px] md:h-[76vh] md:min-h-[580px] md:max-h-[820px]"
    >
      <style>{`
        .hero-banner-img {
          object-fit: cover;
          object-position: center bottom;
        }

        @media (min-width: 768px) {
          .hero-banner-img {
            object-position: right top;
          }
        }

        @media (min-width: 1024px) {
          .hero-banner-img {
            object-position: 84% 0%;
          }
        }

        @keyframes textWipeLtr {
          0%, 30% {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
          55% {
            -webkit-mask-position: 50% 0;
            mask-position: 50% 0;
          }
          80%, 100% {
            -webkit-mask-position: 0% 0;
            mask-position: 0% 0;
          }
        }
        
        .text-wipe-loop {
          display: inline-block;
          max-width: 100%;
          -webkit-mask-image: linear-gradient(
            90deg,
            #000 0%,
            #000 25%,
            rgba(0, 0, 0, 0) 37%,
            rgba(0, 0, 0, 0) 63%,
            #000 75%,
            #000 100%
          );
          mask-image: linear-gradient(
            90deg,
            #000 0%,
            #000 25%,
            rgba(0, 0, 0, 0) 37%,
            rgba(0, 0, 0, 0) 63%,
            #000 75%,
            #000 100%
          );
          -webkit-mask-size: 400% 100%;
          mask-size: 400% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: textWipeLtr 6s cubic-bezier(0.45, 0.05, 0.2, 0.95) infinite;
          will-change: mask-position, -webkit-mask-position;
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-anim-eyebrow {
          animation: heroFadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-anim-copy {
          animation: heroFadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) 90ms backwards;
        }

        .hero-anim-feature {
          animation: heroFadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) 180ms backwards;
        }

        .hero-anim-cta {
          animation: heroFadeUp 550ms cubic-bezier(0.16, 1, 0.3, 1) 270ms backwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .text-wipe-loop {
            animation: none !important;
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
          .hero-anim-eyebrow,
          .hero-anim-copy,
          .hero-anim-feature,
          .hero-anim-cta {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Responsive Background Banner Image */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <source
          media="(max-width: 767px)"
          srcSet="/images/banner_mobile.png"
          width={941}
          height={1672}
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/banner_desktop.png"
          width={1774}
          height={887}
        />
        <img
          src="/images/banner_desktop.png"
          alt="REGGI Elanthai Jujube Fruit Spread with traditional dosa and spices"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hero-banner-img w-full h-full"
        />
      </picture>

      {/* Subtle Readability Treatment - Blends seamlessly into photography */}
      {/* Desktop: Gentle ivory/cream wash on the left negative space fading toward product */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(246, 240, 230, 0.78) 0%, rgba(246, 240, 230, 0.55) 28%, rgba(246, 240, 230, 0.18) 46%, rgba(246, 240, 230, 0) 65%)',
        }}
        aria-hidden="true"
      />

      {/* Mobile: Gentle ivory/cream wash in upper negative space fading before the product */}
      <div
        className="block md:hidden absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(246, 240, 230, 0.82) 0%, rgba(246, 240, 230, 0.6) 24%, rgba(246, 240, 230, 0.2) 34%, rgba(246, 240, 230, 0) 44%)',
        }}
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-[24px] sm:px-[28px] md:px-[56px] lg:px-[72px] xl:px-[96px] flex flex-col justify-start pt-[28px] sm:pt-[32px] md:justify-center md:pt-0 md:pb-[3vh]">
        <div className="max-w-[340px] sm:max-w-[350px] md:max-w-[540px] lg:max-w-[580px] text-left">
          
          {/* Eyebrow: Mobile (Clean Manrope 12-13px uppercase with text-wipe-loop animation) vs Desktop (Cormorant Garamond animated wipe) */}
          <div className="md:hidden">
            <p
              className="hero-anim-eyebrow font-manrope text-[12.5px] uppercase tracking-[1.6px] text-[#234D32] leading-[1.2] mb-[12px]"
              style={{ fontWeight: 800, WebkitTextStroke: '0.35px #234D32' }}
            >
              <span className="text-wipe-loop">
                REDISCOVER THE GOODNESS<br />OF ELANTHAI
              </span>
            </p>
          </div>
          <div className="hidden md:block">
            <h2 className="hero-anim-eyebrow font-cormorant text-[clamp(28px,3.6vw,44px)] font-bold text-textDark leading-[1.15] mb-[20px]">
              <span className="text-wipe-loop">
                REDISCOVER THE GOODNESS OF ELANTHAI
              </span>
            </h2>
          </div>

          {/* Main Supporting Copy */}
          <h1 className="hero-anim-copy font-manrope italic text-[16px] sm:text-[16.5px] md:text-[21px] lg:text-[21.5px] font-[500] text-[#1E2D1F] leading-[1.42] md:leading-[1.48] tracking-[-0.01em] mb-[18px] md:mb-[26px] max-w-[340px] md:max-w-none">
            A delicious Elanthai fruit spread, blended with carefully selected spices, made for spreading, dipping, cooking and more.
          </h1>

          {/* Feature Line */}
          <p className="hero-anim-feature font-manrope text-[11.5px] md:text-[13px] lg:text-[13.5px] font-semibold md:font-bold tracking-[0.6px] md:tracking-[1px] text-[#234D32] uppercase leading-[1.3] mb-[20px] md:mb-[30px] max-w-[320px] md:max-w-none">
            5 FLAVOURS • SWEET & AROMATIC • SPICY & SAVOURY
          </p>

          {/* Primary CTA */}
          <div className="hero-anim-cta">
            <a
              href="#products"
              onClick={handleScrollToProducts}
              aria-label="Shop REGGI products"
              className="inline-flex items-center justify-center font-manrope font-semibold text-[14.5px] md:text-[15.5px] tracking-[0.3px] bg-[#234D32] hover:bg-[#1A3B26] text-[#F8F4EA] w-[185px] sm:w-[195px] md:w-auto px-[24px] md:px-[38px] h-[50px] md:h-[54px] rounded-[16px] transition-all duration-200 ease-out shadow-[0_2px_8px_rgba(35,77,50,0.18)] hover:shadow-[0_4px_14px_rgba(35,77,50,0.25)] hover:-translate-y-[1px] active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#234D32] focus-visible:ring-offset-2 select-none"
            >
              SHOP REGGI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
