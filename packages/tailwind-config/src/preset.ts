import type { Config } from "tailwindcss";
import { colors } from "./tokens/colors";
import { fontFamily, fontSize, fontWeight } from "./tokens/typography";
import { spacing } from "./tokens/spacing";
import { borderRadius } from "./tokens/radius";
import { boxShadow } from "./tokens/shadows";
import {
  transitionDuration,
  transitionTimingFunction,
  keyframes,
  animation,
} from "./tokens/animations";
import { customUtilities } from "./plugins/custom-utilities";

const preset: Config = {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
      fontWeight,
      spacing,
      borderRadius,
      boxShadow,
      transitionDuration,
      transitionTimingFunction,
      keyframes,
      animation,
    },
  },
  plugins: [customUtilities],
};

export default preset;
