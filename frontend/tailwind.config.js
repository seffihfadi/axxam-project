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
        primary: '#00A472',
        secondary: '#6D6D6D',
        whitemode: '#F7F7F7',
        darkmode: '#1E1E1E'
      }
    },
  },
  plugins: [],
}