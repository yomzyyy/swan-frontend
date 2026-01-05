/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional Maritime Color Palette
        navy: {
          900: '#0A1929',  // Darkest navy (primary dark backgrounds)
          800: '#0D2136',  // Deep navy (cards, hero overlays)
          700: '#1A2942',  // Standard navy (borders, elements)
          600: '#1e3a5f',  // Mid navy (hover states)
          500: '#2c5282',  // Light navy (secondary borders)
        },
        grey: {
          900: '#1a1a1a',  // Almost black (primary text)
          800: '#2d3748',  // Dark grey (headings)
          700: '#4a5568',  // Medium grey (body text)
          600: '#718096',  // Light grey (secondary text)
          500: '#a0aec0',  // Subtle grey (borders)
          400: '#cbd5e0',  // Very light grey
          300: '#e2e8f0',  // Background grey
          200: '#edf2f7',  // Subtle backgrounds
          100: '#f7fafc',  // Off-white
        },
        gold: {
          600: '#b8860b',  // Dark gold (minimal use for highlights)
          500: '#d4af37',  // Standard gold (accents)
          400: '#daa520',  // Light gold
        },
        // Functional colors
        success: '#2f855a',
        warning: '#c05621',
        error: '#c53030',
        info: '#2c5282',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
