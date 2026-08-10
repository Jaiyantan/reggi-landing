import Nav from "@/components/Nav";
import { getProducts } from "@/lib/getProducts";
import StoreInitializer from "@/components/StoreInitializer";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import WhySection from "@/components/WhySection";
import JujubeSection from "@/components/JujubeSection";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import FloatingWhatsappButton from "@/components/FloatingWhatsappButton";
import CartDrawer from "@/components/CartDrawer";

export default async function Home() {
  const products = await getProducts();
  return (
    <main className="min-h-screen bg-cream text-textDark">
      <StoreInitializer products={products} />
      <Nav />
      <Hero />
      <ProductsSection products={products} />
      <WhySection />
      <JujubeSection />
      {/* <CtaBand /> */}
      <Footer />
      <FloatingWhatsappButton />
      <CartDrawer />
    </main>
  );
}
