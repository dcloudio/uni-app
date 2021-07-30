import path from 'path'
import { normalizePath } from '@dcloudio/uni-cli-shared'
const TIPS = `条件编译失败,参考示例(注意 ifdef 与 endif 必须配对使用):`
const ERRORS = {
  html: `${TIPS}
  <!--  #ifdef  %PLATFORM% -->
  模板代码
  <!--  #endif -->
  `,
  js: `${TIPS}
  // #ifdef  %PLATFORM%
  js代码
  // #endif
  `,
  css: `${TIPS}
  /*  #ifdef  %PLATFORM%  */
  css代码
  /*  #endif  */
  `,
  json: `${TIPS}
  // #ifdef  %PLATFORM%
  json代码
  // #endif
  `,
}

export function normalizePreprocessErrMsg(
  type: 'js' | 'html' | 'css' | 'json',
  filepath: string
) {
  return `${ERRORS[type]} at ${normalizePath(
    path.relative(process.env.UNI_INPUT_DIR, filepath)
  )}:1`
}
