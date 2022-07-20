import type { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { parseJson } from '@dcloudio/uni-cli-shared'

// 需要区分 android，iOS
export function uniUtsPlugin(): Plugin {
  // TODO 1.0 版本，解析到 uts module 时，动态编译 uts ？
  return {
    name: 'uts',
    apply: 'build',
    enforce: 'pre',
    load(id, opts) {
      if (opts && opts.ssr) {
        return id
      }
      if (!id.includes('uni_modules')) {
        return
      }
      const pkgPath = path.join(id, 'package.json')
      if (!fs.existsSync(pkgPath)) {
        return
      }
      const pkg = parseJson(fs.readFileSync(pkgPath, 'utf-8'))
      if (pkg.uni_modules?.type !== 'uts') {
        return
      }
      // 加载接口类
      return path.join(id, pkg.main || 'interface.uts')
    },
    transform(code, id, opts) {
      if (opts && opts.ssr) {
        return
      }
      if (path.extname(id.split('?')[0]) !== '.uts') {
        return
      }
    },
  }
}
