import path from 'path'
import vue from '@vitejs/plugin-vue'
import uni, { uniVueCompilerOptions } from '@dcloudio/vite-plugin-uni'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

/**
 * @type {import('vite').UserConfig}
 */
export default {
  root: __dirname,
  build: {
    // minify: false,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: uniVueCompilerOptions,
      },
    }),
    uni({ inputDir: path.resolve(__dirname, 'src') }),
  ],
}
