import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import StoreInitializer from '@/components/StoreInitializer';
import { getProductById, getProducts, getAllProductIds } from '@/lib/getProducts';
import ProductDetailsView from '@/components/pdp/ProductDetailsView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllProductIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found – REGGI',
    };
  }

  return {
    title: `${product.name} – REGGI Jujube Superfruit`,
    description: product.description,
    openGraph: {
      title: `${product.name} – REGGI`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([
    getProductById(id),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F4EA] text-textDark flex flex-col justify-between">
      <StoreInitializer products={allProducts} />
      <AnnouncementBar />
      <Nav />

      <div className="flex-grow">
        <ProductDetailsView product={product} />
      </div>

      <Footer />
      <CartDrawer />
    </main>
  );
}
