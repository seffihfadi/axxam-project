/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary: '#0051CB',
        secondary: '#6D6D6D',
        whitemode: '#F7F7F7',
        darkmode: '#1E1E1E'
      },
      container:{
        center: true,
        padding: '2rem',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}