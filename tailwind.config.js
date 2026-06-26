/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "Inter", "sans-serif"],
      },
      colors: {
        leaf: {
          50: "#eef8ef",
          100: "#d6efd8",
          500: "#43a047",
          700: "#1b5e20",
          800: "#124518",
          900: "#0a2710",
        },
        amber: {
          rural: "#ffb300",
        },
        ink: "#0f172a",
        paper: "#fafafa",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(27, 94, 32, 0.22)",
        dock: "0 24px 70px rgba(15, 23, 42, 0.24)",
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(rgba(27, 94, 32, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27, 94, 32, 0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
