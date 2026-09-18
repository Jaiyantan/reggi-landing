import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProducts } from '@/lib/getProducts';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us – REGGI',
  description: 'Have a question about REGGI or need assistance with your order? Reach out to our team.',
};

export default async function ContactPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow py-[60px] md:py-[80px] lg:py-[100px] px-[16px] sm:px-[24px] md:px-[40px]">
        <ContactForm />
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
