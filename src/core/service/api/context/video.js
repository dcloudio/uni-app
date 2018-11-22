function operateVideoPlayer (videoId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-video-' + videoId, {
    videoId,
    type,
    data
  }, pageId)
}

const RATES = [0.5, 0.8, 1.0, 1.25, 1.5]

class VideoContext {
  constructor (id, pageId) {
    this.id = id
    this.pageId = pageId
  }

  play () {
    operateVideoPlayer(this.id, this.pageId, 'play')
  }
  pause () {
    operateVideoPlayer(this.id, this.pageId, 'pause')
  }
  stop () {
    operateVideoPlayer(this.id, this.pageId, 'stop')
  }
  seek (position) {
    operateVideoPlayer(this.id, this.pageId, 'seek', {
      position
    })
  }
  sendDanmu ({
    text,
    color
  } = {}) {
    operateVideoPlayer(this.id, this.pageId, 'sendDanmu', {
      text,
      color
    })
  }
  playbackRate (rate) {
    if (!~RATES.indexOf(rate)) {
      rate = 1.0
    }
    operateVideoPlayer(this.id, this.pageId, 'playbackRate', {
      rate
    })
  }
  requestFullScreen () {
    operateVideoPlayer(this.id, this.pageId, 'requestFullScreen')
  }
  exitFullScreen () {
    operateVideoPlayer(this.id, this.pageId, 'exitFullScreen')
  }
  showStatusBar () {
    operateVideoPlayer(this.id, this.pageId, 'showStatusBar')
  }
  hideStatusBar () {
    operateVideoPlayer(this.id, this.pageId, 'hideStatusBar')
  }
}

export function createVideoContext (id, context) {
  if (context) {
    return new VideoContext(id, context.$page.id)
  }
  const app = getApp()
  if (app.$route && app.$route.params.__id__) {
    return new VideoContext(id, app.$route.params.__id__)
  } else {
    UniServiceJSBridge.emit('onError', 'createVideoContext:fail')
  }
}
