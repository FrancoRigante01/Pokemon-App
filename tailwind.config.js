/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "fog-background", // 👈 Asegura que Tailwind no elimine esta clase
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
