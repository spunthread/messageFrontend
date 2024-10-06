/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: '3.5rem', // or '72px', depending on your design requirements
      },
    },
  },
  plugins: [],
}
