import TerserPlugin from 'terser-webpack-plugin'
import { Configuration, WebpackPluginInstance } from 'webpack'

export function createOptimization(): Configuration['optimization'] {
  return {
    nodeEnv: false, // 禁用，由 define 统一设置
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }) as unknown as WebpackPluginInstance,
    ],
  }
}
