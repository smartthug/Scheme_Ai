import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#DEF2F1",
        card: "#FEFFFF",
        primary: "#2B7A78",
        accent: "#3AAFA9",
        ink: "#17252A",
      },
    },
  },
  plugins: [],
};
export default config;
