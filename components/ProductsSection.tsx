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
    <section id="products" className="pt-[36px] pb-[48px] md:pt-[52px] md:pb-[64px] px-[20px] md:px-[40px] max-w-[1200px] mx-auto animate-reveal scroll-mt-[70px]">
      
      {/* Header */}
      <div className="text-center mb-[36px] md:mb-[40px]">
        <div className="inline-block text-[11px] tracking-[0.18em] uppercase text-amber font-bold mb-[12px]">
          Our Collection
        </div>
        <h2 className="font-cormorant text-[clamp(32px,4vw,46px)] font-bold text-textDark leading-[1.15]">
          Choose Your REGGI
        </h2>
        <p className="text-[15px] md:text-[16px] text-textMid mt-[16px] md:mt-[18px]">
          Five signature flavours. Choose how you want to enjoy REGGI.
        </p>
      </div>

      {/* Format Filter Row */}
      <div className="flex items-center justify-center mb-[32px] md:mb-[36px]">
        <div className="flex overflow-x-auto hide-scrollbar gap-[8px] justify-center px-[4px] py-[2px] snap-x snap-mandatory">
          {formatFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFormat(filter)}
              className={`snap-start whitespace-nowrap px-[18px] md:px-[22px] h-[40px] md:h-[44px] flex items-center justify-center rounded-[100px] text-[14px] font-medium tracking-[0.02em] transition-all duration-200 cursor-pointer border ${
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
          className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-[12px] gap-y-[24px] md:gap-[28px] animate-fade-in"
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
