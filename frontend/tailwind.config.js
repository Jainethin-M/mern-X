const { black } = require('daisyui/src/theming/themes');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "black",
          secondary: "teal",
        },
        black: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "rgb(29,155,240)",
          secondary: "teal",
        }
      }
    ]
  }
}

