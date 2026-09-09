import { defineConfig as defineTanstackConfig } from "@lovable.dev/vite-tanstack-config";
import { defineConfig } from "vite";

const baseConfig = defineTanstackConfig({
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

export default defineConfig(async (env) => {
  const config = await baseConfig(env);
  if (Array.isArray(config.plugins)) {
    config.plugins = config.plugins.filter((plugin) => {
      if (plugin && typeof plugin === "object" && !Array.isArray(plugin) && "name" in plugin) {
        return plugin.name !== "vite-tsconfig-paths";
      }
      return true;
    });
  }
  return config;
});

