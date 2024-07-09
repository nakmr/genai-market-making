import { type Config } from "tailwindcss"

export default {
  content: [
    "{routes,islands,components,static}/**/*.{ts,tsx,css,scss}",
  ],
} satisfies Config
