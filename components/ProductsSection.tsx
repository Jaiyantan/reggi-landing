import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface CategoryGroup {
  category: Product['category'];
  title: string;
}

const categoryGroups: CategoryGroup[] = [
  { category: 'Single Bottle', title: 'Single Bottles' },
  { category: 'Pouch Pack', title: 'Pouches' },
  { category: 'Combo', title: 'Combo Packs' },
];

export default function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="py-[50px] px-[20px] md:py-[80px] md:px-[40px] max-w-[1200px] mx-auto animate-reveal">
      <div className="text-center mb-[48px]">
        <div className="inline-block text-[11px] tracking-[0.14em] uppercase text-amber font-bold mb-[12px]">
          Our Collection
        </div>
        <h2 className="font-cormorant text-[clamp(28px,4vw,40px)] font-bold text-greenDark leading-[1.2]">
          Choose Your <span className="text-redAccent">REGGI</span>
        </h2>

      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[28px]">
        {categoryGroups.map((group) => {
          const groupProducts = products.filter((p) => p.category === group.category);
          if (groupProducts.length === 0) return null;

          return (
            <div key={group.category} className="col-span-full contents">
              <div className="col-span-full flex items-center gap-[16px] my-[16px] mb-[4px] category-divider-line">
                <h3 className="font-cormorant text-[26px] md:text-[28px] font-bold text-redAccent whitespace-nowrap">
                  {group.title}
                </h3>
              </div>
              {groupProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
