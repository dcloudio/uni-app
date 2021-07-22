import TerserPlugin from 'terser-webpack-plugin'
import { Configuration } from 'webpack'

export const optimization: Configuration['optimization'] = {
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
