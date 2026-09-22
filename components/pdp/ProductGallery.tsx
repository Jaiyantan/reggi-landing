'use client';

import { useState, useRef } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 40;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && selectedIndex < images.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
    if (isRightSwipe && selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col gap-[16px] md:gap-[20px] w-full max-w-[560px] mx-auto lg:max-w-none">
      {/* Main Image Frame with rounded corners and navigation controls */}
      <div 
        className="group/gallery relative w-full aspect-square bg-white rounded-[20px] md:rounded-[24px] border border-black/5 flex items-center justify-center overflow-hidden shadow-sm select-none"
        style={{ aspectRatio: '1 / 1' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Main Product Image - fills card edge-to-edge with zero crop */}
        <img
          key={currentImage}
          src={currentImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          className="w-full h-full object-contain object-center transition-all duration-300 ease-in-out"
        />

        {/* Gallery Navigation Arrows (Previous / Next) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-[12px] md:left-[16px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-white/90 hover:bg-white text-textDark flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer border border-black/10 z-20 text-[20px] md:text-[24px] leading-none active:scale-95 backdrop-blur-xs"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-[12px] md:right-[16px] top-1/2 -translate-y-1/2 w-[38px] h-[38px] md:w-[44px] md:h-[44px] rounded-full bg-white/90 hover:bg-white text-textDark flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer border border-black/10 z-20 text-[20px] md:text-[24px] leading-none active:scale-95 backdrop-blur-xs"
            >
              ›
            </button>
          </>
        )}

        {/* Mobile Swipe Indicators / Dots with high-contrast backdrop pill */}
        {images.length > 1 && (
          <div className="absolute bottom-[14px] left-0 right-0 flex justify-center z-10 pointer-events-none md:hidden">
            <div className="flex items-center gap-[6px] bg-black/30 backdrop-blur-xs px-[10px] py-[5px] rounded-full pointer-events-auto">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`h-[6px] rounded-full transition-all duration-200 ${
                    selectedIndex === idx ? 'w-[18px] bg-white' : 'w-[6px] bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails Row (if multiple images) */}
      {images.length > 1 && (
        <div className="flex items-center gap-[10px] md:gap-[14px] overflow-x-auto pb-[6px] scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Select thumbnail ${idx + 1}`}
              className={`relative shrink-0 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] md:w-[84px] md:h-[84px] rounded-[14px] md:rounded-[16px] bg-white border transition-all duration-200 cursor-pointer overflow-hidden ${
                selectedIndex === idx
                  ? 'border-greenDark ring-2 ring-greenDark/20 shadow-sm'
                  : 'border-black/10 hover:border-greenDark/40 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
