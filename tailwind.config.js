/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'send-ico-hover': '#dcdcdc',
        'send-ico': '#7a7a7b',
      },
    },

  },
  plugins: [],
}
