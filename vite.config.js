import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: ['yaaro.fit', 'www.yaaro.fit'],
  },
})
