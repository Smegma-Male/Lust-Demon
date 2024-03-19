import path from "path"
import { VitePWA } from "vite-plugin-pwa"
import {
  defineConfig,
  minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config"

export default defineConfig({
  server: {
    port: 3000, // controls which port to use.
    open: "/index.html", // which addres we should open into.
  },
  build: {
    rollupOptions: {
      input: {
        // list of all available pages in your application
        main: path.resolve(__dirname, "index.html"),
        // otherpage: path.resolve(__dirname, "src/other_page/otherpage.html"),
      },
    },
  },
  // PWA stuff:
  headLinkOptions: {
    preset: "2023",
  },
  preset,
  images: [`public/logo.svg`],
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      base: "/Lust-Demon/", // name of distribution repo
      manifest: {
        name: "PWA test",
        short_name: "Visual Novel",
        description: "This will be a visual novel lmao",
        theme_color: "#ffffff",
        url_handlers: [
          // https://www.youtube.com/watch?v=jYc7ih9Xwqw
          {
            origin: "URL for website here.",
          },
        ],
        display_override: ["window-controls-overlay"], // TitleBar handling:  https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps-chromium/how-to/window-controls-overlay
        screenshots: [
          // Screenshots when installing PWA.
          // https://web.dev/patterns/web-apps/richer-install-ui/
          {
            src: "/pwa-512x512.png",
            sizes: "512x512", // Width and Height: 320px and at most 3,840px
            type: "image/png",
            form_factor: "wide",
            label: "default picture desktop",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512", // Width and Height: 320px and at most 3,840px
            type: "image/png",
            form_factor: "narrow",
            label: "default picture mobile",
          },
        ],
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
})
