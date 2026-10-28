import path from 'path'
import { once } from '@dcloudio/uni-shared'

export const isInHBuilderX = once(() => {
  // 启动端应在加载编译器前传入工程类型，CLI 工程不能因 IDE 插件路径而使用内置环境。
  if (process.env.UNI_PROJECT_TYPE === 'cli') {
    return false
  }
  // 未传工程类型时，沿用引入 HX_PLUGIN_PATHS 之前的识别及根目录初始化逻辑。
  // 自动化测试传入了 HX_APP_ROOT(其实就是UNI_HBUILDERX_PLUGINS)
  if (process.env.HX_APP_ROOT) {
    process.env.UNI_HBUILDERX_PLUGINS = path.resolve(
      process.env.HX_APP_ROOT,
      'plugins'
    )
    return true
  }
  try {
    const { name } = require(path.resolve(
      process.cwd(),
      '../about/package.json'
    ))
    if (name === 'about') {
      process.env.UNI_HBUILDERX_PLUGINS = path.resolve(process.cwd(), '..')
      return true
    }
  } catch (e) {
    // console.error(e)
  }
  // 插件路径不代表工程类型；V 的独立插件布局由启动端显式传入 hbuilder。
  return process.env.UNI_PROJECT_TYPE === 'hbuilder'
})
