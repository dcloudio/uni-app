import webpack from 'webpack'
import { once } from '@dcloudio/uni-shared'

import { createConfig } from './config'
import { initModuleAlias } from './alias'

const initModuleAliasOnce = once(initModuleAlias)

function runWebpack(mode: 'production' | 'development') {
  initModuleAliasOnce()
  return new Promise((resolve, reject) => {
    webpack(createConfig(mode), (err, stats) => {
      if (err) {
        return reject(err.stack || err)
      }

      if (stats!.hasErrors()) {
        return reject(stats!.toString())
      }
      const info = stats!.toJson()
      if (stats!.hasWarnings()) {
        console.warn(info.warnings)
      }
      console.log(
        stats!.toString({
          chunks: true, // 使构建过程更静默无输出
          colors: true, // 在控制台展示颜色
        })
      )
      resolve(void 0)
    })
  })
}

export function runWebpackBuild() {
  return runWebpack('production')
}

export function runWebpackDev() {
  return runWebpack('development')
}
