import plugin from "tailwindcss/plugin";

export const customUtilities = plugin(({ addUtilities }) => {
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
