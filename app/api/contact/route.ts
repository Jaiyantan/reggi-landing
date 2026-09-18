import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body || {};

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json(
        { error: 'Mobile Number is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    const cleanData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      created_at: new Date().toISOString(),
    };

    // Store in Supabase if available
    try {
      const { error } = await supabaseAdmin
        .from('contact_enquiries')
        .insert([cleanData]);

      if (error) {
        // Fallback check for alternative table name
        const { error: error2 } = await supabaseAdmin
          .from('enquiries')
          .insert([cleanData]);

        if (error2) {
          console.warn('[Contact API] DB insert fallback notice:', error2.message);
        }
      }
    } catch (dbErr: any) {
      console.warn('[Contact API] DB handling note:', dbErr?.message || dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out. We’ll get back to you soon.",
    });
  } catch (error: any) {
    console.error('[Contact API] Error handling contact submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
