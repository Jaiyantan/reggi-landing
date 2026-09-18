'use client';

import { useState, useEffect, useRef } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const WHATSAPP_URL =
  'https://wa.me/917603922323?text=' +
  encodeURIComponent('Hi REGGI, I have a question about your products.');

const faqs: FaqItem[] = [
  {
    question: 'What exactly is REGGI?',
    answer:
      'REGGI is a bold, flavour-packed spread, dip and sauce made from naturally grown organic jujube fruit (also known as red date), blended with spices such as ginger, garlic, chilli, cumin, cardamom, cinnamon and cloves. It combines a naturally sweet and tangy fruit base with a rich spice profile.',
  },
  {
    question: 'What can I use REGGI with?',
    answer:
      'REGGI can be used as a dip for snacks such as samosas, pakodas, chips and bajji; as a spread for toast, wraps, parathas and chapathis; stirred into noodles, marinades or salad dressings; paired with grilled foods; added to fried rice, upma, pasta and kichidi; dolloped onto dosas, chillas and kebabs; added to rice bowls or roasted potatoes; or enjoyed straight from the spoon. It can also be used as a breakfast or tea-time spread.',
  },
  {
    question: 'Is REGGI vegan and gluten-free?',
    answer:
      'Yes. REGGI is vegan and gluten-free. The REGGI FAQ describes it as containing no dairy or fillers and being made with plant-based ingredients and organic spice extracts.',
  },
  {
    question: 'How should I store REGGI?',
    answer:
      'Unopened jars are shelf-stable. Once opened, refrigerate REGGI and consume within 3–4 weeks. Always follow the storage guidance provided on the product packaging.',
  },
  {
    question: 'Can I cook with REGGI?',
    answer:
      'Yes. REGGI can be stirred into pasta and noodles, used while preparing vegetable fries, used anywhere you might use ketchup such as burgers, sandwiches, fries or eggs, brushed onto roasted vegetables, tofu or meats before grilling, mixed with oil and chilli as a marinade, incorporated into baking, or used as a base for stir-fries and fusion curries.',
  },
  {
    question: 'Do you ship across India? Internationally?',
    answer:
      'REGGI currently ships across India. The REGGI website states that international shipping is being planned for the future.',
  },
  {
    question: 'How is REGGI different from other sauces, dips or spreads?',
    answer:
      'REGGI is made with naturally grown jujube fruit combined with a blend of spices. The brand positions it as a versatile fruit-based alternative to conventional sauces, dips and spreads, and highlights that it can be enjoyed as a spread, dip, glaze or marinade.',
  },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PlusMinusIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="relative flex items-center justify-center w-[20px] h-[20px] shrink-0 text-[#234D32]"
      aria-hidden="true"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Horizontal bar (always visible) */}
        <line x1="3" y1="9" x2="15" y2="9" />
        {/* Vertical bar (collapses smoothly when open) */}
        <line
          x1="9"
          y1="3"
          x2="9"
          y2="15"
          className={`origin-center transition-transform duration-250 ease-out ${
            isOpen ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
          }`}
        />
      </svg>
    </span>
  );
}

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // First question expanded by default, all others collapsed
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !ctaRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const ctaRect = ctaRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is active on screen
      const isSectionInView = sectionRect.top < windowHeight && sectionRect.bottom > 80;
      // In-section CTA has scrolled past the top of the viewport
      const isCtaPastTop = ctaRect.bottom < 0;

      // Show floating button only when user is inside FAQ section AND in-section CTA is out of view
      setShowFloating(isSectionInView && isCtaPastTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="bg-[#F8F4EA] pt-[80px] md:pt-[100px] pb-[80px] md:pb-[100px] px-[16px] sm:px-[24px] md:px-[40px] scroll-mt-[70px] relative"
    >
      <div className="max-w-[880px] mx-auto">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-block text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-amber font-bold mb-[12px] md:mb-[16px]">
            FAQ
          </div>
          <h2 className="font-cormorant text-[clamp(32px,4vw,44px)] font-bold text-textDark leading-[1.15]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Support CTA Block */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center text-center mt-[24px] md:mt-[28px] mb-[28px] md:mb-[34px]"
        >
          <p className="text-[14px] md:text-[15px] font-medium text-textMid">
            Something else?
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Us on WhatsApp (opens in new tab)"
            className="mt-[8px] md:mt-[10px] w-full sm:w-auto h-[48px] md:h-[50px] min-h-[48px] px-[24px] md:px-[28px] bg-[#234D32] text-[#F8F4EA] rounded-[13px] text-[15px] font-semibold inline-flex items-center justify-center gap-[9px] hover:bg-[#1B3D27] active:scale-[0.99] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234D32] focus-visible:ring-offset-2 no-underline"
          >
            <WhatsAppIcon className="w-[19px] h-[19px] shrink-0 text-[#F8F4EA]" />
            <span>Chat with Us →</span>
          </a>
        </div>

        {/* FAQ Accordion List */}
        <div className="border-t border-[#E5DED0]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={faq.question}
                className="border-b border-[#E5DED0]"
              >
                <h3>
                  <button
                    id={headingId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left flex items-center justify-between gap-[16px] py-[22px] md:py-[26px] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234D32] focus-visible:ring-offset-2 rounded-sm"
                  >
                    <span className="font-dmSans text-[17px] md:text-[18px] lg:text-[19px] font-medium text-[#1E2D1F] group-hover:text-[#234D32] transition-colors duration-200 leading-[1.35] pr-[8px]">
                      {faq.question}
                    </span>
                    <PlusMinusIcon isOpen={isOpen} />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-dmSans text-[15px] md:text-[16px] leading-[1.65] text-[#4A5C4B] max-w-[760px] pb-[22px] md:pb-[26px] pr-[28px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-Only Floating WhatsApp Button (active only while browsing FAQ questions) */}
      <div className="md:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with REGGI support on WhatsApp"
          className={`fixed right-[20px] bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-40 w-[54px] h-[54px] min-w-[48px] min-h-[48px] rounded-full bg-[#234D32] text-[#F8F4EA] flex items-center justify-center shadow-[0_4px_16px_rgba(35,77,50,0.28)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234D32] focus-visible:ring-offset-2 ${
            showFloating
              ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
              : 'opacity-0 scale-90 pointer-events-none translate-y-2'
          }`}
        >
          <WhatsAppIcon className="w-[26px] h-[26px]" />
        </a>
      </div>
    </section>
  );
}
