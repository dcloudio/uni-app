import { basename, dirname } from 'path'
import { readFileSync } from 'fs-extra'
import {
  genUTSClassName,
  initPreContext,
  normalizePath,
} from '@dcloudio/uni-cli-shared'
import { parse } from '@dcloudio/uni-nvue-styler'

import { transformMain as transformAndroid } from './plugins/android/uvue/sfc/main'

/**
 * 需要需要确保 vue 文件是处理过条件编译的
 * @param platform
 * @param vueFileName
 * @returns
 */
export async function transformExtApiVueFile(
  platform: 'app-android' | 'app-ios', // | 'app-harmony',
  vueFileName: string
) {
  vueFileName = normalizePath(vueFileName)
  initPreContext(
    platform === 'app-android' || platform === 'app-ios' ? 'app' : platform,
    process.env.UNI_CUSTOM_CONTEXT,
    platform,
    true
  )
  const code = readFileSync(vueFileName, 'utf8')

  if (platform === 'app-android') {
    return transformAppAndroidExtApiComponent(vueFileName, code)
  } else if (platform === 'app-ios') {
    return transformAppIosExtApiComponent(vueFileName, code)
  }
}

async function transformAppAndroidExtApiComponent(
  vueFileName: string,
  code: string
) {
  const result = await transformAndroid(code, vueFileName, {
    root: dirname(vueFileName),
    targetLanguage: 'kotlin',
    classNamePrefix: 'Uni',
    genDefaultAs: '__sfc__',
    sourceMap: false,
    componentType: 'component',
  })
  if (!result) {
    return null
  }
  const { errors, uts, descriptor } = result
  if (errors.length > 0) {
    throw new Error(errors.join('\n'))
  }
  const componentName = basename(vueFileName).split('.')[0]
  const styleCode = await parseAppAndroidVueStyle(
    componentName,
    vueFileName,
    descriptor.styles.length > 0 ? descriptor.styles[0].content : ''
  )

  return uts.replace(
    `/*${genUTSClassName(componentName, 'Uni')}Styles*/`,
    styleCode
  )
}

async function transformAppIosExtApiComponent(
  vueFileName: string,
  code: string
) {
  // TODO 编译vue为一个独立的js文件
}

async function parseAppAndroidVueStyle(
  name: string,
  vueFileName: string,
  cssCode: string
) {
  if (!cssCode) {
    return `const ${genUTSClassName(name, 'Uni')}Styles = []`
  }
  const { code, messages } = await parse(cssCode, {
    filename: vueFileName,
    logLevel: 'ERROR',
    map: true,
    ts: true,
    type: 'uvue',
    platform: 'app-android',
  })
  if (messages.length) {
    messages.forEach((m) => {
      console.error(m)
    })
  }
  return `const ${genUTSClassName(name, 'Uni')}Styles = [${code}]`
}
