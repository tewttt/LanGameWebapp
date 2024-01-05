/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#0B0C0F",
        baseColor: "#340472",
        hpink: "#E2CFEA",
        baseBlue: "#1974C7"
      }
    },
  },
  variants:{
    backgroundColor: ["responsive","hover", "focus",'active'],
    display: ["responsive, group-hover"]
  },
  plugins: [],
}

