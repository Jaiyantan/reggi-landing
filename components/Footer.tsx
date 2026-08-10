"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────
   Inline SVG social icons
   (lucide-react doesn't ship these brands)
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

/* ─────────────────────────────────────────
   Reusable micro-components
───────────────────────────────────────── */

/** Serif all-caps column heading with amber warm accent */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-cormorant text-amberLight text-xl font-bold uppercase tracking-[0.14em] mb-[20px]">
      {children}
    </h3>
  );
}

/** Muted sub-section label inside a column */
function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-white/45 text-[11px] font-semibold uppercase tracking-[0.12em] mb-[12px] mt-[22px] first:mt-0">
      {children}
    </p>
  );
}

/** Standard footer link — warm off-white cream text with amber hover */
function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-cream/90 text-sm leading-snug mb-[12px] no-underline
                   hover:text-amberLight transition-colors duration-200"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="block text-cream/90 text-sm leading-snug mb-[12px] no-underline
                 hover:text-amberLight transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

/** Social icon button — subtle filled circle with amber hover highlight */
function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-[36px] h-[36px] rounded-full bg-greenMid/40 border border-white/10 flex items-center
                 justify-center text-cream/80 hover:text-white hover:border-amberLight
                 hover:bg-amber transition-all duration-200"
    >
      {children}
    </a>
  );
}

/** Contact row: icon chip + cream text */
function ContactRow({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const inner = (
    <div className="flex items-start gap-[11px]">
      <span
        className="mt-[1px] shrink-0 w-[30px] h-[30px] rounded-full
                   bg-greenMid/50 border border-greenLight/30
                   flex items-center justify-center icon-chip transition-colors duration-200"
      >
        {icon}
      </span>
      <span className="pt-[5px] text-sm leading-[1.55] text-cream/90">{children}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block no-underline mb-[16px] hover:text-amberLight
                   [&_span:last-child]:hover:text-amberLight transition-colors duration-200 group
                   [&_.icon-chip]:group-hover:border-amberLight"
      >
        {inner}
      </a>
    );
  }
  return <div className="mb-[16px]">{inner}</div>;
}

