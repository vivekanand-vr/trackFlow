/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all js, jsx, ts, and tsx files in the src directory
  ],
  theme: {
    extend: {
        fontFamily: {
                  poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        maroon: {
          400: '#C1545C',
          500: '#A13D44',
          600: '#81262C',
          800: '#611B20',
        },
      },
    },
  },
  plugins: [],
}