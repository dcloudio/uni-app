import {
  warpPlusMethod
} from '../util'

export const getVideoInfo = warpPlusMethod('io', 'getVideoInfo', options => {
  options.filePath = options.src
  return options
}, data => {
  return {
    duration: data.duration,
    fps: data.fps || 30,
    height: data.height,
    width: data.width,
    size: data.size
  }
})
