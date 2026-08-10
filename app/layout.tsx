import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "REGGI – Jujube Superfood Dips",
  description:
    "Hand-crafted from sun-dried Jujube fruit blended with organic spice extracts. 100% Vegan, Gluten Free, FSSAI Certified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-dmSans bg-cream text-textDark">
        {children}
      </body>
    </html>
  );
}
