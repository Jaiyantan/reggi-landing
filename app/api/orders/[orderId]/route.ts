import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('payment_status, total_amount, items')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      console.error('Order fetch error:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      paymentStatus: order.payment_status,
      totalAmount: order.total_amount,
      items: order.items,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Get order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
