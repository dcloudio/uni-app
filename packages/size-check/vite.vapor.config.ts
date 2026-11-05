import path from 'path'
import { type Plugin, defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const plugins = uni({ viteLegacyOptions: false })
const autoImport = plugins.find(
  (plugin) => plugin.name === 'unplugin-auto-import'
) as Plugin & { transformInclude: (id: string) => boolean }
const transformInclude = autoImport.transformInclude
// 仅体积基准处理工作区路径：这些 JS 已是框架产物，不应被当作业务源码自动导入。
// 复用 unplugin 的过滤入口并保留原规则，不改变普通项目的 autoImportOptions.exclude 行为。
autoImport.transformInclude = (id) =>
  !/[\\/]packages[\\/]uni-[^\\/]+[\\/]dist(?:-[^\\/]+)?[\\/].*\.js$/.test(id) &&
  transformInclude(id)

export default defineConfig({
  root: path.resolve(__dirname, 'vapor'),
  build: {
    outDir: path.resolve(__dirname, 'dist-vapor'),
    emptyOutDir: true,
    // 合并所有页面及运行时，避免只统计入口、漏掉异步 JS 和 CSS。
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'size-check.es.js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  plugins,
})
