import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import CartDrawer from "@/components/CartDrawer";
import StoreInitializer from "@/components/StoreInitializer";
import { getProducts } from "@/lib/getProducts";

export default async function AboutPage() {
  const products = await getProducts();
  
  return (
    <main className="min-h-screen bg-cream text-textDark flex flex-col justify-between">
      <StoreInitializer products={products} />
      <Nav />
      
      <div className="flex-grow flex items-center justify-center py-[60px] px-[20px] md:py-[100px] md:px-[40px]">
        <div className="max-w-[800px] mx-auto text-center animate-reveal">
          <span className="font-cormorant inline-block text-amber tracking-[0.18em] text-[12px] md:text-[14px] font-bold uppercase mb-[16px]">
            Our Mission
          </span>
          
          <p className="font-dmSans text-textDark text-[16px] md:text-[18px] leading-[1.8] font-normal mb-[32px] md:mb-[40px] max-w-3xl mx-auto text-center">
            At REGGI, our mission is to redefine healthy eating by harnessing the power
            of nature&apos;s finest ingredients. We are committed to creating delicious, ready-to-eat health
            products made from nutrient-rich Elanthai (Indian Jujube) infused with carefully selected spice
            extracts that enhance both flavor and wellness. By blending ancient wisdom with modern
            nutrition, we aim to provide a wholesome, functional, and convenient snacking option that
            supports overall well-being, digestion, and immunity. Our goal is to make healthier choices
            accessible without compromising on taste, quality, or authenticity. At our core, we believe
            that food should not only nourish the body but also delight the senses, making every bite a
            journey toward vitality and balance.
          </p>
          
          <div className="border-t border-creamDark pt-[24px] max-w-[400px] mx-auto">
            <h3 className="font-cormorant text-[18px] md:text-[22px] font-bold text-redAccent italic leading-[1.4]">
              Rooted in Tradition, Driven by Wellness. The Heart of REGGI
            </h3>
          </div>
        </div>
      </div>
      
      <Footer />

      <CartDrawer />
    </main>
  );
}
