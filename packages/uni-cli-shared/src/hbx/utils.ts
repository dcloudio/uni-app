import path from 'path'
import { once } from '@dcloudio/uni-shared'

export const isInHBuilderX = once(() => {
  // 自动化测试传入了 HX_APP_ROOT(其实就是UNI_HBUILDERX_PLUGINS)
  if (process.env.HX_APP_ROOT) {
    process.env.UNI_HBUILDERX_PLUGINS = process.env.HX_APP_ROOT + '/plugins'
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
  return false
})
