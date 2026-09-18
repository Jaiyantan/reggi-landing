import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProducts } from '@/lib/getProducts';

export const metadata: Metadata = {
  title: 'Return & Refund Policy – REGGI',
  description: 'Return and Refund Policy for REGGI.',
};

export default async function RefundPolicyPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow py-[48px] md:py-[80px] px-[16px] sm:px-[24px] md:px-[40px]">
        <div className="max-w-[840px] mx-auto bg-white/70 border border-[#E5DED0] rounded-[24px] p-[24px] sm:p-[36px] md:p-[56px] shadow-sm">
          <h1 className="font-cormorant text-[34px] sm:text-[40px] md:text-[48px] font-bold text-textDark leading-[1.15] mb-[28px] md:mb-[36px]">
            Return &amp; Refund Policy
          </h1>

          <div className="font-dmSans text-[15px] md:text-[16px] leading-[1.8] text-textDark/90">
            <ul className="list-disc pl-[24px] space-y-[16px]">
              <li>
                We are a small business and our products are home made and it is very difficult for us to accept returns since the product is perishable. We do not accept returns for any order.
              </li>
              <li>
                But If the item you have received is defected, report to us within 24 hours with photos by sending an email to <a href="mailto:info@reggi.in" className="text-greenDark underline hover:text-greenMid">info@reggi.in</a> (We take 2 business days to respond), and we will replace the product after verification. Please attach pictures or videos to show the item is defective.
              </li>
              <li>
                &nbsp;If you receive a damaged item or something you didn’t order, contact us within 24 hours . We’ll arrange a replacement or full refund, including return shipping costs.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
