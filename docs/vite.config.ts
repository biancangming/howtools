import path from 'path'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@howtools', replacement: path.resolve(__dirname, '../src') },
    ]
  },
  plugins: [
    svgLoader(),
  ],
})
