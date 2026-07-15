import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: "820px",
        },
        padding: "16px",
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        divider: "var(--divider)",
        panel: "var(--panel)",
        "panel-foreground": "var(--panel-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent-9)",
        highlight: "var(--highlight)",
      },

      fontFamily: {
        sans: [
          "Roboto",
          "Roboto Flex",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },

      // Material 3 shape scale
      borderRadius: {
        "m3-xs": "4px",
        "m3-sm": "8px",
        "m3-md": "12px",
        "m3-lg": "16px",
        "m3-xl": "24px",
        "m3-2xl": "28px",
      },

      // Material 3 tonal elevation
      boxShadow: {
        "m3-1": "var(--m3-elevation-1)",
        "m3-2": "var(--m3-elevation-2)",
        "m3-3": "var(--m3-elevation-3)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        // https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
        ".horizontal-writing-tb": { "writing-mode": "horizontal-tb" },
        ".vertical-writing-rl": { "writing-mode": "vertical-rl" },
        ".vertical-writing-lr": { "writing-mode": "vertical-lr" },
        // https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
        ".orientation-mixed": { "text-orientation": "mixed" },
        ".orientation-upright": { "text-orientation": "upright" },
        ".orientation-sideways-right": { "text-orientation": "sideways-right" },
        ".orientation-sideways": { "text-orientation": "sideways" },
        ".orientation-glyph": { "text-orientation": "use-glyph-orientation" },
      });
    }),
  ],
};
