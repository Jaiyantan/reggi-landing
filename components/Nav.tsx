'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Nav() {
  const [mounted, setMounted] = useState(false);
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

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between bg-cream border-b border-creamDark px-[20px] py-[6px] md:px-[40px] md:py-[8px] shadow-nav">
      <a href="#" className="flex items-center gap-[10px] no-underline">
        <img
          src="/images/reggi-logo.jpg"
          alt="REGGI Logo"
          className="h-[36px] object-contain"
        />
      </a>
      
      <div className="flex items-center gap-[12px] md:gap-[16px]">
        {/* Cart Icon Button with Badge */}
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Open cart"
          className={`relative p-[10px] bg-greenDark/5 hover:bg-greenDark/10 active:scale-95 text-greenDark rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
            animateCart ? 'scale-125' : ''
          }`}
        >
          <svg
            className="w-[22px] h-[22px] stroke-greenDark fill-none stroke-[2]"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          
          {totalItems > 0 && (
            <span className={`absolute -top-[4px] -right-[4px] bg-redAccent text-white text-[11px] font-bold h-[20px] min-w-[20px] px-[5px] rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 ${
              animateCart ? 'scale-125' : 'scale-100'
            }`}>
              {totalItems}
            </span>
          )}
        </button>

        {/* SHOP REGGI Button */}
        <a
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('selectProductFilter', { detail: 'ALL' }));
            setTimeout(() => {
              const el = document.getElementById('products');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className="flex items-center gap-[8px] bg-gradient-to-b from-greenDark to-[#1F3621] text-white px-[16px] py-[8px] md:px-[22px] md:py-[10px] rounded-[18px] no-underline text-[13px] md:text-[14px] font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-card-hover"
        >
          <span className="hidden sm:inline">SHOP REGGI</span>
        </a>
      </div>
    </nav>
  );
}
