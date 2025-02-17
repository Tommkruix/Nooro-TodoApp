import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        body: "14px",
        subtitle: "16px",
        title: "40px",
      },
      borderRadius: {
        button: "8px",
      },
      colors: {
        white: "var(--white)",
        black: "var(--black)",
        purple: "var(--purple)",
        light_blue: "var(--light-blue)",
        deep_blue: "var(--deep-blue)",
        light_grey: "var(--light-grey)",
        light_fade_grey: "var(--light-fade-grey)",
        deep_grey: "var(--deep-grey)",
        extra_deep_grey: "var(--extra-deep-grey)",
      },
    },
  },
  plugins: [],
} satisfies Config;
