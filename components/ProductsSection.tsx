'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

type FormatFilterType = 'ALL' | 'BOTTLES' | 'POUCHES' | 'COMBOS';

const formatFilters: FormatFilterType[] = ['ALL', 'BOTTLES', 'POUCHES', 'COMBOS'];

const curatedProductOrder = [
  '5-flavours-jar-combo',
  'cumin-ginger-chilli-bottle',
  'cardamom-bottle',
  'ginger-garlic-chilli-bottle',
  'cardamom-cinnamon-clove-bottle',
  'cardamom-cinnamon-ginger-bottle',
  'cumin-ginger-chilli-pouch',
  'ginger-garlic-chilli-pouch',
  'cardamom-pouch',
  'cardamom-cinnamon-cloves-pouch',
  'cardamom-cinnamon-ginger-pouch',
  'cumin-ginger-chilli-combo',
  'ginger-garlic-chilli-combo',
  'cardamom-combo',
  'cardamom-cinnamon-cloves-combo',
  'cardamom-cinnamon-ginger-combo',
  'spicy-pouch-combo',
  'sweet-pouch-combo',
];

export default function ProductsSection({ products }: { products: Product[] }) {
  const [activeFormat, setActiveFormat] = useState<FormatFilterType>('ALL');

  useEffect(() => {
    const handleSelectFilter = (e: any) => {
      const value = e.detail;
      if (formatFilters.includes(value)) {
        setActiveFormat(value);
      }
    };
    
    window.addEventListener('selectProductFilter', handleSelectFilter);
    return () => {
      window.removeEventListener('selectProductFilter', handleSelectFilter);
    };
  }, []);

  const filteredProducts = products.filter((p) => {
    if (activeFormat === 'BOTTLES') return p.category === 'Single Bottle';
    if (activeFormat === 'POUCHES') return p.category === 'Pouch Pack';
    if (activeFormat === 'COMBOS') return p.category === 'Combo';
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const indexA = curatedProductOrder.indexOf(a.id);
    const indexB = curatedProductOrder.indexOf(b.id);
    const posA = indexA === -1 ? 999 : indexA;
    const posB = indexB === -1 ? 999 : indexB;
    return posA - posB;
  });

  return (
    <section id="products" className="pt-[36px] pb-[48px] md:pt-[52px] md:pb-[64px] px-[16px] sm:px-[20px] md:px-[40px] max-w-[1200px] mx-auto animate-reveal scroll-mt-[70px]">
      
      <style>{`
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

        @media (prefers-reduced-motion: reduce) {
          .text-wipe-loop {
            animation: none !important;
            -webkit-mask-image: none !important;
            mask-image: none !important;
          }
        }
      `}</style>
      
      {/* Header */}
      <div className="text-center mb-[36px] md:mb-[40px]">
        <div className="inline-block text-[11px] tracking-[0.18em] uppercase text-amber font-bold mb-[12px]">
          Our Collection
        </div>
        <h2 className="font-cormorant text-[clamp(32px,4vw,46px)] font-bold text-textDark leading-[1.15]">
          <span className="text-wipe-loop">
            Taste the Goodness, Feel the Difference!
          </span>
        </h2>
        <p className="text-[15px] md:text-[16px] text-textMid mt-[16px] md:mt-[18px]">
          Five signature flavours. Choose how you want to enjoy REGGI.
        </p>
      </div>

      {/* Format Filter Row */}
      <div className="flex items-center justify-center mb-[32px] md:mb-[36px]">
        <div className="w-full max-w-full flex overflow-x-auto hide-scrollbar gap-[8px] justify-start sm:justify-center px-[4px] py-[4px] snap-x snap-mandatory">
          {formatFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFormat(filter)}
              className={`snap-start whitespace-nowrap px-[18px] md:px-[22px] h-[44px] min-h-[44px] flex items-center justify-center rounded-[100px] text-[14px] font-medium tracking-[0.02em] transition-all duration-200 cursor-pointer border ${
                activeFormat === filter
                  ? 'bg-greenDark text-[#F8F4EA] border-greenDark'
                  : 'bg-transparent text-textDark/80 border-[#DED7C9] hover:border-greenDark/40 hover:text-greenDark'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div 
          key={activeFormat}
          className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-[12px] gap-y-[24px] md:gap-[28px] animate-fade-in"
        >
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-[60px] text-textMid font-medium">
          No products found for this selection.
        </div>
      )}

    </section>
  );
}
