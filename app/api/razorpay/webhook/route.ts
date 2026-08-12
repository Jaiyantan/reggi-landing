import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Razorpay signature' }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('RAZORPAY_WEBHOOK_SECRET is missing');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyText)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // Only process payment.captured
    if (event.event === 'payment.captured') {
      const paymentPayload = event.payload.payment.entity;
      const razorpayOrderId = paymentPayload.order_id;
      const razorpayPaymentId = paymentPayload.id;

      if (!razorpayOrderId) {
        return NextResponse.json({ error: 'No order ID in payload' }, { status: 400 });
      }

      const { error } = await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'paid',
          razorpay_payment_id: razorpayPaymentId,
        })
        .eq('razorpay_order_id', razorpayOrderId);

      if (error) {
        console.error('Failed to update order payment status:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    }

    // Acknowledge other events without processing
    return NextResponse.json({ status: 'ok' }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
