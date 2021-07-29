import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'

export const optimization: Configuration['optimization'] = {
  nodeEnv: false, // 禁用，由 define 统一设置
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
