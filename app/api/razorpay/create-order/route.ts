import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Fetch the order from Supabase
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error || !order) {
      console.error('Order not found or fetch error:', error);
      return NextResponse.json({ error: 'Order not found' }, { status: 400 });
    }

    if (order.payment_status === 'paid') {
      return NextResponse.json({ error: 'Order is already paid' }, { status: 400 });
    }

    // Create a Razorpay instance
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('Razorpay keys are missing in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create a Razorpay order
    // Razorpay expects amount in the smallest currency unit (paise)
    const amountInPaise = Math.round(order.total_amount * 100);

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.id.toString(),
    });

    if (!razorpayOrder || !razorpayOrder.id) {
      throw new Error('Failed to create Razorpay order');
    }

    // Update the Supabase order with the Razorpay order ID
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ razorpay_order_id: razorpayOrder.id })
      .eq('id', order.id);

    if (updateError) {
      console.error('Failed to update Supabase order with Razorpay order ID:', updateError);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    // Return the required information to the client
    return NextResponse.json(
      {
        razorpayOrderId: razorpayOrder.id,
        amount: amountInPaise,
        currency: 'INR',
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Create Razorpay order error:', error);
    return NextResponse.json(
      { error: 'Internal server error while creating payment order' },
      { status: 500 }
    );
  }
}
