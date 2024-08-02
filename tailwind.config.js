/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      padding: {
        "dash-left": "32rem",
        "dash-top": "10rem",
      },
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "sans-serif"],
        manropes: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        custom: "0 1px 0 rgba(0, 0, 0, 0.5)",
        custom2: "0px 1px 21px 0px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(167.66deg, #3F2A7D 5.71%, rgba(63, 42, 125, 0.8) 71.15%)",
      },
      borderColor: {
        "custom-border": "#281266",
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        "purple-primary": "#281266",
        "skyblue-secondary": "#2D9CDB",
      },
      keyframes: {
        scaleDownCenter: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0.5)",
          },
        },
        scaleUpCenter: {
          "0%": {
            transform: "scale(0.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        bounceInTop: {
          "0%": {
            "animation-timing-function": "ease-in",
            opacity: "0",
            transform: "translateY(-250px)",
          },
          "38%": {
            "animation-timing-function": "ease-out",
            opacity: "1",
            transform: "translateY(0)",
          },
          "55%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(-65px)",
          },
          "72%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
          "81%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(-28px)",
          },
          "90%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
          "95%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(-8px)",
          },
          "100%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
        },
        slideInTop: {
          "0%": {
            opacity: "0",
            transform: "translateY(-250px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        jelloHorizontal: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },
          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },
          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
        slideInButtom: {
          "0%": {
            opacity: "0",
            transform: "translateY(250px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        bounceInBottom: {
          "0%": {
            "animation-timing-function": "ease-in",
            opacity: "0",
            transform: "translateY(250px)",
          },
          "38%": {
            "animation-timing-function": "ease-out",
            opacity: "1",
            transform: "translateY(0)",
          },
          "55%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(65px)",
          },
          "72%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
          "81%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(28px)",
          },
          "90%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
          "95%": {
            "animation-timing-function": "ease-in",
            transform: "translateY(8px)",
          },
          "100%": {
            "animation-timing-function": "ease-out",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out forwards",
        slideOut: "slideOut 0.5s ease-in-out forwards",
        bounceInTop: "bounceInTop 1s both",
        slideInTop: "slideInTop 1s ease-out both",
        scaleUpCenter: "scaleUpCenter 0.5s ease-in-out forwards",
        scaleDownCenter: "scaleDownCenter",
        scaleDownCenter: "scaleDownCenter 0.5s ease-in-out forwards",
        jelloHorizontal: "scaleDownCenter 0.75s ease-in-out forwards",
        slideInButtom: "scaleDownCenter 500ms ease 0s 1 alternate none",
        bounceInBottom: "bounceInBottom 1s both",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
