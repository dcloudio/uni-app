import path from 'path'
import { once } from '@dcloudio/uni-shared'

export const isInHBuilderX = once(() => {
  const { UNI_HBUILDERX_PLUGINS } = process.env
  try {
    const { name } = require(path.resolve(
      UNI_HBUILDERX_PLUGINS,
      'about/package.json'
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
