/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#C85C8E",
        second: "#FAE7F3",
        third: "#9D3C72",
      },
    },
  },
  plugins: [],
};
