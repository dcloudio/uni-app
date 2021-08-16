import { Compiler } from 'webpack'
import { M } from '@dcloudio/uni-cli-shared'

export default class WatchPlugin {
  constructor() {}

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler: Compiler) {
    const chunkVersions: Record<string, string> = {}
    let isFirst = true
    let isCompiling = false
    compiler.hooks.invalid.tap('WatchPlugin', () => {
      if (!isCompiling) {
        isCompiling = true
        if (!isFirst) {
          console.log(M['dev.watching.start'])
        }
      }
    })
    compiler.hooks.done.tap('WatchPlugin', (stats) => {
      isCompiling = false
      const changedFiles: Set<string> = new Set<string>()
      stats.compilation.chunks.forEach(({ name, hash, files }) => {
        if (!hash) {
          return
        }
        const oldVersion = chunkVersions[name]
        chunkVersions[name] = hash
        if (hash === oldVersion) {
          return
        }
        files.forEach((file) => changedFiles.add(file))
      })
      if (!isFirst && changedFiles.size) {
        console.log(
          M['dev.watching.end.pages'].replace(
            '{pages}',
            JSON.stringify([...changedFiles])
          )
        )
      } else {
        if (isFirst) {
          return (isFirst = false)
        }
        console.log(M['dev.watching.end'])
      }
    })
  }
}
