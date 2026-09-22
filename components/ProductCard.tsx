'use client';

import { useState } from 'react';
import Link from 'next/link';
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

  const getImageScale = (p: Product) => {
    switch (p.id) {
      case 'cardamom-bottle':
        return 'scale-[1.06] group-hover:scale-[1.09]';
      case 'cardamom-cinnamon-ginger-bottle':
        return 'scale-[1.24] group-hover:scale-[1.28]';
      case 'cumin-ginger-chilli-bottle':
      case 'ginger-garlic-chilli-bottle':
        return 'scale-[1.18] group-hover:scale-[1.22]';
      case 'cardamom-cinnamon-clove-bottle':
        return 'scale-[1.20] group-hover:scale-[1.24]';
      default:
        return 'scale-[1.20] group-hover:scale-[1.24]';
    }
  };

  const tasteLabel = getTasteLabel(product);

  return (
    <div 
      id={`product-${product.id}`}
      className="group bg-white rounded-[16px] md:rounded-[20px] overflow-hidden border border-[rgba(165,55,48,0.28)] hover:border-[rgba(165,55,48,0.42)] flex flex-col shadow-sm transition-colors duration-200 scroll-mt-[100px] w-full max-w-[360px] sm:max-w-none mx-auto relative"
    >
      {/* 1. PRODUCT IMAGE LINK */}
      <Link 
        href={`/products/${product.id}`}
        className="block relative w-full h-[240px] sm:h-[260px] md:h-[290px] lg:h-[310px] bg-white rounded-t-[16px] md:rounded-t-[20px] overflow-hidden flex items-center justify-center border-b border-black/5 cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain object-center max-w-full max-h-full transition-transform duration-300 ease-out ${getImageScale(product)}`}
        />
      </Link>

      {/* CARD CONTENT */}
      <div className="p-[14px] md:p-[16px] flex-1 flex flex-col justify-between bg-white">
        
        <Link href={`/products/${product.id}`} className="block cursor-pointer">
          {/* 2. SMALL TASTE LABEL */}
          {tasteLabel && (
            <div className="mb-[4px]">
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
          <h3 className="font-cormorant text-[18px] md:text-[21px] font-bold text-[#121212] leading-[1.15] mb-[4px] group-hover:text-greenDark transition-colors">
            {product.name}
          </h3>
          
          {/* 4. SHORT FLAVOUR-FOCUSED DESCRIPTION */}
          <p className="text-[12px] md:text-[13px] text-textMid leading-[1.4] mb-[12px] line-clamp-2">
            {product.description}
          </p>
        </Link>

        {/* BOTTOM ROW: PRICE & ADD TO CART */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[10px] pt-[12px] border-t border-black/5 mt-auto">
          
          {/* 5. PRICE */}
          <Link href={`/products/${product.id}`} className="flex items-baseline gap-[6px] sm:flex-col sm:gap-0 cursor-pointer">
            {product.priceOriginal && (
              <span className="text-[11px] text-textMid/60 line-through mb-[1px]">
                {product.priceOriginal}
              </span>
            )}
            <span className="text-[17px] md:text-[19px] font-bold text-greenDark leading-none">
              {product.priceCurrent}
            </span>
          </Link>

          {/* 6. ADD TO CART */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            disabled={isAdding}
            className={`w-full sm:w-auto flex items-center justify-center min-w-[90px] min-h-[42px] sm:min-h-[40px] px-[14px] py-[8px] md:py-[10px] rounded-[100px] text-[12px] md:text-[13px] font-bold cursor-pointer transition-all duration-200 ease-out whitespace-nowrap border z-10 ${
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

