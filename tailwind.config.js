/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants:{
    backgroundColor: ["responsive","hover", "focus",'active'],
    display: ["responsive, group-hover"]
  },
  plugins: [],
}

