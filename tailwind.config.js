/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        '1/3': '33.3333%',
        '2/3': '66.6667%',
        '4/5' : '80%'
      },
      maxHeight: {
        '1/3': '33.3333%',
        '2/3': '66.6667%',
        '4/5' : '80%'
      },
    },
  },
  plugins: [],
}

