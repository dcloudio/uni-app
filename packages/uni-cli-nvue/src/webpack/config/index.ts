import path from 'path'
import { Configuration } from 'webpack'
import { createOptimization } from './optimization'
import { createOutput } from './output'
import { createModule } from './module'
import { createPlugins } from './plugins'
import { createResolve } from './resolve'
import { createEntry } from './entry'
import { NVueCompilerOptions } from '../../types'
export function createConfig(
  mode: 'production' | 'development',
  options: NVueCompilerOptions
): Configuration {
  return {
    mode: mode,
    devtool: false,
    watch: mode === 'development',
    entry: createEntry(),
    externals: {
      vue: 'Vue',
    },
    module: createModule(options),
    optimization: createOptimization(),
    output: createOutput(),
    resolve: createResolve(),
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, '../../../', 'node_modules'),
      ],
    },
    plugins: createPlugins(),
  }
}
