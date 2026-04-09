import type { Config } from "tailwindcss";
import { colors } from "./tokens/colors";
import { fontFamily, fontSize, fontWeight } from "./tokens/typography";
import { spacing, height, maxWidth } from "./tokens/spacing";
import { screens, zIndex, aspectRatio } from "./tokens/layout";
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
      height,
      maxWidth,
      screens,
      zIndex,
      aspectRatio,
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
