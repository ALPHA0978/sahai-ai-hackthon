/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#206a5d',
        secondary: '#81b214',
        tertiary: '#bfdcae',
        background: {
          light: '#f3f7f6',
          dark: '#040f0d'
        },
        'text-primary': {
          light: '#1F2937',
          dark: '#F9FAFB'
        },
        'text-secondary': {
          light: '#6B7280',
          dark: '#D1D5DB'
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}