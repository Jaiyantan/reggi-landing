'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hasError, setHasError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    setIsAdding(true);
    setHasError(false);
    try {
      await addItem(product.id);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 2000);
    } finally {
      setIsAdding(false);
    }
  };

  const getTasteLabel = (p: Product) => {
    if (p.id === '5-flavours-jar-combo') return 'ALL 5 FLAVOURS';
    if (p.flavour_type === 'Spicy') return 'SPICY';
    if (p.flavour_type === 'Sweet') return 'SWEET & AROMATIC';
    return null;
  };

  const tasteLabel = getTasteLabel(product);

  return (
    <div 
      id={`product-${product.id}`}
      className="group bg-white rounded-[16px] md:rounded-[20px] overflow-hidden border border-black/5 flex flex-col shadow-sm transition-all duration-300 ease-out md:hover:-translate-y-[2px] md:hover:shadow-md scroll-mt-[100px]"
    >
      {/* 1. PRODUCT IMAGE */}
      <div className="relative overflow-hidden bg-[#F8F4EA] aspect-[4/5] rounded-t-[16px] md:rounded-t-[20px] border-b border-black/5">
        
        {/* ONE Subtle Badge Maximum */}
        {product.tag && (
          <div className="absolute top-[12px] left-[12px] z-10">
            <span className="inline-block bg-white text-greenDark text-[9px] md:text-[10px] font-bold tracking-[0.08em] px-[10px] py-[4px] rounded-full uppercase shadow-sm border border-black/5">
              {product.tag}
            </span>
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-[16px] md:p-[24px] transition-transform duration-500 ease-out md:group-hover:scale-[1.03]"
        />
      </div>

      {/* CARD CONTENT */}
      <div className="p-[16px] md:p-[20px] flex-1 flex flex-col justify-between bg-white">
        
        <div>
          {/* 2. SMALL TASTE LABEL */}
          {tasteLabel && (
            <div className="mb-[6px]">
              <span 
                className={`text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase ${
                  product.flavour_type === 'Spicy' 
                    ? 'text-[#C4422B]' 
                    : product.flavour_type === 'Sweet'
                    ? 'text-[#B56E25]'
                    : 'text-greenDark'
                }`}
              >
                {tasteLabel}
              </span>
            </div>
          )}
          
          {/* 3. PRODUCT NAME */}
          <h3 className="font-cormorant text-[20px] md:text-[24px] font-bold text-[#121212] leading-[1.15] mb-[6px]">
            {product.name}
          </h3>
          
          {/* 4. SHORT FLAVOUR-FOCUSED DESCRIPTION */}
          <p className="text-[13px] md:text-[14px] text-textMid leading-[1.5] mb-[16px] line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* BOTTOM ROW: PRICE & ADD TO CART */}
        <div className="flex items-end justify-between pt-[16px] border-t border-black/5 mt-auto">
          
          {/* 5. PRICE */}
          <div className="flex flex-col">
            {product.priceOriginal && (
              <span className="text-[11px] text-textMid/60 line-through mb-[2px]">
                {product.priceOriginal}
              </span>
            )}
            <span className="text-[18px] md:text-[20px] font-bold text-greenDark leading-none">
              {product.priceCurrent}
            </span>
          </div>

          {/* 6. ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center justify-center min-w-[100px] px-[16px] py-[10px] md:py-[12px] rounded-[100px] text-[12px] md:text-[13px] font-bold cursor-pointer transition-all duration-200 ease-out whitespace-nowrap border ${
              hasError 
                ? 'bg-redAccent border-redAccent text-white'
                : isAdded
                ? 'bg-amber border-amber text-white'
                : 'bg-transparent border-greenDark text-greenDark hover:bg-greenDark hover:text-white'
            } ${isAdding ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isAdding ? 'Adding...' : hasError ? 'Error!' : isAdded ? 'Added ✓' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}
