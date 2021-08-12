import path from 'path'
import { once } from '@dcloudio/uni-shared'

export const isInHBuilderX = once(() => {
  try {
    const { name } = require(path.resolve(
      process.cwd(),
      '../about/package.json'
    ))
    return name === 'about'
  } catch (e) {
    // console.error(e)
  }
  return false
})

export const runByHBuilderX = once(() => {
  return !!process.env.UNI_HBUILDERX_PLUGINS
})
