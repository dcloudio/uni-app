import { Configuration } from 'webpack'
import { createOptimization } from './optimization'
import { createOutput } from './output'
import { createModule } from './module'
import { createPlugins } from './plugins'
export function createConfig(
  mode: 'production' | 'development'
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
    optimization: createOptimization(),
    output: createOutput(),
    module: createModule(),
    plugins: createPlugins(),
  }
}
