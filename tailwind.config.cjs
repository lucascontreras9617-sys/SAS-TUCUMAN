/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#e6c364',
        'on-primary': '#3d2e00',
        surface: '#000E3F',
        'on-surface': '#dde1ff',
        'surface-container': '#0e1b4b',
        'surface-container-high': '#1a2656',
        'surface-container-highest': '#253262',
        'surface-container-low': '#081747',
        'surface-container-lowest': '#000933',
        'primary-container': '#281e00',
      },
      fontFamily: {
        headline: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
        label: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};