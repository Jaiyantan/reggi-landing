import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Returns Policy – REGGI',
  description: 'Refund and Returns Policy for REGGI Jujube Superfood products.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-cream py-[80px] px-[24px]">
      <div className="max-w-[760px] mx-auto">
        <h1 className="font-cormorant text-[40px] md:text-[52px] font-bold text-textDark mb-[16px]">
          Refund &amp; Returns Policy
        </h1>
        <p className="text-textMid text-[14px] mb-[48px]">Last updated: July 2026</p>
        <div className="bg-white rounded-[20px] p-[40px] shadow-card">
          <p className="text-textMid text-[16px] leading-[1.8]">
            Content coming soon. We are currently drafting our Refund &amp; Returns Policy. Please check back later or contact us at{' '}
            <a href="mailto:info@reggi.in" className="text-greenDark font-semibold hover:underline">
              info@reggi.in
            </a>{' '}
            for any queries.
          </p>
        </div>
      </div>
    </main>
  );
}
