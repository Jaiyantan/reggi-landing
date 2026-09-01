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


  return (
    <div 
      id={`product-${product.id}`}
      className="group bg-white rounded-[22px] overflow-hidden border border-greenDark/10 flex flex-col shadow-card transition-all duration-300 ease-out md:hover:-translate-y-[6px] md:hover:shadow-card-hover scroll-mt-[100px]"
    >
      <div className="relative overflow-hidden bg-cream aspect-[4/5] md:aspect-[3/4] rounded-t-[20px] m-[6px] rounded-[16px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out md:group-hover:scale-105"
        />

      </div>

      <div className="p-[12px_16px_16px] flex-1 flex flex-col justify-end">
        {product.flavour_type && (
          <div className="mb-[6px] flex">
            <span className={`text-[10px] font-bold px-[8px] py-[3px] rounded-full tracking-[0.06em] uppercase ${
              product.flavour_type === 'Spicy' 
                ? 'bg-redAccent/10 text-redAccent' 
                : product.flavour_type === 'Sweet'
                ? 'bg-amber/15 text-[#B56E25]'
                : 'bg-greenDark/10 text-greenDark'
            }`}>
              {product.flavour_type}
            </span>
          </div>
        )}
        <h3 className="font-cormorant text-[18px] md:text-[20px] font-bold text-[#121212] leading-[1.2] mb-[4px] truncate">
          {product.name}
        </h3>
        <p className="text-[12px] md:text-[13px] text-textDark font-medium leading-[1.4] mb-[12px] line-clamp-2">
          {product.description}
        </p>


        <div className="flex items-center justify-between border-t border-creamDark pt-[12px]">
          <div className="flex flex-col">
            {product.priceOriginal && (
              <span className="text-[12px] text-textLight line-through">
                {product.priceOriginal}
              </span>
            )}
            <span className="text-[22px] font-bold text-greenDark">
              {product.priceCurrent}{' '}
              <span className="text-[13px] font-normal text-textMid">incl. GST</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex items-center gap-[6px] px-[14px] py-[8px] md:px-[16px] md:py-[10px] rounded-[12px] text-[12px] md:text-[13px] font-bold cursor-pointer transition-all duration-200 ease-out active:scale-95 whitespace-nowrap shadow-sm bg-gradient-to-b ${
              hasError 
                ? 'from-redAccent to-[#990000] text-white scale-105 shadow-md'
                : isAdded
                ? 'from-amber to-[#B56E25] text-white scale-105 shadow-md'
                : 'from-greenDark to-[#1E3821] text-white hover:scale-[1.03] hover:shadow-order-btn-hover'
            } ${isAdding ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isAdding ? 'Adding...' : hasError ? 'Error!' : isAdded ? 'Added ✓' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}
