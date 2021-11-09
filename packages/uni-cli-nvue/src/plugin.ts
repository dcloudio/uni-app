import path from 'path'
import { UniVitePlugin, normalizePath } from '@dcloudio/uni-cli-shared'
import { runWebpackBuild, runWebpackDev } from './webpack'
import { Watching } from 'webpack'

const UniAppNVuePlugin = (): UniVitePlugin => {
  let pagesJsonPath: string
  let watching: Watching
  let lastNVueEntry: string
  let isPagesJsonChanged: boolean = false
  return {
    name: 'vite:uni-cli-nvue',
    enforce: 'post',
    config() {
      if (process.env.UNI_NVUE_COMPILER === 'vue') {
        return
      }
      pagesJsonPath = normalizePath(
        path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
      )
      if (process.env.NODE_ENV === 'production') {
        return runWebpackBuild().then(() => {})
      }
      return runWebpackDev().then((compiler) => {
        watching = compiler.watching
      })
    },
    configResolved() {
      if (process.env.UNI_NVUE_COMPILER === 'vue') {
        return
      }
      const entry = process.UNI_NVUE_ENTRY
      if (entry) {
        lastNVueEntry = JSON.stringify(Object.keys(entry))
      }
    },
    watchChange(id) {
      if (process.env.UNI_NVUE_COMPILER === 'vue') {
        return
      }

      if (pagesJsonPath === id && watching) {
        isPagesJsonChanged = true
      }
    },
    generateBundle() {
      if (!isPagesJsonChanged) {
        return
      }
      const entry = process.UNI_NVUE_ENTRY
      if (!entry) {
        return
      }
      const curNVueEntry = JSON.stringify(Object.keys(entry))
      if (curNVueEntry !== lastNVueEntry) {
        lastNVueEntry = curNVueEntry
        watching.invalidate()
      }
    },
  }
}

export default [UniAppNVuePlugin()]
