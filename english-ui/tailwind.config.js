/* eslint-disable no-undef */
module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fill: theme => ({
      'indigo': theme('colors.indigo.500'),
    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}