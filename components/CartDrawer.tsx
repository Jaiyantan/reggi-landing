'use client';

import { useEffect, useState } from 'react';
import { useCartStore, parsePrice } from '@/store/cartStore';
import { products as staticProducts } from '@/data/products';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const isLoading = useCartStore((state) => state.isLoading);
  const lastAddedProductId = useCartStore((state) => state.lastAddedProductId);
  const justAdded = useCartStore((state) => state.justAdded);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when cart drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  const handleExplore = () => {
    closeDrawer();
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const displayItems = lastAddedProductId
    ? [...items].sort((a, b) => {
        if (a.productId === lastAddedProductId) return -1;
        if (b.productId === lastAddedProductId) return 1;
        return 0;
      })
    : items;

  if (!mounted || !isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Restrained Backdrop (transparent dark overlay, page remains visibly recognizable) */}
      <div
        className="fixed inset-0 bg-[rgba(23,32,24,0.38)] backdrop-blur-[1px] transition-opacity duration-300 animate-in fade-in cursor-pointer"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside 
        aria-label="Shopping Cart"
        className="relative w-full sm:w-[440px] md:w-[450px] max-w-full bg-[#F8F4EA] h-full shadow-2xl flex flex-col z-[1001] border-l border-[#E5DED0] animate-in slide-in-from-right duration-300"
      >
        {/* Header - Premium Ivory with Forest Green typography */}
        <div className="bg-[#F8F4EA] text-[#234D32] px-[24px] py-[20px] flex items-center justify-between border-b border-[#E5DED0] shrink-0">
          <div className="flex items-baseline gap-[10px]">
            <h2 className="font-cormorant text-[24px] md:text-[26px] font-bold text-[#234D32] tracking-[-0.01em] leading-none">
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="text-[13px] text-[#7A7265] font-sans font-medium">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="text-[#234D32] hover:opacity-70 min-w-[44px] min-h-[44px] p-[10px] -mr-[10px] transition-opacity cursor-pointer flex items-center justify-center rounded-md"
          >
            <svg
              className="w-[20px] h-[20px] stroke-current stroke-[2]"
              viewBox="0 0 24 24"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Added to Cart Confirmation Banner */}
        {justAdded && (
          <div className="bg-[#EBF3ED] text-[#234D32] border-b border-[#D4E5D8] px-[24px] py-[10px] flex items-center gap-[8px] shrink-0 animate-in fade-in duration-200">
            <span className="text-[14px] font-bold text-[#234D32]">✓</span>
            <span className="text-[13px] font-medium tracking-[0.01em]">Added to your cart</span>
          </div>
        )}

        {/* Content Body */}
        {items.length === 0 ? (
          /* Empty State - Editorial, compact, branded */
          <div className="flex-1 flex flex-col items-center justify-center px-[28px] py-[36px] text-center">
            {/* Editorial Product Imagery Cues (3 circular thumbnails) */}
            <div className="flex items-center justify-center -space-x-3 mb-[22px]" aria-hidden="true">
              <div className="w-[50px] h-[50px] rounded-full p-[3px] bg-[#F8F4EA] border border-[#E5DED0] shadow-sm z-10 shrink-0">
                <img
                  src="/images/jujubee_cumin_ginger_chilli.png"
                  alt=""
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
              <div className="w-[58px] h-[58px] rounded-full p-[3px] bg-[#F8F4EA] border border-[#E5DED0] shadow-sm z-20 shrink-0">
                <img
                  src="/images/jujubee_with-cardomom.png"
                  alt=""
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
              <div className="w-[50px] h-[50px] rounded-full p-[3px] bg-[#F8F4EA] border border-[#E5DED0] shadow-sm z-10 shrink-0">
                <img
                  src="/images/jujubee_ginger_garlic_chilli.png"
                  alt=""
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
            </div>

            {/* Empty State Typography */}
            <h3 className="font-cormorant font-bold text-[24px] md:text-[26px] text-[#234D32] leading-[1.25] mb-[10px] max-w-[300px]">
              Your cart is waiting for something delicious.
            </h3>
            <p className="text-[14px] text-[#5C5346] leading-[1.55] mb-[28px] max-w-[280px]">
              Discover your favourite REGGI flavour and make it yours.
            </p>

            {/* Primary CTA - Smooth scrolls to #products */}
            <button
              type="button"
              onClick={handleExplore}
              className="bg-[#234D32] text-[#F8F4EA] px-[32px] py-[13px] rounded-[14px] text-[13px] font-semibold tracking-[0.06em] hover:bg-[#1B3C27] active:scale-[0.98] transition-all cursor-pointer shadow-sm flex items-center gap-[8px]"
            >
              <span>EXPLORE REGGI</span>
              <span className="text-[15px] leading-none">→</span>
            </button>
          </div>
        ) : (
          /* Filled Cart State - Refined items list with clean dividers */
          <div className="flex-1 overflow-y-auto px-[24px] py-[12px] divide-y divide-[#E5DED0]">
            {displayItems.map((item) => {
              const product = item.product;
              if (!product) return null;

              const matched = staticProducts.find(
                (p) => p.id === item.productId || p.name === product.name
              );
              const variant = matched?.subCategoryTitle || matched?.category;
              const unitPrice = parsePrice(product.priceCurrent);
              const lineSubtotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="py-[18px] first:pt-[8px] last:pb-[16px] flex gap-[16px]"
                >
                  {/* Product Thumbnail */}
                  <div className="w-[72px] h-[72px] rounded-[12px] bg-white border border-[#E5DED0] p-[4px] shrink-0 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Product Details & Stepper */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-[10px]">
                      <div className="min-w-0">
                        <h4 className="font-cormorant font-bold text-[17px] text-[#234D32] leading-[1.25] truncate">
                          {product.name}
                        </h4>
                        {variant && (
                          <p className="text-[12px] text-[#7A7265] mt-[2px] font-medium tracking-[0.01em]">
                            {variant}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <span className="text-[15px] font-semibold text-[#234D32]">
                          ₹{lineSubtotal}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-[#8C8273]">
                            {product.priceCurrent} each
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bottom row: Quantity controls & Secondary remove */}
                    <div className="flex items-center justify-between mt-[12px]">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center border border-[#E5DED0] rounded-[10px] bg-white h-[38px] px-[2px]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={isLoading}
                          aria-label="Decrease quantity"
                          className="w-[34px] h-full flex items-center justify-center text-[#234D32] font-semibold text-[16px] hover:bg-[#F8F4EA] transition-colors rounded-[8px] disabled:opacity-40 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-[30px] text-center text-[13px] font-semibold text-[#234D32] select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={isLoading}
                          aria-label="Increase quantity"
                          className="w-[34px] h-full flex items-center justify-center text-[#234D32] font-semibold text-[16px] hover:bg-[#F8F4EA] transition-colors rounded-[8px] disabled:opacity-40 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Visually secondary remove action */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        disabled={isLoading}
                        aria-label={`Remove ${product.name} from cart`}
                        className="text-[14px] md:text-[15px] font-medium text-[#6F6A60] hover:text-[#234D32] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#234D32] focus-visible:rounded-[4px] transition-colors duration-200 cursor-pointer disabled:opacity-40 flex items-center gap-[6px] min-h-[38px] px-[8px] -mr-[8px]"
                      >
                        <svg
                          className="w-[17px] h-[17px] md:w-[18px] md:h-[18px] stroke-current stroke-[2] fill-none shrink-0"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer (Sticky) */}
        {items.length > 0 && (
          <div className="border-t border-[#E5DED0] bg-[#F8F4EA] px-[24px] py-[20px] shrink-0 space-y-[14px]">
            {/* Subtotal & accurate store shipping info */}
            <div className="space-y-[6px]">
              <div className="flex items-center justify-between text-[14px] text-[#5C5346]">
                <span className="font-medium">Subtotal</span>
                <span className="font-cormorant font-bold text-[22px] md:text-[24px] text-[#234D32] leading-none">
                  ₹{totalPrice}
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px] text-[#7A7265]">
                <span>Shipping</span>
                <span className="text-[#234D32] font-semibold">Free Delivery</span>
              </div>
            </div>

            {/* Action Buttons: 1. Continue Shopping (prominent primary nav), 2. Proceed to Checkout */}
            <div className="space-y-[11px] pt-[2px]">
              {/* 1. CONTINUE SHOPPING */}
              <button
                type="button"
                onClick={closeDrawer}
                className="w-full h-[54px] md:h-[56px] bg-[#F2F6F3] hover:bg-[#E5EFE7] text-[#234D32] border border-[#234D32] rounded-[14px] text-[15px] md:text-[16px] font-semibold tracking-[0.02em] cursor-pointer flex items-center justify-center gap-[8px] transition-all duration-200 active:scale-[0.99]"
              >
                <span className="text-[17px] leading-none">←</span>
                <span>Continue Shopping</span>
              </button>

              {/* 2. PROCEED TO CHECKOUT */}
              <button
                type="button"
                onClick={() => {
                  closeDrawer();
                  router.push('/checkout');
                }}
                className="w-full h-[54px] md:h-[56px] bg-[#234D32] hover:bg-[#1B3C27] text-[#F8F4EA] rounded-[14px] text-[15px] md:text-[16px] font-semibold tracking-[0.02em] cursor-pointer flex items-center justify-center gap-[8px] shadow-sm transition-all duration-200 active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <span className="text-[17px] leading-none">→</span>
              </button>
            </div>

            {/* Subtle Trust Line */}
            <div className="flex items-center justify-center gap-[6px] text-[12px] text-[#7A7265] pt-[2px]">
              <svg
                className="w-[13px] h-[13px] stroke-current stroke-[2] fill-none"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Secure checkout</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
