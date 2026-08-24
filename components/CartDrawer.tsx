'use client';

import { useEffect, useState } from 'react';
import { useCartStore, parsePrice } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const isLoading = useCartStore((state) => state.isLoading);
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

  if (!mounted || !isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Semi-transparent Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full sm:w-[440px] max-w-full bg-cream h-full shadow-2xl flex flex-col z-[1001] border-l border-creamDark animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-greenDark text-cream px-[20px] py-[16px] flex items-center justify-between border-b border-greenMid">
          <h2 className="font-cormorant text-[24px] font-bold text-cream tracking-[0.01em]">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart"
            className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-cream/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <svg
              className="w-[20px] h-[20px] stroke-current stroke-[2.5]"
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

        {/* Content Body */}
        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-[32px] text-center">
            <div className="text-[54px] mb-[16px] animate-bounce">🫙</div>
            <h3 className="font-cormorant text-[24px] font-bold text-greenDark mb-[8px]">
              Your cart is empty
            </h3>
            <p className="text-[14px] text-textMid leading-[1.6] mb-[28px] max-w-[260px]">
              Looks like you haven&apos;t added any REGGI superfood dips or combos yet.
            </p>
            <button
              type="button"
              onClick={closeDrawer}
              className="bg-greenDark text-white px-[28px] py-[12px] rounded-full text-[14px] font-bold hover:bg-greenMid transition-all cursor-pointer shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-[20px] space-y-[16px]">
            {items.map((item) => {
              const product = item.product;
              if (!product) return null;

              const unitPrice = parsePrice(product.priceCurrent);
              const subtotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-[16px] p-[14px] border border-creamDark shadow-sm flex items-center gap-[14px]"
                >
                  {/* Thumbnail */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[64px] h-[64px] object-cover rounded-[12px] bg-cream shrink-0 border border-creamDark/60"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-cormorant font-bold text-[16px] text-greenDark truncate leading-[1.2]">
                      {product.name}
                    </h4>
                    <p className="text-[12px] text-textMid mt-[2px]">
                      {product.priceCurrent} each
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-[10px] mt-[10px]">
                      <div className="flex items-center border border-creamDark rounded-full bg-cream px-[4px] py-[2px]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={isLoading}
                          aria-label="Decrease quantity"
                          className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-greenDark font-bold hover:bg-creamDark transition-colors cursor-pointer text-[14px] disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-[28px] text-center text-[13px] font-semibold text-greenDark">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          disabled={isLoading}
                          aria-label="Increase quantity"
                          className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-greenDark font-bold hover:bg-creamDark transition-colors cursor-pointer text-[14px] disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        disabled={isLoading}
                        aria-label="Remove item"
                        className="text-textLight hover:text-redAccent p-[4px] transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <svg
                          className="w-[16px] h-[16px] stroke-current stroke-[2] fill-none"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Line Item Subtotal */}
                  <div className="text-right shrink-0">
                    <span className="text-[15px] font-bold text-greenDark">
                      ₹{subtotal}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer (Sticky) */}
        {items.length > 0 && (
          <div className="border-t border-creamDark p-[20px] bg-white space-y-[16px] shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-textMid font-medium">Total Amount</span>
              <span className="font-cormorant text-[26px] font-bold text-greenDark">
                ₹{totalPrice}{' '}
                <span className="text-[12px] font-normal text-textMid">incl. GST</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                closeDrawer();
                router.push('/checkout');
              }}
              className="w-full bg-gradient-to-b from-greenDark to-[#1E3821] text-white shadow-sm transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-order-btn-hover active:scale-95 py-[14px] px-[24px] rounded-[18px] text-[16px] font-bold cursor-pointer flex items-center justify-center gap-[8px]"
            >
              Buy Now
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
