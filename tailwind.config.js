/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "",
        baseColor: "#383030",
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

