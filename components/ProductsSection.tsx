'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

type FilterType = 'ALL' | 'BOTTLES' | 'POUCHES' | 'COMBOS' | 'SPICY' | 'SWEET & AROMATIC';

const filters: FilterType[] = ['ALL', 'BOTTLES', 'POUCHES', 'COMBOS', 'SPICY', 'SWEET & AROMATIC'];

export default function ProductsSection({ products }: { products: Product[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  const filteredProducts = products.filter((p) => {
    switch (activeFilter) {
      case 'ALL':
        return true;
      case 'BOTTLES':
        return p.category === 'Single Bottle';
      case 'POUCHES':
        return p.category === 'Pouch Pack';
      case 'COMBOS':
        return p.category === 'Combo';
      case 'SPICY':
        return p.flavour_type === 'Spicy';
      case 'SWEET & AROMATIC':
        return p.flavour_type === 'Sweet';
      default:
        return true;
    }
  });

  return (
    <section id="products" className="py-[50px] px-[20px] md:py-[80px] md:px-[40px] max-w-[1200px] mx-auto animate-reveal">
      <div className="text-center mb-[32px] md:mb-[48px]">
        <div className="inline-block text-[11px] tracking-[0.18em] uppercase text-amber font-bold mb-[12px]">
          Our Collection
        </div>
        <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] font-bold text-textDark leading-[1.2]">
          Choose Your REGGI
        </h2>
        <p className="text-[16px] text-textMid mt-[12px]">Explore Our Range of Flavours.</p>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar gap-[10px] mb-[40px] md:mb-[48px] justify-start md:justify-center px-[4px] py-[4px] pr-[20px] md:pr-0">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`whitespace-nowrap px-[18px] py-[8px] md:py-[10px] rounded-[100px] text-[12px] md:text-[13px] font-bold tracking-[0.05em] transition-all duration-200 cursor-pointer ${
              activeFilter === filter
                ? 'bg-greenDark text-white shadow-md'
                : 'bg-transparent text-textMid border border-greenDark/15 hover:border-greenDark/40 hover:text-greenDark hover:bg-greenPale/20'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div 
          key={activeFilter}
          className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[28px] animate-fade-in"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-[80px] text-textMid font-medium">
          No products found in this category.
        </div>
      )}

    </section>
  );
}
