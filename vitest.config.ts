import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    environment: "jsdom",

    setupFiles: "./src/test/setup.ts",

    globals: true,

    css: true,

    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
      ],

      exclude: [
        "node_modules/**",
        "dist/**",
        "coverage/**",

        // Tests
        "**/*.test.ts",
        "**/*.test.tsx",

        // Storybook
        "**/*.stories.ts",
        "**/*.stories.tsx",

        // Barrel exports
        "**/index.ts",

        // Type definitions
        "**/*.types.ts",
        "**/*.d.ts",

        // Configuration files
        "vite.config.ts",
        "vitest.config.ts",

        // Test utilities
        "src/test/**",

        // storage
        "src/lib/utils/storage.ts",
      ],

      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90,
      },
    },
  },
});