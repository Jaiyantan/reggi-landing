import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProducts } from '@/lib/getProducts';

export const metadata: Metadata = {
  title: 'Shipping & Payment Policy – REGGI',
  description: 'Shipping and Payment Policy for REGGI.',
};

export default async function ShippingPolicyPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow py-[48px] md:py-[80px] px-[16px] sm:px-[24px] md:px-[40px]">
        <div className="max-w-[840px] mx-auto bg-white/70 border border-[#E5DED0] rounded-[24px] p-[24px] sm:p-[36px] md:p-[56px] shadow-sm">
          <h1 className="font-cormorant text-[34px] sm:text-[40px] md:text-[48px] font-bold text-textDark leading-[1.15] mb-[28px] md:mb-[36px]">
            Shipping &amp; Payment Policy
          </h1>

          <div className="font-dmSans text-[15px] md:text-[16px] leading-[1.8] text-textDark/90 space-y-[20px]">
            <p>
              We at REGGI&nbsp; are committed to delivering your orders quickly and securely. Please read our shipping policy carefully to understand how your orders will be processed and shipped.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              1. Processing Time:
            </h2>
            <p>
              All orders are processed within 2-3 business days. Bulk orders may take longer, and we will notify you of the expected timeline upon order confirmation. Orders placed after 3 PM will be processed the next business day. During peak seasons or sales, processing may take slightly longer, but we’ll keep you informed. Order Processing may exceed depending upon any natural calamities, national holidays and any unforeseen circumstances beyond our control
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              2. Shipping Rates Delivery:
            </h2>
            <p>
              Shipping charges are calculated at checkout based on your location and the weight of your order. We aim to keep shipping costs affordable while ensuring the safe delivery of our products
            </p>
            <p>
              Domestic Delivery (within India): Typically takes 5-7 business days.
            </p>
            <p>
              International Delivery: Delivery time varies based on the destination and may take between 10-20 business days. Please note that customs duties and taxes, if applicable, are the responsibility of the customer.
            </p>
            <p>
              Shipping times begin once your order is dispatched, not when the order is placed.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              3. Incorrect Address or Delivery Failure
            </h2>
            <p>
              Please double-check your shipping address before submitting your order. If a delivery fails due to an incorrect address or unavailability to receive, we may charge for re-delivery.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              4.Tracking Information:
            </h2>
            <p>
              Once your order is shipped, we will provide a tracking number via email or whatsapp. You can use this to track your order on the shipping provider’s website.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              5. Lost or Damaged Packages
            </h2>
            <p>
              If your package is lost or arrives damaged, notify us within 24 hours of receipt. We will file a claim with the courier and work to replace or refund your order as appropriate.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              PAYMENT
            </h2>
            <p>
              We want you to be 100% happy with every toy you order. Our payment policy is designed to be simple, transparent, and customer-friendly.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              1. Accepted Payment Methods
            </h2>
            <p>
              We accept the following:
            </p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Major credit/debit cards (Visa, MasterCard, American Express, etc.)</li>
              <li>PayPal and other trusted payment gateways</li>
              <li>Mobile wallets and UPI (if applicable)</li>
              <li>Cash On Delivery&nbsp;</li>
            </ul>
            <p>
              All transactions are encrypted and securely processed through PCI-compliant gateways.
            </p>
            <p>
              No card details are shared with any third party.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              2. Order Confirmation
            </h2>
            <p>
              After successful payment, you’ll receive an email confirmation with your order summary. If you do not receive a confirmation within 24 hours, please check your spam folder or contact our support team.
            </p>

            <h2 className="font-cormorant text-[24px] md:text-[28px] font-bold text-textDark pt-[16px]">
              3. Cancellations
            </h2>
            <p>
              You may cancel your order within 2 hours of placing it, provided it has not been dispatched. Once an item is shipped, cancellations are no longer possible.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
