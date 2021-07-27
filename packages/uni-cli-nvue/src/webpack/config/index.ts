import { Configuration } from 'webpack'
import { optimization } from './optimization'
import { output } from './output'
import { module } from './module'
import { plugins } from './plugins'
export function createConfig(
  mode: 'production' | 'development'
): Configuration {
  return {
    target: 'node',
    mode: mode,
    devtool: false,
    watch: mode === 'development',
    entry() {
      return {}
    },
    externals: {
      vue: 'Vue',
    },
    optimization,
    output,
    module,
    plugins,
  }
}
