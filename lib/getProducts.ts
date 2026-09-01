import { supabase } from './supabaseClient';
import { Product, products as staticProducts } from '@/data/products';

export interface DBProduct {
  id: string; // uuid in db, but we'll map slug -> id for frontend compatibility
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  category: 'Single Bottle' | 'Pouch Pack' | 'Combo' | string;
  description: string;
  perks: string[];
  image_url: string;
  price_original: number | null;
  price_current: number;
  is_active: boolean;
  sort_order: number;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data as DBProduct[]).map((p) => {
    const staticProduct = staticProducts.find(sp => sp.id === p.slug);
    // Reconstruct the logic for tags based on original logic or simple price comparison
    let tag: string | undefined;
    let tagEmoji: string = '⭐'; // default fallback

    if (p.price_original && p.price_original > p.price_current) {
      if (p.category === 'Combo') {
        tag = 'BEST VALUE';
      } else {
        tag = 'SALE';
      }
    }

    if (p.category === 'Single Bottle') tagEmoji = p.name.includes('Chilli') ? '🌶 Spicy' : '🌸 Aromatic';
    if (p.category === 'Pouch Pack') tagEmoji = '🎒 Pouch';
    if (p.category === 'Combo') tagEmoji = '🎁 Combo';

    return {
      id: p.slug, // Keep using slug as the ID for cart consistency
      category: p.category as any,
      subCategoryTitle: p.category, // Simplifying subCategoryTitle to category
      name: p.name,
      description: p.description,
      perks: p.perks,
      image: p.image_url,
      priceOriginal: p.price_original ? `₹${p.price_original}` : undefined,
      priceCurrent: `₹${p.price_current}`,
      flavour_type: staticProduct?.flavour_type,
      tag,
      tagEmoji,
    };
  });
}
