import path from 'path'
import { Configuration } from 'webpack'
import { resolveMainPathOnce } from '@dcloudio/uni-cli-shared'
const inputDir = process.env.UNI_INPUT_DIR
export const resolve: Configuration['resolve'] = {
  extensions: ['.js', '.nvue', '.vue', '.json'],
  alias: {
    '@': inputDir,
    'uni-pages': path.resolve(inputDir, 'pages.json'),
    '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat'),
    'uni-app-style':
      resolveMainPathOnce(inputDir) +
      '?' +
      JSON.stringify({
        type: 'appStyle',
      }),
    'uni-stat-config':
      path.resolve(inputDir, 'pages.json') +
      '?' +
      JSON.stringify({
        type: 'stat',
      }),
  },
  modules: [
    'node_modules',
    path.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
    path.resolve(inputDir, 'node_modules'),
  ],
}
