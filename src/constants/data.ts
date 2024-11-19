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
      label: "Pro",
      value: "gemini-pro",
    },
    {
      label: "Flash",
      value: "gemini-1.5-flash",
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
  TODO: { label: "Todo", value: "TODO", color: "blue" },
  DONE: { label: "Done", value: "DONE", color: "green" },
};
