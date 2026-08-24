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

    if (quantity <= 0) {
      // Delete if quantity is 0 or less
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id)
        .eq('product_id', productId);
    } else {
      // Update quantity
      await supabaseAdmin
        .from('cart_items')
        .update({ quantity: quantity, updated_at: new Date().toISOString() })
        .eq('cart_id', cartData.id)
        .eq('product_id', productId);
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
      await supabaseAdmin
        .from('cart_items')
        .delete()
        .eq('cart_id', cartData.id)
        .eq('product_id', productId);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Cart Item DELETE Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
