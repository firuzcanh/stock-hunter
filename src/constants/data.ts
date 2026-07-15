export const APP_NAVS = [
  {
    label: "Contents",
    value: "/contents",
  },
  {
    label: "Media",
    value: "/media",
  },
  {
    label: "Custom Contents",
    value: "/custom-contents",
  },
  {
    label: "Tools",
    value: "/tools",
  },
];

export const PLATFORMS = [
  {
    label: "ShutterStock",
    value: "shutterstock",
  },
];

export const AI_PROVIDERS = [
  {
    label: "Gemini",
    value: "gemini",
  },
  {
    label: "ChatGPT",
    value: "chatgpt",
  },
];

export const AI_MODELS = {
  gemini: [
    {
      label: "Gemini 3 Flash",
      value: "gemini-3-flash-preview",
    },
    {
      label: "Gemini 3.1 Flash Lite",
      value: "gemini-3.1-flash-lite",
    },
  ],

  chatgpt: [
    {
      label: "4o",
      value: "4o",
    },
  ],
};

export const CONTENT_STATUSES = {
  TODO: { label: "Todo", value: "TODO", color: "gray" },
  DONE: { label: "Done", value: "DONE", color: "green" },
};

export const THEME_MODES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const;

// Radix accent colors — curated for a monochrome-first palette
export const ACCENT_COLORS = [
  { label: "Monochrome", value: "gray", swatch: "#8b8b8b" },
  { label: "Blue", value: "blue", swatch: "#3b82f6" },
  { label: "Teal", value: "teal", swatch: "#14b8a6" },
  { label: "Green", value: "green", swatch: "#22c55e" },
  { label: "Amber", value: "amber", swatch: "#f59e0b" },
  { label: "Orange", value: "orange", swatch: "#f97316" },
  { label: "Red", value: "red", swatch: "#ef4444" },
  { label: "Violet", value: "violet", swatch: "#8b5cf6" },
  { label: "Pink", value: "pink", swatch: "#ec4899" },
];
