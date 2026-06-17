// Standard TanStack Start + Vite config (migrated off @lovable.dev/vite-tanstack-config).
// The Lovable wrapper bundled a Cloudflare-default Nitro build and sandbox-only patches
// that conflicted with Vercel's native TanStack Start handling. This config wires the same
// plugins directly so the Nitro server build auto-detects the host (Vercel CI -> Build
// Output API at .vercel/output; Node locally) with no host-specific coupling.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
    // Keep a single copy of React / TanStack Query across SSR + client bundles.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Block server-only modules from leaking into the client bundle.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Use src/server.ts (our SSR error wrapper) as the server entry; Nitro builds from it.
      server: { entry: "server" },
    }),
    nitro(),
    viteReact(),
  ],
});
