import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'

export function createOptimization(): Configuration['optimization'] {
  return {
    nodeEnv: false, // 禁用，由 define 统一设置
    moduleIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  }
}
