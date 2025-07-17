module.exports = {
  content: ["./src/**/*.{ts,tsx,html,js}"],
  purge: [
    './*.html',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        emerald:{
          '50': '#ecfdf5',
          '800': '#065f46',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}