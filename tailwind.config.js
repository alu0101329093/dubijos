/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        inout:
          'inset 0 4px 10px 6px rgba(0,0,0,0.3),2px 4px 5px 2px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
