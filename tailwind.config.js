/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./js/*.js"],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'visibility': 'visibility, opacity',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}