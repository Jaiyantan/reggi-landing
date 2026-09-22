'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';

interface ProductPurchaseSectionProps {
  productId: string;
}

export default function ProductPurchaseSection({ productId }: ProductPurchaseSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const closeDrawer = useCartStore((state) => state.closeDrawer);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem(productId, quantity);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      await addItem(productId, quantity);
      closeDrawer();
      router.push('/checkout');
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="flex flex-col gap-[16px] my-[24px]">
      {/* Quantity Selector & Purchase Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] sm:gap-[16px]">
        {/* Quantity Controls: −  1  + */}
        <div className="flex items-center justify-between border border-[#DED7C9] bg-white rounded-[100px] h-[48px] px-[12px] w-full sm:w-[130px] shrink-0 select-none shadow-2xs">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-[32px] h-[32px] flex items-center justify-center text-[18px] text-textDark font-medium hover:text-greenDark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <span className="font-manrope text-[15px] font-bold text-textDark w-[32px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Increase quantity"
            className="w-[32px] h-[32px] flex items-center justify-center text-[18px] text-textDark font-medium hover:text-greenDark transition-colors"
          >
            +
          </button>
        </div>

        {/* Action Buttons: ADD TO CART and BUY NOW */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[10px] w-full">
          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || isBuyingNow}
            className={`h-[48px] px-[20px] rounded-[100px] font-manrope text-[13px] md:text-[14px] font-bold tracking-[0.04em] uppercase border transition-all duration-200 flex items-center justify-center cursor-pointer ${
              justAdded
                ? 'bg-amber border-amber text-white'
                : 'bg-transparent border-greenDark text-greenDark hover:bg-greenDark hover:text-white'
            } ${isAdding ? 'opacity-70 cursor-wait' : ''}`}
          >
            {isAdding ? 'ADDING...' : justAdded ? 'ADDED TO CART ✓' : 'ADD TO CART'}
          </button>

          {/* BUY NOW → */}
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={isAdding || isBuyingNow}
            className="h-[48px] px-[20px] rounded-[100px] font-manrope text-[13px] md:text-[14px] font-bold tracking-[0.04em] uppercase bg-greenDark border border-greenDark text-[#F8F4EA] hover:bg-[#1a3b26] transition-all duration-200 flex items-center justify-center gap-[6px] shadow-sm hover:shadow cursor-pointer disabled:opacity-70 disabled:cursor-wait"
          >
            {isBuyingNow ? 'PROCEEDING...' : 'BUY NOW →'}
          </button>
        </div>
      </div>
    </div>
  );
}
