import { WebpackError } from 'webpack'
import {
  installHBuilderXPlugin,
  formatInstallHBuilderXPluginTips,
  isInHBuilderX,
} from '@dcloudio/uni-cli-shared'
const preprocessors = ['compile-dart-sass', 'compile-less', 'compile-stylus']
export function formatErrors(errors: WebpackError[]) {
  return errors
    .filter(({ message }) => {
      if (isInHBuilderX()) {
        const preprocessor = preprocessors.find((preprocessor) =>
          message.includes(preprocessor)
        )
        if (preprocessor) {
          installHBuilderXPlugin(preprocessor)
          const langs = preprocessor.split('-')
          console.error(
            formatInstallHBuilderXPluginTips(
              langs[langs.length - 1],
              preprocessor
            )
          )
          return false
        }
      }
      return true
    })
    .join('\n')
}
