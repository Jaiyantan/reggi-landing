import { NextResponse } from 'next/server';
import { resolveCartToken } from '@/lib/cartToken';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const { quantity } = await request.json();

    if (!productId || typeof quantity !== 'number') {
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

    // Look up the actual product UUID using the slug
    const { data: productData, error: productError } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('slug', productId)
      .single();

    if (productError || !productData) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const realProductId = productData.id;

    if (quantity <= 0) {
      // Delete if quantity is 0 or less
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id)
        .eq('product_id', realProductId);
    } else {
      // Update quantity
      await supabaseAdmin
        .from('cart_items')
        .update({ quantity: quantity, updated_at: new Date().toISOString() })
        .eq('cart_id', cartData.id)
        .eq('product_id', realProductId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart Item PATCH Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    if (!productId) {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 });
    }

    const token = await resolveCartToken();

    const { data: cartData } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('cart_token', token)
      .single();

    if (cartData) {
      // Look up the actual product UUID using the slug
      const { data: productData } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('slug', productId)
        .single();

      if (productData) {
        await supabaseAdmin
          .from('cart_items')
          .delete()
          .eq('cart_id', cartData.id)
          .eq('product_id', productData.id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart Item DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
