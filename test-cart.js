import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function test() {
  console.log('Testing insert...');
  
  // Create a cart
  const { data: cartData, error: cartError } = await supabaseAdmin
    .from('carts')
    .insert({ cart_token: 'test-token' })
    .select('id')
    .single();
    
  if (cartError) {
    console.error('Cart Error:', cartError);
  }
  
  if (cartData) {
    console.log('Cart inserted:', cartData);
    
    // Try to insert an item using a slug
    const { data: itemData, error: itemError } = await supabaseAdmin
      .from('cart_items')
      .insert({
        cart_id: cartData.id,
        product_id: 'spicy-chilli', // Slug
        quantity: 1
      });
      
    if (itemError) {
      console.error('Item Error:', itemError);
      
      // If it fails with uuid error, let's try getting the uuid of the product
      if (itemError.code === '22P02' || itemError.message.includes('uuid')) {
         const { data: pData } = await supabaseAdmin.from('products').select('id, slug').eq('slug', 'spicy-chilli').single();
         console.log('Product data:', pData);
      }
    } else {
      console.log('Item inserted successfully!');
    }
    
    // Cleanup
    await supabaseAdmin.from('carts').delete().eq('id', cartData.id);
  }
}

test();
