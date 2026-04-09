import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss/types/config').PluginCreator} */
export const customUtilities: any = plugin(({ addUtilities }) => {
  addUtilities({
    ".text-balance": {
      "text-wrap": "balance",
    },
    ".text-pretty": {
      "text-wrap": "pretty",
    },
    ".scrollbar-hidden": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  });
});
