'use client';
import { Star, PlayCircle } from '@phosphor-icons/react';

type Testimonial = {
  type: 'text' | 'video';
  name: string;
  quote?: string;
  location?: string;
  avatar?: string;
  videoThumbnail?: string;
};

/* PLACEHOLDER TESTIMONIALS — mix of text and video formats */
const testimonials: Testimonial[] = [
  {
    type: 'text',
    name: 'Priya',
    location: 'Chennai',
    quote: 'My kids absolutely love this on their morning toast. It’s the perfect blend of sweet and tangy!',
    avatar: '/images/placeholder-avatar.jpg'
  },
  {
    type: 'video',
    name: 'Rahul',
    location: 'Bangalore',
    videoThumbnail: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=600'
  },
  {
    type: 'text',
    name: 'Anjali',
    location: 'Mumbai',
    quote: 'Finally, a spread that tastes authentic and has no artificial junk. It reminds me of my grandmother’s recipes.',
    avatar: '/images/placeholder-avatar.jpg'
  },
  {
    type: 'video',
    name: 'Vikram',
    location: 'Hyderabad',
    videoThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=600'
  },
  {
    type: 'text',
    name: 'Sneha',
    location: 'Pune',
    quote: 'A must-have in my pantry now. It goes well with dosas, chapathis, and even as a dip for snacks!',
    avatar: '/images/placeholder-avatar.jpg'
  }
];

export default function TestimonialsSection() {

  const renderCard = (testimonial: Testimonial, index: number) => {
    if (testimonial.type === 'video') {
      return (
        <div 
          key={index} 
          className="relative min-w-[240px] w-[65vw] md:w-[260px] h-[340px] md:h-[380px] flex-shrink-0 bg-[#121212] rounded-[20px] overflow-hidden shadow-card hover:-translate-y-[4px] hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
        >
          {/* Video Thumbnail Background */}
          <img 
            src={testimonial.videoThumbnail} 
            alt={`Video testimonial from ${testimonial.name}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          />
          {/* Gradient overlay for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[56px] h-[56px] rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
               <PlayCircle size={28} weight="fill" />
             </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-[20px] z-10 flex flex-col justify-end">
            <h4 className="font-dmSans font-bold text-[16px] md:text-[18px] text-white">{testimonial.name}</h4>
            <p className="text-[13px] text-white/70">{testimonial.location}</p>
          </div>
        </div>
      );
    }

    // Text Card
    return (
      <div 
        key={index} 
        className="min-w-[240px] w-[65vw] md:w-[260px] h-[340px] md:h-[380px] flex-shrink-0 bg-white rounded-[20px] p-[24px] md:p-[28px] shadow-card hover:-translate-y-[4px] hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="flex gap-[4px] mb-[20px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={18} weight="fill" className="text-amber" />
            ))}
          </div>
          <p className="font-dmSans text-[15px] md:text-[16px] text-textDark leading-[1.6] line-clamp-6">
            "{testimonial.quote}"
          </p>
        </div>
        
        <div className="flex items-center gap-[12px] pt-[16px] border-t border-creamDark">
          <div className="w-[44px] h-[44px] rounded-full bg-greenPale flex items-center justify-center overflow-hidden flex-shrink-0 relative">
             <span className="text-textLight text-[9px] uppercase font-bold tracking-wider absolute text-center leading-tight">Avatar</span>
          </div>
          <div>
            <h4 className="font-dmSans font-bold text-[15px] text-greenDark">{testimonial.name}</h4>
            <p className="text-[12px] text-textMid">{testimonial.location}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-[50px] md:py-[90px] bg-transparent animate-reveal">
      <div className="max-w-[1200px] mx-auto px-[20px] md:px-[40px]">
        <div className="text-center mb-[48px] md:mb-[64px]">
          <div>
            <h2 className="font-cormorant text-[clamp(32px,4vw,48px)] font-bold text-textDark leading-[1.2]">
              Real People, Real Love
            </h2>
            <p className="text-[16px] text-textMid mt-[12px]">
              Here's how our customers enjoy REGGI!
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="w-full relative pb-[32px] md:pb-[16px]">
        <style>{`
          @keyframes testimonialMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .testimonial-marquee-track {
            animation: testimonialMarquee 40s linear infinite;
          }
          .testimonial-marquee-wrapper {
            overflow: hidden;
          }
          
          .testimonial-marquee-track:hover {
            animation-play-state: paused;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .testimonial-marquee-track {
              animation: none !important;
              transform: none !important;
            }
            .testimonial-marquee-wrapper {
              overflow-x: auto !important;
            }
          }
        `}</style>
        
        <div className="flex hide-scrollbar testimonial-marquee-wrapper py-[10px] -my-[10px]">
          <div className="flex w-max testimonial-marquee-track">
            {/* Set 1 */}
            <div className="flex gap-[24px] px-[12px]">
              {testimonials.map((testimonial, index) => renderCard(testimonial, index))}
            </div>
            
            {/* Set 2 (Duplicate for Seamless Loop) */}
            <div className="flex gap-[24px] px-[12px]">
              {testimonials.map((testimonial, index) => renderCard(testimonial, index))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
