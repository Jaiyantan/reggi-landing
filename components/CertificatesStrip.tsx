import React from 'react';

export const CERTIFICATION_BADGES = [
  {
    name: 'Vegan',
    icon: '/images/certificates/icon-vegan.png',
  },
  {
    name: 'Natural',
    icon: '/images/certificates/icon-natural.png',
  },
  {
    name: 'Gluten Free',
    icon: '/images/certificates/icon-gluten-free.png',
  },
  {
    name: 'FSSAI License',
    icon: '/images/certificates/icon-fssai.png',
  },
  {
    name: 'No Artificial Colours and Flavors',
    icon: '/images/certificates/icon-no-artificial.png',
  },
  {
    name: 'Certified by NABL Accredited Laboratories',
    icon: '/images/certificates/icon-nabl.png',
  },
];

interface CertificatesStripProps {
  variant?: 'standalone' | 'compact';
  className?: string;
}

export default function CertificatesStrip({
  variant = 'standalone',
  className = '',
}: CertificatesStripProps) {
  if (variant === 'compact') {
    return (
      <div className={`w-full ${className}`}>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-y-[16px] gap-x-[8px] sm:gap-x-[8px] md:gap-x-[10px] items-start justify-between w-full">
          {CERTIFICATION_BADGES.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group min-w-0">
              <div className="h-[32px] sm:h-[34px] md:h-[38px] flex items-center justify-center mb-[6px]">
                <img
                  src={badge.icon}
                  alt={badge.name}
                  className="h-[32px] sm:h-[34px] md:h-[38px] w-auto max-w-[42px] sm:max-w-[42px] md:max-w-[48px] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-dmSans text-[9.5px] sm:text-[9px] md:text-[9.5px] lg:text-[10px] font-medium text-textDark leading-[1.2] max-w-[90px] sm:max-w-[64px] md:max-w-[72px] break-words">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className={`w-full bg-cream py-[32px] md:py-[40px] px-[16px] sm:px-[20px] md:px-[40px] ${className}`}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-y-[24px] md:gap-y-[28px] gap-x-[8px] sm:gap-x-[12px] md:gap-[24px] lg:gap-[36px] items-start justify-center">
          {CERTIFICATION_BADGES.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="h-[40px] md:h-[60px] flex items-center justify-center mb-[8px] md:mb-[10px]">
                <img
                  src={badge.icon}
                  alt={badge.name}
                  className="h-[40px] md:h-[58px] w-auto max-w-[90px] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <span className="font-dmSans text-[11.5px] sm:text-[12px] md:text-[13px] font-medium text-textDark leading-[1.3] max-w-[130px]">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
