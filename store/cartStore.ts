import { create } from 'zustand';
import { Product } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
  product?: {
    name: string;
    image: string;
    priceCurrent: string;
    priceOriginal?: string;
  };
}

export const parsePrice = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
};

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  
  // Actions
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useCartStore = create<CartState>()(
  (set, get) => ({
    items: [],
    isDrawerOpen: false,
    totalItems: 0,
    totalPrice: 0,
    isLoading: false,

    fetchCart: async () => {
      set({ isLoading: true });
      try {
        const res = await fetch('/api/cart');
        if (res.ok) {
          const data = await res.json();
          set({
            items: data.items || [],
            totalItems: data.totalItems || 0,
            totalPrice: data.totalPrice || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch cart', error);
      } finally {
        set({ isLoading: false });
      }
    },

    addItem: async (productId: string, quantity = 1) => {
      set({ isLoading: true });
      try {
        await fetch('/api/cart/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });
        await get().fetchCart();
      } catch (error) {
        console.error('Failed to add item', error);
        set({ isLoading: false });
      }
    },

    removeItem: async (productId: string) => {
      set({ isLoading: true });
      try {
        await fetch(`/api/cart/items/${productId}`, {
          method: 'DELETE',
        });
        await get().fetchCart();
      } catch (error) {
        console.error('Failed to remove item', error);
        set({ isLoading: false });
      }
    },

    updateQuantity: async (productId: string, quantity: number) => {
      if (quantity <= 0) {
        return get().removeItem(productId);
      }
      set({ isLoading: true });
      try {
        await fetch(`/api/cart/items/${productId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        await get().fetchCart();
      } catch (error) {
        console.error('Failed to update quantity', error);
        set({ isLoading: false });
      }
    },

    clearCart: async () => {
      set({ isLoading: true });
      try {
        await fetch('/api/cart', { method: 'DELETE' });
        await get().fetchCart();
      } catch (error) {
        console.error('Failed to clear cart', error);
        set({ isLoading: false });
      }
    },

    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  })
);
