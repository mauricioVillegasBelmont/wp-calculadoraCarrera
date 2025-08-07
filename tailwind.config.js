/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,html,js,jsx}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sarabun: ["Sarabun", "sans-serif"],
      },
      fontSize: {
        'base': '20px',
        'head1': '40px',
        'head2': '24px',
      },
      colors: {
        emerald:{
          '50': '#ecfdf5',
          '800': '#065f46',
          '950': '#004438',
        },
        sushi:{
          '500':'#77b944',
        },
      }
    },
  },
  
  variants: {
    extend: {},
  },
  plugins: [],
}