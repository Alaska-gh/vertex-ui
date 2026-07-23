import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },

  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/index.ts",
      name: "VertexUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },

    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],

      output: [
        {
          format: "es",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          format: "cjs",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      ],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
    exclude: ["**/*.stories.*", "**/.storybook/**", "**/node_modules/**"],
  },
});
