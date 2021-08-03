import webpack from 'webpack'
import { once } from '@dcloudio/uni-shared'

import { createConfig } from './config'
import { initModuleAlias } from './alias'

const initModuleAliasOnce = once(initModuleAlias)

function runWebpack(
  mode: 'production' | 'development',
  options: NVueCompilerOptions
) {
  initModuleAliasOnce()
  return new Promise<webpack.Compiler>((resolve, reject) => {
    const compiler = webpack(createConfig(mode, options), (err, stats) => {
      if (err) {
        return reject(err.stack || err)
      }
      if (stats!.hasErrors()) {
        return reject(stats!.toString())
      }
      if (stats!.hasWarnings()) {
        const info = stats!.toJson({ all: false, warnings: true })
        console.warn(info.warnings)
      }
      if (process.env.DEBUG) {
        console.log(
          stats!.toString({
            all: false,
            assets: true,
            colors: true, // 在控制台展示颜色
            // timings: true,
          })
        )
      }
      resolve(compiler)
    })
  })
}

export function runWebpackBuild(options: NVueCompilerOptions = {}) {
  return runWebpack('production', options)
}

export function runWebpackDev(options: NVueCompilerOptions = {}) {
  return runWebpack('development', options)
}
