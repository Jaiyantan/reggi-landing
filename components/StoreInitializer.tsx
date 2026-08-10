'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/data/products';

export default function StoreInitializer({ products }: { products: Product[] }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCartStore.getState().setProducts(products);
      initialized.current = true;
    }
  }, [products]);

  return null;
}
