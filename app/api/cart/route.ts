import { NextResponse } from 'next/server';
import { resolveCartToken } from '@/lib/cartToken';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const parsePrice = (priceStr: string | number | null): number => {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
};

export async function GET() {
  try {
    const token = await resolveCartToken();

    // Get the cart ID first
    const { data: cartData, error: cartError } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('cart_token', token)
      .single();

    if (cartError || !cartData) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cartId = cartData.id;

    // Fetch cart items joined with products
    const { data: itemsData, error: itemsError } = await supabaseAdmin
      .from('cart_items')
      .select(`
        id,
        quantity,
        product_id,
        products (
          name,
          image_url,
          price_current,
          price_original,
          is_active
        )
      `)
      .eq('cart_id', cartId);

    if (itemsError) {
      console.error('Error fetching cart items:', itemsError);
      return NextResponse.json({ error: 'Failed to fetch cart items' }, { status: 500 });
    }

    const validItems = [];
    let totalItems = 0;
    let totalPrice = 0;

    for (const item of (itemsData || [])) {
      const product = item.products as any;
      
      // Cleanup logic: If product doesn't exist or is inactive, delete the cart_item
      if (!product || product.is_active === false) {
        await supabaseAdmin
          .from('cart_items')
          .delete()
          .eq('id', item.id);
        continue; // Skip this item
      }

      // Add to valid items and compute totals
      validItems.push({
        productId: item.product_id,
        quantity: item.quantity,
        product: {
          name: product.name,
          image: product.image_url,
          priceCurrent: `₹${product.price_current}`,
          priceOriginal: product.price_original ? `₹${product.price_original}` : undefined,
        }
      });
      
      totalItems += item.quantity;
      totalPrice += (product.price_current || 0) * item.quantity;
    }

    return NextResponse.json({
      items: validItems,
      totalItems,
      totalPrice,
    });

  } catch (error: any) {
    console.error('Cart GET Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const token = await resolveCartToken();

    const { data: cartData } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('cart_token', token)
      .single();

    if (cartData) {
      // Delete all items for this cart
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
