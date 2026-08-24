import { NextResponse } from 'next/server';
import { resolveCartToken } from '@/lib/cartToken';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const { productId, quantity = 1 } = await request.json();

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ error: 'Invalid productId or quantity' }, { status: 400 });
    }

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

    // Check if item already exists
    const { data: existingItem } = await supabaseAdmin
      .from('cart_items')
      .select('id, quantity')
      .eq('cart_id', cartData.id)
      .eq('product_id', productId)
      .maybeSingle();

    if (existingItem) {
      // Increment quantity
      const newQuantity = existingItem.quantity + quantity;
      await supabaseAdmin
        .from('cart_items')
        .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
        .eq('id', existingItem.id);
    } else {
      // Insert new item
      await supabaseAdmin
        .from('cart_items')
        .insert({
          cart_id: cartData.id,
          product_id: productId,
          quantity: quantity,
        });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart Items POST Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
