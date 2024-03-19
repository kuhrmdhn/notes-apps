/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-green": "#D9F47B",
        "dark-green": "#004C42",
        beige: "#F2EDD3",
        orange: "#F25003",
      },
      fontFamily: {
        raleway: "Raleway, sans-serif",
        ruslan: "Ruslan Display, sans-serif",
      },
    },
  },
  plugins: [],
};
