import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
            colors: {
        // Editorial + neo-brutalist system (light-first)
        ink: "#111111",
        paper: "#F7F7F4",
        surface: "#FFFFFF",
        "surface-2": "#F4F3F0",
        line: "rgba(17, 17, 17, 0.09)",
        lime: "#B7FF3C",
        limeHover: "#C4FF45",
        // Legacy accents remapped to the lime system so existing
        // from-/to-/text- classes auto-conform to the redesign.
        "accent-blue": "#B7FF3C",
        "accent-cyan": "#C4FF45",
        "accent-violet": "#B7FF3C",
      },
      boxShadow: {
        // Offset / print-style elevations (4–8px), no soft neon glows
        glow: "6px 8px 0px -3px rgba(17, 17, 17, 0.18)",
        card: "8px 12px 0px -4px rgba(17, 17, 17, 0.22)",
        "card-lg": "10px 14px 0px -4px rgba(17, 17, 17, 0.26)",
        ink: "6px 8px 0px -3px rgba(0, 0, 0, 0.34)",
        lime: "6px 8px 0px -3px rgba(183, 255, 60, 0.34)",
        soft: "0 1px 3px 0 rgba(17, 17, 17, 0.06)",
      },
      borderColor: {
        DEFAULT: "rgba(17, 17, 17, 0.09)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.06) 1px, transparent 1px)",
        "dot-pattern":
          "radial-gradient(rgba(17,17,17,0.09) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
        dot: "20px 20px",
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-lime": "pulseLime 1.9s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(183,255,60,0.45)",
          },
          "50%": {
            opacity: "0.55",
            boxShadow: "0 0 0 6px rgba(183,255,60,0)",
          },
        },
        pulseLime: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(183,255,60,0.5)",
          },
          "50%": {
            opacity: "0.5",
            boxShadow: "0 0 0 6px rgba(183,255,60,0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
