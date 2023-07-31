import baseConfig from "@gob-dojo/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  safelist: [
    "fill-water-500",
    "fill-earth-500",
    "fill-wood-500",
    "fill-arcane-600",
    "fill-metal-600",
    "fill-pearl-950",
    "stroke-water-400",
    "stroke-earth-400",
    "stroke-wood-400",
    "stroke-arcane-500",
    "stroke-metal-500",
    "stroke-pearl-900",
  ],
  presets: [baseConfig],
  theme: {
    screens: {
      sm: "768px",
      md: "1024px",
      lg: "1366px",
      xl: "1536px",
      "2xl": "1920px",
      "3xl": "2460px",
    },
    extend: {
      fontFamily: {
        "styrene-a": ["var(--font-styrene-a)"],
        "ark-project": ["var(--font-ark-project)"],
      },
    },
  },
} satisfies Config;
