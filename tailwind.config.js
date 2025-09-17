import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@t-one-internal/design-system/**/*.{js,ts,jsx,tsx}",
  ],
})

