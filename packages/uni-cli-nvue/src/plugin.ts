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
    config() {
      if (process.env.UNI_NVUE_COMPILER === 'vue') {
        return
      }
      pagesJsonPath = normalizePath(
        path.resolve(process.env.UNI_INPUT_DIR, 'pages.json')
      )
      if (process.env.NODE_ENV === 'production') {
        runWebpackBuild()
      } else {
        runWebpackDev().then((compiler) => {
          watching = compiler.watching
        })
      }
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
      console.log('watchChange', lastNVueEntry, curNVueEntry)
      if (curNVueEntry !== lastNVueEntry) {
        lastNVueEntry = curNVueEntry
        console.log('invalidate')
        watching.invalidate()
      }
    },
  }
}

export default [UniAppNVuePlugin()]
