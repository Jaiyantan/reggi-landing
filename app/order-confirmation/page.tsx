'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [status, setStatus] = useState<'loading' | 'paid' | 'pending' | 'failed' | 'error'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (!orderId) {
      setStatus('error');
      return;
    }

    let pollCount = 0;
    const maxPolls = 10; // 3 seconds * 10 = 30 seconds
    let timeoutId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        
        const data = await response.json();
        setOrderDetails(data);

        if (data.paymentStatus === 'paid') {
          setStatus('paid');
          clearCart(); // Clear cart on success
        } else if (data.paymentStatus === 'failed') {
          setStatus('failed');
        } else if (data.paymentStatus === 'pending') {
          if (pollCount < maxPolls) {
            pollCount++;
            timeoutId = setTimeout(checkStatus, 3000);
          } else {
            setStatus('pending'); // Stay pending after max polls
          }
        }
      } catch (error) {
        console.error('Error checking order status:', error);
        setStatus('error');
      }
    };

    checkStatus();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [orderId, clearCart]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream pt-[120px] pb-[80px] flex flex-col items-center justify-center px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenDark mb-4"></div>
        <h1 className="font-cormorant text-[28px] font-bold text-greenDark text-center">
          Confirming your payment...
        </h1>
        <p className="text-[16px] text-textMid mt-2 text-center max-w-md">
          Please wait while we verify your transaction with our payment partner.
        </p>
      </div>
    );
  }

  if (status === 'paid') {
    return (
      <div className="min-h-screen bg-cream pt-[120px] pb-[80px] flex flex-col items-center justify-center px-4">
        <div className="text-[64px] mb-[24px]">✅</div>
        <h1 className="font-cormorant text-[36px] md:text-[48px] font-bold text-greenDark mb-[12px] text-center">
          Payment Successful!
        </h1>
        <p className="text-[14px] font-mono bg-creamDark/60 text-greenDark px-[16px] py-[8px] rounded-full mb-[16px] border border-creamDark">
          Order ID: {orderId}
        </p>
        <p className="text-[16px] text-textMid mb-[32px] text-center max-w-md leading-relaxed">
          Thank you for your purchase. We have received your payment and will begin processing your order immediately.
        </p>
        <Link 
          href="/"
          className="bg-greenDark text-white px-[32px] py-[16px] rounded-full text-[16px] font-bold hover:bg-greenMid transition-all shadow-md inline-block cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-cream pt-[120px] pb-[80px] flex flex-col items-center justify-center px-4">
        <div className="text-[64px] mb-[24px]">⏳</div>
        <h1 className="font-cormorant text-[32px] md:text-[40px] font-bold text-greenDark mb-[12px] text-center">
          Payment is still processing
        </h1>
        <p className="text-[14px] font-mono bg-creamDark/60 text-greenDark px-[16px] py-[8px] rounded-full mb-[16px] border border-creamDark">
          Order ID: {orderId}
        </p>
        <p className="text-[16px] text-textMid mb-[32px] text-center max-w-md leading-relaxed">
          We are still waiting for confirmation from our payment partner. This sometimes takes a few minutes. We'll notify you once it's confirmed.
        </p>
        <Link 
          href="/"
          className="bg-creamDark text-greenDark px-[32px] py-[16px] rounded-full text-[16px] font-bold hover:bg-cream/80 border border-greenDark/20 transition-all inline-block cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-[120px] pb-[80px] flex flex-col items-center justify-center px-4">
      <div className="text-[64px] mb-[24px]">❌</div>
      <h1 className="font-cormorant text-[36px] md:text-[48px] font-bold text-redAccent mb-[12px] text-center">
        Payment Failed
      </h1>
      <p className="text-[16px] text-textMid mb-[32px] text-center max-w-md leading-relaxed">
        Unfortunately, we could not process your payment or the request was invalid. Your cart is safe.
      </p>
      <Link 
        href="/checkout"
        className="bg-greenDark text-white px-[32px] py-[16px] rounded-full text-[16px] font-bold hover:bg-greenMid transition-all shadow-md inline-block cursor-pointer"
      >
        Return to Checkout
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream"></div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
