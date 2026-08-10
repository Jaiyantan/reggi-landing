'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cartStore';

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const openDrawer = useCartStore((state) => state.openDrawer);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between bg-cream border-b border-creamDark px-[20px] py-[6px] md:px-[40px] md:py-[8px] shadow-nav">
      <a href="#" className="flex items-center gap-[10px] no-underline">
        <img
          src="https://www.reggi.in/wp-content/uploads/2025/02/668504c8e4-REGGI-LOGO-NEW-for-trademark-2.jpg"
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

        {/* View Catalogue Button */}
        <a
          href="https://wa.me/c/917603922323"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-[8px] bg-gradient-to-b from-greenDark to-[#1F3621] text-white px-[16px] py-[8px] md:px-[22px] md:py-[10px] rounded-[18px] no-underline text-[13px] md:text-[14px] font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-95 shadow-sm hover:shadow-card-hover"
        >
          <svg className="w-[18px] h-[18px] fill-whatsapp" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:inline">View Catalogue</span>
        </a>
      </div>
    </nav>
  );
}
