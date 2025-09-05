import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    dts({ outDir: 'dist/types' }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      formats: ['es'],
      entry: {
        logger: './src/main.ts',
      },
      fileName: (format, name) => `${name}.${format}.js`,
    },
  },
})
