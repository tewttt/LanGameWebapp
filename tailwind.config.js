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
        baseBlue: "#1974C7",
        baseBlack: " #002233",
        baseBlue1: "#2650F4",
        helpGreen: "#70E000",
        helpGray: "#EBEBEB"
      }
    },
    dropShadow: {
      '3xl' : "20px 20px 20px #E2CFEA"
    },
  },
  variants:{
    backgroundColor: ["responsive","hover", "focus",'active'],
    display: ["responsive, group-hover"]
  },
  plugins: [],
}

