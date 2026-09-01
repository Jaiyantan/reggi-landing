import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  // Single Bottles
  {
    slug: 'cumin-ginger-chilli-bottle',
    flavour_type: 'Spicy',
    description: 'Bold, warm & spicy. A fiery Elanthai blend with cumin, ginger and chilli.'
  },
  {
    slug: 'ginger-garlic-chilli-bottle',
    flavour_type: 'Spicy',
    description: 'Aromatic and fiery. The perfect bold kick of ginger, garlic, and chilli.'
  },
  {
    slug: 'cardamom-bottle',
    flavour_type: 'Sweet',
    description: 'Elegant and fragrant. A naturally sweet blend where jujube meets cardamom.'
  },
  {
    slug: 'cardamom-cinnamon-clove-bottle',
    flavour_type: 'Sweet',
    description: 'Warm and deeply comforting. A spiced, sweet trio of cardamom, cinnamon, and clove.'
  },
  {
    slug: 'cardamom-cinnamon-ginger-bottle',
    flavour_type: 'Sweet',
    description: 'Sweet, spiced, and balanced. Warm cardamom and cinnamon with a gentle ginger zing.'
  },

  // Pouches
  {
    slug: 'cumin-ginger-chilli-pouch',
    flavour_type: 'Spicy',
    description: 'Bold, warm & spicy. A fiery Elanthai blend with cumin, ginger and chilli in a travel pouch.'
  },
  {
    slug: 'ginger-garlic-chilli-pouch',
    flavour_type: 'Spicy',
    description: 'Aromatic and fiery. The perfect bold kick of ginger, garlic, and chilli in a handy pouch.'
  },
  {
    slug: 'cardamom-pouch',
    flavour_type: 'Sweet',
    description: 'Elegant and fragrant. A naturally sweet blend where jujube meets cardamom in a travel pouch.'
  },
  {
    slug: 'cardamom-cinnamon-cloves-pouch',
    flavour_type: 'Sweet',
    description: 'Warm and deeply comforting. A spiced, sweet trio of cardamom, cinnamon, and clove in a handy pouch.'
  },
  {
    slug: 'cardamom-cinnamon-ginger-pouch',
    flavour_type: 'Sweet',
    description: 'Sweet, spiced, and balanced. Warm cardamom and cinnamon with a gentle ginger zing in a travel pouch.'
  },

  // Combos
  {
    slug: 'cumin-ginger-chilli-combo',
    flavour_type: 'Spicy',
    description: 'Bold, warm & spicy. Keep one at home and carry one everywhere.'
  },
  {
    slug: 'ginger-garlic-chilli-combo',
    flavour_type: 'Spicy',
    description: 'Aromatic and fiery. The perfect bold kick for your kitchen and your bag.'
  },
  {
    slug: 'cardamom-combo',
    flavour_type: 'Sweet',
    description: 'Elegant and fragrant. A sweet duo for effortless wellness at home and on the go.'
  },
  {
    slug: 'cardamom-cinnamon-cloves-combo',
    flavour_type: 'Sweet',
    description: 'Warm and deeply comforting. Double the spiced, sweet goodness in a value bundle.'
  },
  {
    slug: 'cardamom-cinnamon-ginger-combo',
    flavour_type: 'Sweet',
    description: 'Sweet, spiced, and balanced. A full bottle plus a travel pouch of our beloved sweet flavor.'
  },
  {
    slug: 'spicy-pouch-combo',
    flavour_type: 'Spicy',
    description: "Can't pick just one? The ultimate spice lover's starter kit featuring all heat-forward pouches."
  },
  {
    slug: 'sweet-pouch-combo',
    flavour_type: 'Sweet',
    description: 'All the aromatic, naturally sweet pouch flavors in one beautiful wellness bundle.'
  },
  {
    slug: '5-flavours-jar-combo',
    flavour_type: 'Sweet',
    description: 'The complete experience. All 5 signature flavors in one box for gifting or exploring.'
  }
];

async function run() {
  console.log('Starting product updates...');
  
  for (const update of updates) {
    const { data, error } = await supabase
      .from('products')
      .update({
        flavour_type: update.flavour_type,
        description: update.description,
        updated_at: new Date().toISOString()
      })
      .eq('slug', update.slug);
      
    if (error) {
      console.error(`❌ Failed to update ${update.slug}:`, error.message);
    } else {
      console.log(`✅ Updated ${update.slug}`);
    }
  }
  
  console.log('Done!');
}

run();
