/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom blue color palette based on #207dff
        primary: {
          blue: '#207dff',        // Main blue
          light: '#4d9aff',       // Lighter blue for hover
          dark: '#1a65cc',        // Darker blue for contrast
          gradient: '#00bfff',    // Gradient partner (sky blue)
        },
        navy: {
          dark: '#001E3C',
          medium: '#003C78',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
