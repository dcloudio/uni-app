import path from 'path'
import { Plugin } from 'vite'
export function uniAppNVuePlugin(): Plugin {
  return {
    name: 'uni:app-nvue',
    config() {
      return {
        build: {
          outDir: path.join(process.env.UNI_OUTPUT_DIR, '../.nvue'),
          rollupOptions: {},
        },
      }
    },
  }
}
