/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textBtn: "#8F53DE",
      },
      backgroundColor: {
        btn: "#8F53DE",
      },
      backgroundImage: {
        backgroundAuth:
          "linear-gradient(180deg, hsl(240 10% 3.9%), hsl(240 8% 6%))",
      },
    },
  },
  plugins: [],
};
