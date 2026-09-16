'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'why' | 'enjoy' | 'flavours' | null>(null);

  const totalItems = useCartStore((state) => state.totalItems);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (mounted && totalItems > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems, mounted]);

  // Set IDs dynamically on target sections if not present, and track active section on scroll
  useEffect(() => {
    if (!mounted) return;

    // Assign IDs for fallback anchor references without modifying other files
    const whyEl = document.querySelector('.why-section');
    if (whyEl && !whyEl.id) whyEl.id = 'why';

    const headings = Array.from(document.querySelectorAll('h2'));
    const enjoyHeading = headings.find((h) =>
      h.textContent?.toLowerCase().includes('enjoy reggi your way')
    );
    const enjoyEl = enjoyHeading?.closest('section');
    if (enjoyEl && !enjoyEl.id) enjoyEl.id = 'enjoy';

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerOffset = 140;

      const whySection = (document.querySelector('.why-section') as HTMLElement) || document.getElementById('why');
      const enjoySection = (enjoyHeading?.closest('section') as HTMLElement) || document.getElementById('enjoy');
      const productsSection = document.getElementById('products');

      const whyTop = whySection ? whySection.offsetTop - headerOffset : Infinity;
      const productsTop = productsSection ? productsSection.offsetTop - headerOffset : Infinity;
      const enjoyTop = enjoySection ? enjoySection.offsetTop - headerOffset : Infinity;

      // In page.tsx: Hero -> WhySection -> ProductsSection -> EnjoySection
      if (scrollY >= enjoyTop && enjoyTop !== Infinity) {
        setActiveSection('enjoy');
      } else if (scrollY >= productsTop && productsTop !== Infinity) {
        setActiveSection('flavours');
      } else if (scrollY >= whyTop && whyTop !== Infinity) {
        setActiveSection('why');
      } else {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Smooth scroll helper with sticky header height offset compensation
  const scrollToSection = (target: 'why' | 'enjoy' | 'flavours') => {
    setIsMobileMenuOpen(false);

    let targetEl: HTMLElement | null = null;
    if (target === 'why') {
      targetEl = (document.querySelector('.why-section') as HTMLElement) || document.getElementById('why');
    } else if (target === 'enjoy') {
      const headings = Array.from(document.querySelectorAll('h2'));
      const enjoyHeading = headings.find((h) =>
        h.textContent?.toLowerCase().includes('enjoy reggi your way')
      );
      targetEl = (enjoyHeading?.closest('section') as HTMLElement) || document.getElementById('enjoy');
    } else if (target === 'flavours') {
      window.dispatchEvent(new CustomEvent('selectProductFilter', { detail: 'ALL' }));
      targetEl = document.getElementById('products');
    }

    if (targetEl) {
      const navEl = document.querySelector('nav');
      const navHeight = navEl ? navEl.offsetHeight : 74;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - navHeight);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="sticky top-0 z-[100] bg-cream border-b border-creamDark shadow-nav">
      <div className="max-w-[1400px] mx-auto px-[16px] sm:px-[24px] md:px-[40px] h-[68px] md:h-[74px] flex items-center justify-between gap-[16px]">
        {/* Left: REGGI Logo */}
        <div className="flex items-center shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-[10px] no-underline cursor-pointer"
            aria-label="REGGI Home"
          >
            <img
              src="/images/reggi-logo.jpg"
              alt="REGGI Logo"
              className="h-[36px] md:h-[42px] object-contain"
            />
          </a>
        </div>

        {/* Center: Sleek Segmented Navigation Dock (Harmonized Brand Red) */}
        <div className="hidden md:inline-flex items-center p-[4px] bg-[#F4EAE6] border border-[#E2C8C2] rounded-full shadow-[inset_0_1px_2px_rgba(150,21,29,0.05)]">
          <a
            href="#why"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('why');
            }}
            className={`px-[18px] lg:px-[22px] py-[7px] rounded-full text-[13.5px] lg:text-[14px] tracking-[0.01em] transition-all duration-180 no-underline cursor-pointer select-none ${
              activeSection === 'why'
                ? 'bg-white text-[#96151D] font-bold shadow-[0_2px_6px_rgba(150,21,29,0.12)] border border-[#E2C8C2]'
                : 'text-[#96151D] font-semibold hover:bg-white/70'
            }`}
          >
            Why REGGI
          </a>
          <a
            href="#enjoy"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('enjoy');
            }}
            className={`px-[18px] lg:px-[22px] py-[7px] rounded-full text-[13.5px] lg:text-[14px] tracking-[0.01em] transition-all duration-180 no-underline cursor-pointer select-none ${
              activeSection === 'enjoy'
                ? 'bg-white text-[#96151D] font-bold shadow-[0_2px_6px_rgba(150,21,29,0.12)] border border-[#E2C8C2]'
                : 'text-[#96151D] font-semibold hover:bg-white/70'
            }`}
          >
            How to Enjoy
          </a>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('flavours');
            }}
            className={`px-[18px] lg:px-[22px] py-[7px] rounded-full text-[13.5px] lg:text-[14px] tracking-[0.01em] transition-all duration-180 no-underline cursor-pointer select-none ${
              activeSection === 'flavours'
                ? 'bg-white text-[#96151D] font-bold shadow-[0_2px_6px_rgba(150,21,29,0.12)] border border-[#E2C8C2]'
                : 'text-[#96151D] font-semibold hover:bg-white/70'
            }`}
          >
            Our Flavours
          </a>
        </div>

        {/* Right: Cart, SHOP REGGI, and Mobile Hamburger */}
        <div className="flex items-center gap-[8px] sm:gap-[12px] md:gap-[16px] shrink-0">
          {/* Cart Icon Button with Badge */}
          <button
            type="button"
            onClick={openDrawer}
            aria-label="Open cart"
            className={`relative p-[8px] sm:p-[10px] bg-greenDark/5 hover:bg-greenDark/10 active:scale-95 text-greenDark rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
              animateCart ? 'scale-125' : ''
            }`}
          >
            <svg
              className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] stroke-greenDark fill-none stroke-[2]"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {totalItems > 0 && (
              <span
                className={`absolute -top-[4px] -right-[4px] bg-redAccent text-white text-[11px] font-bold h-[20px] min-w-[20px] px-[5px] rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 ${
                  animateCart ? 'scale-125' : 'scale-100'
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* SHOP REGGI Button */}
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('selectProductFilter', { detail: 'ALL' }));
              setTimeout(() => {
                const el = document.getElementById('products');
                if (el) {
                  const navEl = document.querySelector('nav');
                  const navHeight = navEl ? navEl.offsetHeight : 74;
                  const elTop = el.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({
                    top: Math.max(0, elTop - navHeight),
                    behavior: 'smooth',
                  });
                }
              }, 50);
            }}
            className="flex items-center gap-[6px] sm:gap-[8px] bg-gradient-to-b from-greenDark to-[#1F3621] text-white px-[12px] py-[7px] sm:px-[18px] sm:py-[8px] md:px-[22px] md:py-[10px] rounded-[18px] no-underline text-[12px] sm:text-[13px] md:text-[14px] font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-card-hover shrink-0"
          >
            <span>SHOP REGGI</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="md:hidden p-[8px] text-greenDark hover:bg-greenDark/5 active:scale-95 rounded-full transition-colors cursor-pointer flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-[22px] h-[22px] stroke-current stroke-[2] fill-none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-[22px] h-[22px] stroke-current stroke-[2] fill-none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-creamDark bg-cream px-[20px] py-[16px] shadow-md">
          <div className="p-[4px] bg-[#F4EAE6] border border-[#E2C8C2] rounded-[16px] flex flex-col space-y-[4px]">
            <a
              href="#why"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('why');
              }}
              className={`py-[12px] px-[16px] text-[15px] font-semibold rounded-[12px] transition-all duration-150 flex items-center justify-between no-underline ${
                activeSection === 'why'
                  ? 'bg-white text-[#96151D] font-bold shadow-[0_1px_3px_rgba(150,21,29,0.1)] border border-[#E2C8C2]'
                  : 'text-[#96151D] hover:bg-white/70'
              }`}
            >
              <span>Why REGGI</span>
              <span className="text-[13px] text-[#96151D]/60 font-bold">→</span>
            </a>
            <a
              href="#enjoy"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('enjoy');
              }}
              className={`py-[12px] px-[16px] text-[15px] font-semibold rounded-[12px] transition-all duration-150 flex items-center justify-between no-underline ${
                activeSection === 'enjoy'
                  ? 'bg-white text-[#96151D] font-bold shadow-[0_1px_3px_rgba(150,21,29,0.1)] border border-[#E2C8C2]'
                  : 'text-[#96151D] hover:bg-white/70'
              }`}
            >
              <span>How to Enjoy</span>
              <span className="text-[13px] text-[#96151D]/60 font-bold">→</span>
            </a>
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('flavours');
              }}
              className={`py-[12px] px-[16px] text-[15px] font-semibold rounded-[12px] transition-all duration-150 flex items-center justify-between no-underline ${
                activeSection === 'flavours'
                  ? 'bg-white text-[#96151D] font-bold shadow-[0_1px_3px_rgba(150,21,29,0.1)] border border-[#E2C8C2]'
                  : 'text-[#96151D] hover:bg-white/70'
              }`}
            >
              <span>Our Flavours</span>
              <span className="text-[13px] text-[#96151D]/60 font-bold">→</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
