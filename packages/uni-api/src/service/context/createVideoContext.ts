import { getPageIdByVm, getCurrentPageVm } from '@dcloudio/uni-core'
import { operateVideoPlayer } from '@dcloudio/uni-platform'
import { defineSyncApi } from '../../helpers/api'
import {
  API_CREATE_VIDEO_CONTEXT,
  API_TYPE_CREATE_VIDEO_CONTEXT,
} from '../../protocols/context/context'

const RATES = [0.5, 0.8, 1.0, 1.25, 1.5, 2.0]

export class VideoContext {
  private id: string
  private pageId: number
  constructor(id: string, pageId: number) {
    this.id = id
    this.pageId = pageId
  }

  play() {
    operateVideoPlayer(this.id, this.pageId, 'play')
  }

  pause() {
    operateVideoPlayer(this.id, this.pageId, 'pause')
  }

  stop() {
    operateVideoPlayer(this.id, this.pageId, 'stop')
  }

  seek(position?: number) {
    operateVideoPlayer(this.id, this.pageId, 'seek', {
      position,
    })
  }

  sendDanmu(args: WechatMiniprogram.Danmu) {
    operateVideoPlayer(this.id, this.pageId, 'sendDanmu', args)
  }

  playbackRate(rate: number) {
    if (!~RATES.indexOf(rate)) {
      rate = 1.0
    }
    operateVideoPlayer(this.id, this.pageId, 'playbackRate', {
      rate,
    })
  }

  requestFullScreen(
    args: WechatMiniprogram.VideoContextRequestFullScreenOption = {}
  ) {
    operateVideoPlayer(this.id, this.pageId, 'requestFullScreen', args)
  }

  exitFullScreen() {
    operateVideoPlayer(this.id, this.pageId, 'exitFullScreen')
  }

  showStatusBar() {
    operateVideoPlayer(this.id, this.pageId, 'showStatusBar')
  }

  hideStatusBar() {
    operateVideoPlayer(this.id, this.pageId, 'hideStatusBar')
  }
}

export const createVideoContext = defineSyncApi<API_TYPE_CREATE_VIDEO_CONTEXT>(
  API_CREATE_VIDEO_CONTEXT,
  (id, context) => {
    if (context) {
      return new VideoContext(id, getPageIdByVm(context)!)
    }
    return new VideoContext(id, getPageIdByVm(getCurrentPageVm()!)!)
  }
)
