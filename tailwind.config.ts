import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        greenDark: "#2C4A2E",
        greenMid: "#3D6B40",
        greenLight: "#5A8C5E",
        greenPale: "#D4E6C3",
        amber: "#C97D2E",
        amberLight: "#E5A94F",
        cream: "#F7F2E8",
        creamDark: "#EDE4CE",
        brownWarm: "#7A4F2D",
        textDark: "#1E2D1F",
        textMid: "#4A5C4B",
        textLight: "#8A9E8B",
        redAccent: "#96151D", // Maroonish red
        whatsapp: "#25D366",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        dmSans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
      boxShadow: {
        nav: "0 2px 8px rgba(44,74,46,0.06), 0 8px 24px rgba(44,74,46,0.05)",
        "hero-btn": "0 4px 12px rgba(37,211,102,0.25), 0 10px 28px rgba(37,211,102,0.35)",
        "hero-btn-hover": "0 6px 16px rgba(37,211,102,0.3), 0 14px 36px rgba(37,211,102,0.45)",
        "hero-img": "0 8px 24px rgba(44,74,46,0.12), 0 24px 50px rgba(44,74,46,0.22)",
        card: "0 2px 8px rgba(44,74,46,0.06), 0 8px 20px rgba(44,74,46,0.08)",
        "card-hover": "0 6px 16px rgba(44,74,46,0.1), 0 18px 40px rgba(44,74,46,0.18)",
        "order-btn-hover": "0 4px 12px rgba(37,211,102,0.25), 0 10px 24px rgba(37,211,102,0.35)",
        "jujube-img": "0 6px 18px rgba(44,74,46,0.1), 0 20px 48px rgba(44,74,46,0.18)",
        "cta-btn": "0 4px 12px rgba(44,74,46,0.15), 0 12px 32px rgba(44,74,46,0.25)",
        "cta-btn-hover": "0 6px 18px rgba(44,74,46,0.2), 0 18px 42px rgba(44,74,46,0.32)",
        "wa-float": "0 4px 12px rgba(37,211,102,0.3), 0 10px 30px rgba(37,211,102,0.45)",
      },
      borderRadius: {
        pill: "50px",
        card: "20px",
        jujube: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
