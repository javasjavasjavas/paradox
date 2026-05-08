/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["BigNoodle Titling", "Arial Narrow", "Impact", "sans-serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["Space Grotesk", "Consolas", "monospace"],
      },
      colors: {
        order: {
          blue: "#2f86ff",
          cyan: "#6fd8ff",
          ice: "#dff5ff",
          steel: "#9eb7ca",
          black: "#030506",
          panel: "#071018",
        },
      },
      boxShadow: {
        neon: "0 0 30px rgba(47, 134, 255, 0.45)",
      },
    },
  },
  plugins: [],
};
