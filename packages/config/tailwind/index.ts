import type { Config } from "tailwindcss";

export default {
  content: [""],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          "0%, 100%": {
            transform: "translateX(calc(100% + 32px)",
          },
          "50%": { transform: "translateX(0)" },
        },
        hide: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
      },
    },
  },
  plugins: [],
} satisfies Config;
