import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

export const parsePrice = (priceStr: string): number => {
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
};

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  products: Product[];
  
  // Actions
  setProducts: (products: Product[]) => void;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  // Derived state getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      products: [],

      setProducts: (products) => set({ products }),

      addItem: (productId: string, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === productId
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + quantity,
            };
            return { items: updated };
          } else {
            return {
              items: [...state.items, { productId, quantity }],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const product = get().products.find((p) => p.id === item.productId);
          if (!product) return total;
          const price = parsePrice(product.priceCurrent);
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'reggi-cart-storage',
      // Only persist items array to localStorage
      partialize: (state) => ({ items: state.items }),
    }
  )
);
