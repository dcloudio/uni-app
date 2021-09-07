import path from 'path'
import { normalizePath } from '@dcloudio/uni-cli-shared'

import { RuleSetRule } from 'webpack'

export function createFileLoader(): RuleSetRule {
  return {
    test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath(_url: string, resourcePath: string) {
            return (
              '/' +
              normalizePath(
                path.relative(process.env.UNI_INPUT_DIR, resourcePath)
              )
            )
          },
          outputPath(_url: string, resourcePath: string) {
            return normalizePath(
              path.relative(process.env.UNI_INPUT_DIR, resourcePath)
            )
          },
        },
      },
    ],
  }
}
