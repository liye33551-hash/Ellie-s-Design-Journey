import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f0f0f",
        paper: "#f2f0ea",
        muted: "#8f8f89",
        line: "#2d2d2b",
        acid: "#d7ff55",
      },
      maxWidth: {
        canvas: "1750px",
      },
    },
  },
  plugins: [],
};

export default config;
