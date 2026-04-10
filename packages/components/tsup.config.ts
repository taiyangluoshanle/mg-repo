import { resolve } from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  external: ["react", "react-dom", "@mg/utils"],
  noExternal: [
    "@base-ui/react",
    "@base-ui/utils",
    "use-sync-external-store",
    "class-variance-authority",
  ],
  esbuildOptions(options) {
    options.alias = {
      "use-sync-external-store/shim": resolve(
        __dirname,
        "src/shims/use-sync-external-store-shim.ts",
      ),
      "use-sync-external-store/shim/index.js": resolve(
        __dirname,
        "src/shims/use-sync-external-store-shim.ts",
      ),
      "use-sync-external-store/shim/with-selector": resolve(
        __dirname,
        "src/shims/use-sync-external-store-with-selector.ts",
      ),
      "use-sync-external-store/shim/with-selector.js": resolve(
        __dirname,
        "src/shims/use-sync-external-store-with-selector.ts",
      ),
    };
  },
});
