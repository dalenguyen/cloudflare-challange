/// <reference types="vitest" />

import analog from "@analogjs/platform";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    publicDir: "src/public",

    build: {
      outDir: "../dist/./ai/client",
      // reportCompressedSize: true,
      target: ["es2020"],
    },
    server: {
      fs: {
        allow: ["."],
      },
    },
    plugins: [
      analog({
        nitro: {
          preset: "cloudflare-pages",
        },
      }),

      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"],
      cache: {
        dir: `../node_modules/.vitest`,
      },
    },
    define: {
      "import.meta.vitest": mode !== "production",
    },
  };
});
