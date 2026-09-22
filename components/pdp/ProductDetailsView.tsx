'use client';

import { Product } from '@/data/products';
import { getProductDetailData } from '@/data/productDetailContent';
import ProductGallery from './ProductGallery';
import ProductPurchaseSection from './ProductPurchaseSection';

interface ProductDetailsViewProps {
  product: Product;
}

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const detailData = getProductDetailData(product);

  return (
    <div className="max-w-[1240px] mx-auto px-[16px] sm:px-[24px] md:px-[40px] py-[24px] md:py-[48px]">
      {/* Main 2-Column Desktop / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] md:gap-[48px] lg:gap-[56px] items-start">
        
        {/* LEFT COLUMN: Product Image Gallery (50%) */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <ProductGallery
            images={detailData.galleryImages}
            productName={product.name}
          />
        </div>

        {/* RIGHT COLUMN: Product Information & Purchase (50%) */}
        <div className="lg:col-span-6 flex flex-col justify-start lg:sticky lg:top-[120px]">
          
          {/* Brand Header */}
          <div className="mb-[6px]">
            <span className="font-manrope text-[11px] md:text-[12px] font-bold tracking-[0.16em] uppercase text-amber">
              {detailData.brandTitle}
            </span>
          </div>

          {/* Product Title & Taste */}
          <h1 className="font-cormorant text-[30px] sm:text-[36px] md:text-[42px] font-bold text-textDark leading-[1.15] mb-[8px]">
            {detailData.flavourSubtitle}
          </h1>

          {/* Tagline */}
          <p className="font-manrope text-[14px] md:text-[15px] text-textMid italic mb-[16px] leading-[1.4]">
            {detailData.tagline}
          </p>

          {/* Price Block */}
          <div className="flex items-baseline gap-[10px] pb-[16px] border-b border-black/10">
            <span className="font-manrope text-[26px] md:text-[30px] font-extrabold text-greenDark leading-none">
              {product.priceCurrent}
            </span>
            {product.priceOriginal && (
              <span className="font-manrope text-[16px] text-textMid/60 line-through">
                {product.priceOriginal}
              </span>
            )}
            <span className="font-manrope text-[12px] text-textMid/80 ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Quantity Selector, Add to Cart & Buy Now */}
          <ProductPurchaseSection productId={product.id} />

          {/* Product Description Section */}
          <div className="pt-[16px] border-t border-black/10 flex flex-col gap-[20px] text-textDark">
            
            {/* Story Paragraphs */}
            <div className="flex flex-col gap-[12px] font-manrope text-[13px] md:text-[14px] leading-[1.65] text-textMid">
              {detailData.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Why you'll love REGGI */}
            <div>
              <h2 className="font-cormorant text-[20px] md:text-[22px] font-bold text-textDark mb-[10px]">
                Why you&apos;ll love REGGI
              </h2>
              <ul className="flex flex-col gap-[6px] font-manrope text-[13px] md:text-[14px] text-textMid">
                {detailData.whyYoullLove.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-[10px]">
                    <span className="text-greenDark font-bold mt-[1px]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect with */}
            <div className="bg-[#FAF7F0] p-[16px] rounded-[14px] border border-[#EBE4D5]">
              <h3 className="font-manrope text-[12px] font-bold uppercase tracking-[0.08em] text-greenDark mb-[6px]">
                Perfect with
              </h3>
              <p className="font-manrope text-[13px] text-textDark leading-[1.5]">
                {detailData.perfectWith}
              </p>
            </div>

            {/* Weight and Shelf Life Details */}
            <div className="grid grid-cols-2 gap-[12px] pt-[8px] pb-[16px] text-[12px] md:text-[13px] font-manrope text-textMid border-b border-black/5">
              <div>
                <span className="block font-bold text-textDark">Net Weight:</span>
                <span>{detailData.netWeight}</span>
              </div>
              <div>
                <span className="block font-bold text-textDark">Best before:</span>
                <span>{detailData.bestBefore}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
