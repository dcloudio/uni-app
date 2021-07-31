import { Configuration } from 'webpack'
import { createOptimization } from './optimization'
import { createOutput } from './output'
import { createModule } from './module'
import { createPlugins } from './plugins'
import { createResolve } from './resolve'
export function createConfig(
  mode: 'production' | 'development',
  options: NVueCompilerOptions
): Configuration {
  return {
    mode: mode,
    devtool: false,
    watch: mode === 'development',
    entry() {
      return process.UNI_NVUE_ENTRY
    },
    externals: {
      vue: 'Vue',
    },
    module: createModule(options),
    optimization: createOptimization(),
    output: createOutput(),
    resolve: createResolve(),
    plugins: createPlugins(),
  }
}
