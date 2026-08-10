import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { products } from '../data/products.js';

// Load env vars
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function parsePrice(priceStr: string | undefined): number | null {
  if (!priceStr) return null;
  // Remove non-numeric characters except dot
  const numericStr = priceStr.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(numericStr);
  return isNaN(parsed) ? null : parsed;
}

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seed() {
  console.log('Seeding products...');
  
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const priceOriginal = parsePrice(p.priceOriginal);
    const priceCurrent = parsePrice(p.priceCurrent);
    
    if (priceCurrent === null) {
      console.warn(`Skipping product ${p.name} due to missing valid current price.`);
      continue;
    }
    
    const productData = {
      name: p.name,
      slug: p.id, // using the existing id from products.ts as slug as it's already URL safe
      category: p.category,
      description: p.description,
      perks: p.perks,
      image_url: p.image,
      price_original: priceOriginal,
      price_current: priceCurrent,
      is_active: true,
      sort_order: i * 10,
    };

    const { data, error } = await supabase
      .from('products')
      .upsert(productData, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Error inserting ${p.name}:`, error);
    } else {
      console.log(`✅ Inserted ${p.name}`);
    }
  }
  
  console.log('Seeding completed!');
}

seed().catch(console.error);
