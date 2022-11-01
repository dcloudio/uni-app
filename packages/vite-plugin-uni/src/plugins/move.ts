import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import type { Plugin } from 'vite'

interface UniMovePluginOptions {
  apply: Plugin['apply']
  enforce: Plugin['enforce']
  /**
   * 原始根目录
   */
  cwd: string
  /**
   * glob pattern 如：**\/*.js.mp)
   */
  pattern: string
  /**
   * 目标目录
   */
  dest: string
}

export function uniMovePlugin({
  apply,
  enforce,
  cwd,
  pattern,
  dest,
}: UniMovePluginOptions): Plugin {
  return {
    name: 'uni:move',
    apply,
    enforce,
    async writeBundle() {
      await Promise.all(
        glob
          .sync(pattern, {
            cwd,
          })
          .map((filename) => {
            return fs.move(
              path.resolve(cwd, filename),
              path.resolve(dest, filename),
              {
                overwrite: true,
              }
            )
          })
      )
    },
  }
}
