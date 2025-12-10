/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "zouaf-primary": "#f9886c", 
        "zouaf-secondary": "#0c343d",
        "zouaf-secondary2": "#fbeee1",
      },
    },
  },
  plugins: [],
};
