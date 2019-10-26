import {
  operateVideoPlayer as operateVueVideoPlayer
} from 'uni-platforms/h5/service/api/context/operate-video-player'
import {
  operateVideoPlayer as operateNVueVideoPlayer
} from 'uni-platforms/app-plus-nvue/service/api/context/operate-video-player'

export function operateVideoPlayer (videoId, pageVm, type, data) {
  pageVm.$page.meta.isNVue
    ? operateNVueVideoPlayer(videoId, pageVm, type, data)
    : operateVueVideoPlayer(videoId, pageVm, type, data)
}
