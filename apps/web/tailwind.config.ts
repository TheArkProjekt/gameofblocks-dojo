import type { Config } from "tailwindcss";

import baseConfig from "@gob-dojo/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
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
