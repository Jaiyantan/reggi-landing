import Nav from "@/components/Nav";
import { getProducts } from "@/lib/getProducts";
import StoreInitializer from "@/components/StoreInitializer";
import Hero from "@/components/Hero";
import WhySection from "@/components/WhySection";
import EnjoySection from "@/components/EnjoySection";
import ProductsSection from "@/components/ProductsSection";
import JujubeSection from "@/components/JujubeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";

import CartDrawer from "@/components/CartDrawer";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-cream text-textDark">
      <StoreInitializer products={products} />
      <Nav />
      <Hero />
      <WhySection />
      <EnjoySection />
      <ProductsSection products={products} />
      <TestimonialsSection />
      <JujubeSection />
      <FinalCtaSection />
      <Footer />

      <CartDrawer />
    </main>
  );
}
