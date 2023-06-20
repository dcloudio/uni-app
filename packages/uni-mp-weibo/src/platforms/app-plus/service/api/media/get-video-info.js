import {
  warpPlusMethod
} from '../util'

export const getVideoInfo = warpPlusMethod('io', 'getVideoInfo', options => {
  options.filePath = options.src
  return options
}, data => {
  return {
    orientation: data.orientation,
    type: data.type,
    duration: data.duration,
    size: data.size / 1024,
    height: data.height,
    width: data.width,
    fps: data.fps || 30,
    bitrate: data.bitrate
  }
})
