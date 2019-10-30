import {
  invokeMethod,
  getCurrentPageVm
} from '../../platform'

const RATES = [0.5, 0.8, 1.0, 1.25, 1.5, 2.0]

function operateVideoPlayer (videoId, pageVm, type, data) {
  invokeMethod('operateVideoPlayer', videoId, pageVm, type, data)
}

class VideoContext {
  constructor (id, pageVm) {
    this.id = id
    this.pageVm = pageVm
  }

  play () {
    operateVideoPlayer(this.id, this.pageVm, 'play')
  }
  pause () {
    operateVideoPlayer(this.id, this.pageVm, 'pause')
  }
  stop () {
    operateVideoPlayer(this.id, this.pageVm, 'stop')
  }
  seek (position) {
    operateVideoPlayer(this.id, this.pageVm, 'seek', {
      position
    })
  }
  sendDanmu (args) {
    operateVideoPlayer(this.id, this.pageVm, 'sendDanmu', args)
  }
  playbackRate (rate) {
    if (!~RATES.indexOf(rate)) {
      rate = 1.0
    }
    operateVideoPlayer(this.id, this.pageVm, 'playbackRate', {
      rate
    })
  }
  requestFullScreen (args) {
    operateVideoPlayer(this.id, this.pageVm, 'requestFullScreen', args)
  }
  exitFullScreen () {
    operateVideoPlayer(this.id, this.pageVm, 'exitFullScreen')
  }
  showStatusBar () {
    operateVideoPlayer(this.id, this.pageVm, 'showStatusBar')
  }
  hideStatusBar () {
    operateVideoPlayer(this.id, this.pageVm, 'hideStatusBar')
  }
}

export function createVideoContext (id, context) {
  if (context) {
    return new VideoContext(id, context)
  }
  return new VideoContext(id, getCurrentPageVm('createVideoContext'))
}
