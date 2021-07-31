import path from 'path'
import { Configuration } from 'webpack'
// import { resolveMainPathOnce } from '@dcloudio/uni-cli-shared'
export function createResolve(): Configuration['resolve'] {
  const inputDir = process.env.UNI_INPUT_DIR
  return {
    extensions: ['.js', '.nvue', '.vue', '.json'],
    alias: {
      '@': inputDir,
      // '@dcloudio/uni-stat': require.resolve('@dcloudio/uni-stat')
      // 'uni-app-style':
      //   resolveMainPathOnce(inputDir) +
      //   '?' +
      //   JSON.stringify({
      //     type: 'appStyle'
      //   })
    },
    modules: [
      'node_modules',
      path.resolve(process.env.UNI_CLI_CONTEXT, 'node_modules'),
      path.resolve(inputDir, 'node_modules'),
    ],
  }
}
