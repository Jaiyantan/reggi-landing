'use client';

import React from 'react';

const MESSAGES = [
  'Free Shipping Across India',
  '100% Natural. No Preservatives. FSSAI Certified.',
  'Secure Payments. 100% Quality Assured.',
];

export default function AnnouncementBar() {
  // Repeat the 3 messages multiple times to form a continuous, seamless looping track
  const repeatedMessages = [...MESSAGES, ...MESSAGES, ...MESSAGES];

  return (
    <>
      {/* In-flow spacer so content/nav begins cleanly below the 36px fixed bar */}
      <div className="h-[36px] w-full shrink-0" aria-hidden="true" />

      <aside
        aria-label="Announcements"
        className="fixed top-0 left-0 right-0 z-[110] w-full h-[36px] bg-greenDark text-white overflow-hidden select-none border-b border-white/10"
      >
        <style>{`
          @keyframes marqueeScroll {
            0% {
              transform: translate3d(0, 0, 0);
            }
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .marquee-track {
            display: flex;
            width: max-content;
            animation: marqueeScroll 50s linear infinite;
            will-change: transform;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none;
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>

        <div className="h-[36px] flex items-center">
          <div className="marquee-track flex items-center">
            {/* Set 1 */}
            <div className="flex items-center shrink-0">
              {repeatedMessages.map((msg, index) => (
                <div key={`s1-${index}`} className="flex items-center">
                  <span className="font-dmSans text-[13px] font-medium text-white tracking-[0.01em] whitespace-nowrap px-[16px] sm:px-[28px] md:px-[44px]">
                    {msg}
                  </span>
                  <span
                    className="w-[3px] h-[3px] rounded-full bg-white/40 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* Set 2 (Exact duplicate for seamless -50% loop) */}
            <div className="flex items-center shrink-0" aria-hidden="true">
              {repeatedMessages.map((msg, index) => (
                <div key={`s2-${index}`} className="flex items-center">
                  <span className="font-dmSans text-[13px] font-medium text-white tracking-[0.01em] whitespace-nowrap px-[16px] sm:px-[28px] md:px-[44px]">
                    {msg}
                  </span>
                  <span
                    className="w-[3px] h-[3px] rounded-full bg-white/40 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
