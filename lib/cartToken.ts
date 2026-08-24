import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const CART_COOKIE_NAME = 'cart_token';

export async function resolveCartToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (token) {
    return token;
  }

  const newToken = crypto.randomUUID();

  const { error } = await supabaseAdmin
    .from('carts')
    .insert({ cart_token: newToken });

  if (error) {
    console.error('Error creating cart:', error);
    throw new Error('Failed to create cart');
  }

  cookieStore.set({
    name: CART_COOKIE_NAME,
    value: newToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: '/',
  });

  return newToken;
}

export async function getCartToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE_NAME)?.value;
}
