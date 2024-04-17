import {
  API_GET_VIDEO_INFO,
  type API_TYPE_GET_VIDEO_INFO,
  GetVideoInfoOptions,
  GetVideoInfoProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'

import { urlToFile } from '../../../helpers/file'

export const getVideoInfo = defineAsyncApi<API_TYPE_GET_VIDEO_INFO>(
  API_GET_VIDEO_INFO,
  ({ src }, { resolve, reject }) => {
    urlToFile(src, true)
      .then((file) => {
        return file
      })
      .catch(() => {
        return null
      })
      .then((file) => {
        const video = document.createElement('video')
        if (video.onloadedmetadata !== undefined) {
          // 部分浏览器（如微信内置浏览器）未播放无法触发loadedmetadata事件
          const handle = setTimeout(
            () => {
              video.onloadedmetadata = null
              video.onerror = null
              reject()
            },
            src.startsWith('data:') || src.startsWith('blob:') ? 300 : 3000
          )
          // 尝试获取视频的宽高信息
          video.onloadedmetadata = function () {
            clearTimeout(handle)
            video.onerror = null
            resolve({
              size: file ? file.size : 0,
              duration: video.duration || 0,
              width: video.videoWidth || 0,
              height: video.videoHeight || 0,
            })
          }
          video.onerror = function () {
            clearTimeout(handle)
            video.onloadedmetadata = null
            reject()
          }
          video.src = src
        } else {
          reject()
        }
      })
  },
  GetVideoInfoProtocol,
  GetVideoInfoOptions
)
