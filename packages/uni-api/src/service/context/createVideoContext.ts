import { ComponentPublicInstance } from 'vue'
import { getCurrentPageVm } from '@dcloudio/uni-core'
import { operateVideoPlayer } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  API_CREATE_VIDEO_CONTEXT,
  API_TYPE_CREATE_VIDEO_CONTEXT,
} from '../../protocols/context/context'

const RATES = [0.5, 0.8, 1.0, 1.25, 1.5, 2.0]

export class VideoContext {
  private id: string
  private vm: ComponentPublicInstance
  constructor(id: string, vm: ComponentPublicInstance) {
    this.id = id
    this.vm = vm
  }

  play() {
    operateVideoPlayer(this.id, this.vm, 'play')
  }

  pause() {
    operateVideoPlayer(this.id, this.vm, 'pause')
  }

  stop() {
    operateVideoPlayer(this.id, this.vm, 'stop')
  }

  seek(position?: number) {
    operateVideoPlayer(this.id, this.vm, 'seek', {
      position,
    })
  }

  sendDanmu(args: WechatMiniprogram.Danmu) {
    operateVideoPlayer(this.id, this.vm, 'sendDanmu', args)
  }

  playbackRate(rate: number) {
    if (!~RATES.indexOf(rate)) {
      rate = 1.0
    }
    operateVideoPlayer(this.id, this.vm, 'playbackRate', {
      rate,
    })
  }

  requestFullScreen(
    args: WechatMiniprogram.VideoContextRequestFullScreenOption = {}
  ) {
    operateVideoPlayer(this.id, this.vm, 'requestFullScreen', args)
  }

  exitFullScreen() {
    operateVideoPlayer(this.id, this.vm, 'exitFullScreen')
  }

  showStatusBar() {
    operateVideoPlayer(this.id, this.vm, 'showStatusBar')
  }

  hideStatusBar() {
    operateVideoPlayer(this.id, this.vm, 'hideStatusBar')
  }
}

export const createVideoContext = defineSyncApi<API_TYPE_CREATE_VIDEO_CONTEXT>(
  API_CREATE_VIDEO_CONTEXT,
  (id, context) => {
    if (context) {
      return new VideoContext(id, context)
    }
    return new VideoContext(id, getCurrentPageVm()!)
  }
)
