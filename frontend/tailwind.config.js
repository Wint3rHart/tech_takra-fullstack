/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  fontFamily: {
        lobster: ['Lobster', 'cursive'], // 'cursive' as fallback
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        dmserif: ['DM Serif Display', 'serif'],
        orbitron: ['Orbitron', 'sans-serif'], pacifico: ['Pacifico', 'cursive'], raleway: ['Raleway', 'sans-serif'],
        baskerville: ['Libre Baskerville', 'serif'],
        playfair: ['Playfair Display', 'serif']
      },},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
