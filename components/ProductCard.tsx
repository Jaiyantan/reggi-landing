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
      className="group bg-white rounded-[22px] overflow-hidden border border-greenDark/10 flex flex-col shadow-card transition-all duration-300 ease-out hover:-translate-y-[6px] hover:shadow-card-hover scroll-mt-[100px]"
    >
      <div className="relative overflow-hidden bg-cream h-[220px] rounded-t-[20px] m-[6px] rounded-[16px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute top-[14px] left-[14px] bg-redAccent text-white text-[11px] font-bold px-[10px] py-[4px] rounded-full tracking-[0.06em] shadow-sm -rotate-1">
            {product.tag}
          </span>
        )}
      </div>

      <div className="p-[20px_22px_22px] flex-1 flex flex-col">
        <div className="text-[11px] uppercase tracking-[0.1em] text-amber font-bold mb-[6px]">
          {product.subCategoryTitle || product.category}
        </div>
        <h3 className="font-cormorant text-[20px] font-bold text-redAccent leading-[1.2] mb-[10px]">
          {product.name}
        </h3>
        <p className="text-[13px] text-textDark font-medium leading-[1.6] mb-[16px] flex-1">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-[6px] mb-[18px]">
          {product.perks.map((perk, index) => (
            <span
              key={index}
              className="bg-greenPale/80 text-greenDark text-[11px] font-semibold px-[10px] py-[4px] rounded-full border border-greenLight/20"
            >
              {perk}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-creamDark pt-[16px]">
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
            className={`flex items-center gap-[7px] px-[18px] py-[11px] rounded-[14px] text-[13px] font-bold cursor-pointer transition-all duration-200 ease-out active:scale-95 whitespace-nowrap shadow-sm bg-gradient-to-b ${
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
