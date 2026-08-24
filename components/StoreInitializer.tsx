'use client';

import { Product } from '@/data/products';

export default function StoreInitializer({ products }: { products: Product[] }) {
  // Products are now fetched server-side for cart integration,
  // so we no longer need to initialize client state here.
  return null;
}