/** Accordion group for product links */
function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-[12px] first:mt-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-[6px] group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-white/45 text-[11px] font-semibold uppercase tracking-[0.12em] group-hover:text-amberLight transition-colors duration-200">
          {title}
        </span>
        <ChevronDown 
          strokeWidth={2.5}
          className={`w-[14px] h-[14px] text-white/45 group-hover:text-amberLight transition-transform duration-[250ms] ease-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className="grid transition-[grid-template-rows] duration-[250ms] ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pt-[4px] pb-[4px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Footer
───────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-textDark text-cream/80">
      {/* Thin green-to-amber accent line at top */}
      <div className="h-[3px] bg-gradient-to-r from-greenMid via-amberLight to-greenMid" />

      <div className="px-[24px] pt-[56px] pb-[40px] md:px-[48px] lg:px-[64px]">
        <div className="max-w-[1200px] mx-auto">

          {/* ── 4-column equal-width grid ───────────────────────────────
              Mobile:  1 col (no dividers)
              Tablet:  2×2 grid (no dividers — too cramped)
              Desktop: 4 cols with vertical divider lines between cols 2-4
          ─────────────────────────────────────────────────────────────── */}
          <div
            className="
              grid grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-y-[40px]
              pb-[44px]
              border-b border-white/[0.08]
            "
          >
            {/* ── Col 1: Brand ── (no left divider) */}
            <div className="lg:pr-[36px]">
              {/* Logo */}
              <a href="/" className="inline-block mb-[20px] no-underline">
                <span
                  className="inline-flex items-center justify-center
                             bg-white rounded-[8px] px-[10px] py-[5px]"
                >
                  <img
                    src="https://www.reggi.in/wp-content/uploads/2025/02/668504c8e4-REGGI-LOGO-NEW-for-trademark-2.jpg"
                    alt="REGGI – Jujube Superfood Dips"
                    width={120}
                    height={36}
                    className="h-[36px] w-auto object-contain block"
                  />
                </span>
              </a>

              {/* Tagline — Cormorant Garamond Serif */}
              <p className="font-cormorant text-amberLight text-lg font-bold tracking-[0.06em] uppercase mb-[10px]">
                Nature&apos;s Most Potent Superfood Dip
              </p>

              {/* Description */}
              <p className="text-cream/70 text-[13px] leading-[1.75] mb-[22px]">
                Hand-crafted from sun-dried Jujube fruit blended with organic spice extracts.
                100% natural, no preservatives — just pure goodness in every drop.
              </p>

              {/* WhatsApp */}
              <a
                href="https://wa.me/917603922323"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[8px] text-whatsapp font-semibold
                           text-[13px] no-underline mb-[22px] group"
              >
                <WhatsAppIcon className="w-[17px] h-[17px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span className="group-hover:underline">+91 76039 22323</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-[10px]">
                <SocialBtn href="https://www.instagram.com/reggisuperfood/" label="REGGI on Instagram">
                  <InstagramIcon className="w-[15px] h-[15px]" />
                </SocialBtn>
                <SocialBtn href="https://www.facebook.com/profile.php?id=61576174051586" label="REGGI on Facebook">
                  <FacebookIcon className="w-[15px] h-[15px]" />
                </SocialBtn>
                <SocialBtn href="https://www.youtube.com/@reggisuperfood" label="REGGI on YouTube">
                  <YouTubeIcon className="w-[15px] h-[15px]" />
                </SocialBtn>
              </div>
            </div>

            {/* ── Col 2: Shop ── */}
            <div
              className="
                md:pl-[32px] md:border-l md:border-white/[0.07]
                lg:px-[36px]
              "
            >
              <ColHeading>Shop</ColHeading>

              <div className="mb-[16px]">
                <FooterAccordion title="Single Bottles">
                  <FooterLink href="/#product-cumin-ginger-chilli-bottle">Cumin Ginger Chilli</FooterLink>
                  <FooterLink href="/#product-ginger-garlic-chilli-bottle">Ginger Garlic Chilli</FooterLink>
                  <FooterLink href="/#product-cardamom-bottle">Jujube with Cardamom</FooterLink>
                </FooterAccordion>

                <FooterAccordion title="Pouch Packs">
                  <FooterLink href="/#product-cardamom-pouch">Cardamom Pouch</FooterLink>
                  <FooterLink href="/#product-cardamom-cinnamon-ginger-pouch">Cardamom Cinnamon Ginger</FooterLink>
                  <FooterLink href="/#product-cardamom-cinnamon-cloves-pouch">Cardamom Cinnamon Cloves</FooterLink>
                  <FooterLink href="/#product-cumin-ginger-chilli-pouch">Cumin Ginger Chilli Pouch</FooterLink>
                </FooterAccordion>

                <FooterAccordion title="Combos">
                  <FooterLink href="/#product-spicy-pouch-combo">Spicy Combo</FooterLink>
                  <FooterLink href="/#product-sweet-pouch-combo">Sweet Combo</FooterLink>
                  <FooterLink href="/#product-5-flavours-jar-combo">Five-Flavour Jar Combo</FooterLink>
                </FooterAccordion>
              </div>

              <a
                href="https://wa.me/c/917603922323"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[5px] mt-[20px] text-amberLight
                           text-[13px] font-semibold no-underline hover:text-white
                           transition-colors duration-200"
              >
                View Full Catalogue →
              </a>
            </div>

            {/* ── Col 3: Company ── */}
            <div
              className="
                md:border-l md:border-white/[0.07] md:pl-[32px]
                lg:px-[36px]
              "
            >
              <ColHeading>Company</ColHeading>
              <FooterLink href="/#about">About Us</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>

              <SubLabel>Legal</SubLabel>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/refund-policy">Refund &amp; Returns</FooterLink>
              <FooterLink href="/shipping-policy">Shipping Policy</FooterLink>
            </div>

            {/* ── Col 4: Get in Touch ── */}
            <div
              className="
                lg:border-l lg:border-white/[0.07] lg:pl-[36px]
              "
            >
              <ColHeading>Get in Touch</ColHeading>

              <ContactRow
                href="tel:+917603922323"
                icon={<Phone className="w-[13px] h-[13px] text-amberLight" strokeWidth={2} />}
              >
                +91 76039 22323
              </ContactRow>

              <ContactRow
                href="mailto:info@reggi.in"
                icon={<Mail className="w-[13px] h-[13px] text-amberLight" strokeWidth={2} />}
              >
                info@reggi.in
              </ContactRow>

              <ContactRow
                icon={<MapPin className="w-[13px] h-[13px] text-amberLight" strokeWidth={2} />}
              >
                Porur, Chennai
                <br />
                Tamil Nadu – 600 125
              </ContactRow>
            </div>
          </div>

          {/* ── Bottom bar ───────────────────────────────────────────────
              Left:  © year REGGI. All rights reserved.
              Right: trust text — plain, no boxed card

              pr-[108px] on mobile & tablet guarantees text is never obscured
              by floating WhatsApp button (bottom-[28px] right-[28px]).
          ─────────────────────────────────────────────────────────────── */}
          <div
            className="
              pt-[22px]
              flex flex-col md:flex-row md:items-center md:justify-between
              gap-[12px]
              text-xs text-cream/50
              pr-[108px] md:pr-0
            "
          >
            <span>&copy; {year} REGGI. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-[6px]">
              <span className="inline-flex items-center gap-[4px]">
                <span className="w-[5px] h-[5px] rounded-full bg-greenLight shrink-0" />
                100% Natural
              </span>
              <span className="text-white/20 mx-[2px]">·</span>
              <span className="inline-flex items-center gap-[4px]">
                <span className="w-[5px] h-[5px] rounded-full bg-greenLight shrink-0" />
                FSSAI Licensed
              </span>
              <span className="text-white/20 mx-[2px]">·</span>
              <span className="inline-flex items-center gap-[4px]">
                <span className="w-[5px] h-[5px] rounded-full bg-amberLight shrink-0" />
                No Preservatives
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
