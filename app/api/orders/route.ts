import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { resolveCartToken } from '@/lib/cartToken';
import { INDIAN_STATES_AND_UTS } from '@/data/indianStates';

const parsePrice = (priceStr: string | number | null): number => {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  const numeric = priceStr.replace(/[^0-9]/g, '');
  return numeric ? parseInt(numeric, 10) : 0;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items } = body || {};

    if (!customer || typeof customer !== 'object') {
      return NextResponse.json(
        { error: 'Customer details are required.' },
        { status: 400 }
      );
    }

    const { name, email, phone, addressLine, city, state, pincode } = customer;

    // Validate Customer Name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Full Name must be at least 2 characters.' },
        { status: 400 }
      );
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    // Validate Phone (10 digits)
    const rawPhone = typeof phone === 'string' ? phone.replace(/^\+91/, '').trim() : '';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(rawPhone)) {
      return NextResponse.json(
        { error: 'Phone number must be a valid 10-digit number.' },
        { status: 400 }
      );
    }
    const formattedPhone = `+91${rawPhone}`;

    // Validate Address Line
    if (!addressLine || typeof addressLine !== 'string' || addressLine.trim().length < 5) {
      return NextResponse.json(
        { error: 'Address line must be at least 5 characters.' },
        { status: 400 }
      );
    }

    // Validate City
    if (!city || typeof city !== 'string' || city.trim().length < 2) {
      return NextResponse.json(
        { error: 'City must be at least 2 characters.' },
        { status: 400 }
      );
    }

    // Validate State
    if (!state || !INDIAN_STATES_AND_UTS.includes(state as any)) {
      return NextResponse.json(
        { error: 'Please select a valid Indian State or Union Territory.' },
        { status: 400 }
      );
    }

    // Validate Pincode
    const pincodeRegex = /^[0-9]{6}$/;
    if (!pincode || typeof pincode !== 'string' || !pincodeRegex.test(pincode.trim())) {
      return NextResponse.json(
        { error: 'Pincode must be exactly 6 digits.' },
        { status: 400 }
      );
    }

    const token = await resolveCartToken();
    const { data: cartData } = await supabaseAdmin
      .from('carts')
      .select('id')
      .eq('cart_token', token)
      .single();

    if (!cartData) {
      return NextResponse.json(
        { error: 'Cart not found.' },
        { status: 404 }
      );
    }

    const { data: cartItems } = await supabaseAdmin
      .from('cart_items')
      .select(`
        quantity,
        product_id,
        products (
          name,
          price_current,
          is_active
        )
      `)
      .eq('cart_id', cartData.id);

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty.' },
        { status: 400 }
      );
    }

    let calculatedTotalAmount = 0;
    const itemSnapshots = [];

    for (const item of cartItems) {
      const product = item.products as any;
      if (!product || product.is_active === false) continue;

      const unitPrice = parsePrice(product.price_current);
      calculatedTotalAmount += unitPrice * item.quantity;

      itemSnapshots.push({
        productId: item.product_id,
        name: product.name,
        price: unitPrice,
        quantity: item.quantity,
      });
    }

    if (itemSnapshots.length === 0) {
      return NextResponse.json(
        { error: 'No valid products in cart.' },
        { status: 400 }
      );
    }

    // Insert into Supabase using Admin client
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name: name.trim(),
        customer_email: email.trim().toLowerCase(),
        customer_phone: formattedPhone,
        customer_address_line: addressLine.trim(),
        customer_city: city.trim(),
        customer_state: state,
        customer_pincode: pincode.trim(),
        items: itemSnapshots,
        total_amount: calculatedTotalAmount,
        payment_status: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase Orders Insert Error:', error);
      return NextResponse.json(
        { error: 'Failed to create order. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { orderId: data.id },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Order API error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing order.' },
      { status: 500 }
    );
  }
}
