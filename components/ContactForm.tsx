'use client';

import { useState } from 'react';

/* ─────────────────────────────────────────
   Official SVG social icons
───────────────────────────────────────── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = 'Name is required.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile Number is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err: any) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-[70px] xl:gap-[80px] items-start">
        {/* ── LEFT COLUMN: Brand Communication (~40%) ── */}
        <div className="lg:col-span-5 lg:pr-[20px]">
          <h1 className="font-cormorant text-[34px] sm:text-[42px] lg:text-[46px] font-bold text-textDark leading-[1.15] mb-[18px]">
            We’d Love To Hear From You!
          </h1>

          <p className="font-dmSans text-[15px] md:text-[16px] leading-[1.75] text-textMid mb-[36px] max-w-[480px]">
            Have a question about REGGI, need assistance with your order, or just want to say hello? We’re here to help. Reach out to us, and we’ll get back to you as soon as possible.
          </p>

          {/* Social Links */}
          <div className="mb-[36px]">
            <p className="font-dmSans text-[12px] font-bold tracking-[0.14em] uppercase text-amber mb-[14px]">
              Follow Us
            </p>
            <div className="flex items-center gap-[12px]">
              <a
                href="https://www.instagram.com/reggisuperfood/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REGGI on Instagram"
                className="w-[44px] h-[44px] rounded-full bg-white border border-[#D8D1C4] flex items-center justify-center text-[#234D32] hover:bg-[#234D32] hover:text-[#F8F4EA] hover:border-[#234D32] transition-all duration-200 shadow-sm"
              >
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576174051586"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REGGI on Facebook"
                className="w-[44px] h-[44px] rounded-full bg-white border border-[#D8D1C4] flex items-center justify-center text-[#234D32] hover:bg-[#234D32] hover:text-[#F8F4EA] hover:border-[#234D32] transition-all duration-200 shadow-sm"
              >
                <FacebookIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://www.youtube.com/@reggisuperfood"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REGGI on YouTube"
                className="w-[44px] h-[44px] rounded-full bg-white border border-[#D8D1C4] flex items-center justify-center text-[#234D32] hover:bg-[#234D32] hover:text-[#F8F4EA] hover:border-[#234D32] transition-all duration-200 shadow-sm"
              >
                <YouTubeIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://wa.me/917603922323"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REGGI on WhatsApp"
                className="w-[44px] h-[44px] rounded-full bg-white border border-[#D8D1C4] flex items-center justify-center text-[#234D32] hover:bg-[#234D32] hover:text-[#F8F4EA] hover:border-[#234D32] transition-all duration-200 shadow-sm"
              >
                <WhatsAppIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Direct Contact Info */}
          <div className="pt-[24px] border-t border-[#D8D1C4] space-y-[12px] font-dmSans text-[14px] text-textMid">
            <div>
              <span className="font-semibold text-textDark">Email: </span>
              <a href="mailto:info@reggi.in" className="hover:text-greenDark underline transition-colors">
                info@reggi.in
              </a>
            </div>
            <div>
              <span className="font-semibold text-textDark">Phone: </span>
              <a href="tel:+917603922323" className="hover:text-greenDark underline transition-colors">
                +91 76039 22323
              </a>
            </div>
            <div>
              <span className="font-semibold text-textDark">Location: </span>
              Porur, Chennai, Tamil Nadu – 600 125
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Contact Form (~60%) ── */}
        <div className="lg:col-span-7 lg:border-l lg:border-[#D8D1C4] lg:pl-[60px] xl:pl-[80px]">
          <h2 className="font-cormorant text-[30px] sm:text-[34px] lg:text-[38px] font-bold text-textDark leading-[1.2] mb-[24px] md:mb-[30px]">
            Get In Touch
          </h2>

          {isSuccess ? (
            <div className="bg-[#F0F5ED] border border-[#234D32]/20 rounded-[16px] p-[28px] md:p-[36px] text-center animate-reveal">
              <div className="w-[48px] h-[48px] rounded-full bg-[#234D32] text-[#F8F4EA] flex items-center justify-center mx-auto mb-[16px]">
                <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-cormorant text-[24px] font-bold text-[#234D32] mb-[8px]">
                Message Sent
              </h3>
              <p className="font-dmSans text-[15px] md:text-[16px] text-textMid leading-[1.6] mb-[24px]">
                Thanks for reaching out. We’ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="inline-flex items-center justify-center px-[22px] py-[10px] text-[14px] font-semibold text-[#234D32] bg-white border border-[#234D32]/30 rounded-[12px] hover:bg-[#234D32] hover:text-[#F8F4EA] transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-[18px]">
              {serverError && (
                <div className="p-[14px] bg-[#FDF2F2] border border-redAccent/30 rounded-[10px] text-redAccent text-[14px] font-medium">
                  {serverError}
                </div>
              )}

              {/* Row 1: Name and Mobile Number (same row on desktop, stacked on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] md:gap-[20px]">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[13px] md:text-[14px] font-semibold text-textDark mb-[6px]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full h-[56px] min-h-[56px] px-[18px] py-[14px] bg-[#FCFAF5] border rounded-[11px] text-[15px] md:text-[16px] text-textDark placeholder-[#A39B8B] transition-colors duration-150 focus:outline-none focus:border-[#234D32] ${
                      errors.name ? 'border-redAccent' : 'border-[#CFC8BA]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[12px] text-redAccent mt-[5px] font-medium">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-[13px] md:text-[14px] font-semibold text-textDark mb-[6px]"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full h-[56px] min-h-[56px] px-[18px] py-[14px] bg-[#FCFAF5] border rounded-[11px] text-[15px] md:text-[16px] text-textDark placeholder-[#A39B8B] transition-colors duration-150 focus:outline-none focus:border-[#234D32] ${
                      errors.phone ? 'border-redAccent' : 'border-[#CFC8BA]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[12px] text-redAccent mt-[5px] font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email (full width) */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-[13px] md:text-[14px] font-semibold text-textDark mb-[6px]"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-[56px] min-h-[56px] px-[18px] py-[14px] bg-[#FCFAF5] border rounded-[11px] text-[15px] md:text-[16px] text-textDark placeholder-[#A39B8B] transition-colors duration-150 focus:outline-none focus:border-[#234D32] ${
                    errors.email ? 'border-redAccent' : 'border-[#CFC8BA]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[12px] text-redAccent mt-[5px] font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Row 3: Message (full width) */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[13px] md:text-[14px] font-semibold text-textDark mb-[6px]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full min-h-[130px] px-[18px] py-[14px] bg-[#FCFAF5] border rounded-[11px] text-[15px] md:text-[16px] text-textDark placeholder-[#A39B8B] transition-colors duration-150 focus:outline-none focus:border-[#234D32] resize-y ${
                    errors.message ? 'border-redAccent' : 'border-[#CFC8BA]'
                  }`}
                />
                {errors.message && (
                  <p className="text-[12px] text-redAccent mt-[5px] font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-[8px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-[170px] h-[52px] min-h-[52px] bg-[#234D32] text-[#F8F4EA] rounded-[13px] text-[14px] md:text-[15px] font-semibold tracking-[0.04em] flex items-center justify-center hover:bg-[#1B3D27] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#234D32] focus-visible:ring-offset-2"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-[8px]">
                      <svg
                        className="animate-spin h-[16px] w-[16px] text-[#F8F4EA]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      SENDING...
                    </span>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
