/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        background: ["#FFFDF5", "sans-serif"], 
        sans: ["DynaPuff", "system-ui", "sans-serif"],
        heading: ["DynaPuff", "system-ui", "sans-serif"],
      },
      fontWeight: {
        normal: "300",
        medium: "400",
        semibold: "500",
        bold: "600",
        extrabold: "700",
        black: "800",
      },
      colors: {
        background: "#FFFDF5", // Warm Cream
        foreground: "#1E293B", // Slate 800
        muted: "#F1F5F9", // Slate 100
        "muted-foreground": "#64748B", // Slate 500
        accent: {
          DEFAULT: "#8B5CF6", // Vivid Violet
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F472B6", // Hot Pink
          foreground: "#1E293B",
        },
        tertiary: {
          DEFAULT: "#FBBF24", // Amber/Yellow
          foreground: "#1E293B",
        },
        quaternary: {
          DEFAULT: "#34D399", // Emerald/Mint
          foreground: "#1E293B",
        },
        border: "#E2E8F0", // Slate 200
        input: "#FFFFFF",
        card: "#FFFFFF",
        ring: "#8B5CF6",
      },
      borderRadius: {
        lg: "24px",
        md: "16px",
        sm: "8px",
        full: "9999px",
        blob: "3rem 3rem 3rem 0", // Custom blob radius
      },
      borderWidth: {
        DEFAULT: "2px",
      },
      boxShadow: {
        "hard-sm": "2px 2px 0px 0px #1E293B",
        "hard-md": "4px 4px 0px 0px #1E293B",
        "hard-lg": "6px 6px 0px 0px #1E293B",
        "hard-xl": "8px 8px 0px 0px #E2E8F0",
        "hard-featured": "8px 8px 0px 0px #F472B6",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "75%": { transform: "rotate(-3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        pop: "pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
    },
  },
  plugins: [],
};
