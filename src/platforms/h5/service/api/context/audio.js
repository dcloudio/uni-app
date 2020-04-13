function operateAudioPlayer (audioId, pageId, type, data) {
  UniServiceJSBridge.publishHandler(pageId + '-audio-' + audioId, {
    audioId,
    type,
    data
  }, pageId)
}

class AudioContext {
  constructor (id, pageId) {
    this.id = id
    this.pageId = pageId
  }

  setSrc (src) {
    operateAudioPlayer(this.id, this.pageId, 'setSrc', {
      src
    })
  }

  play () {
    operateAudioPlayer(this.id, this.pageId, 'play')
  }

  pause () {
    operateAudioPlayer(this.id, this.pageId, 'pause')
  }

  stop () {
    operateAudioPlayer(this.id, this.pageId, 'stop')
  }

  seek (position) {
    operateAudioPlayer(this.id, this.pageId, 'seek', {
      position
    })
  }
}

export function createAudioContext (id, context) {
  if (context) {
    return new AudioContext(id, context.$page.id)
  }
  const app = getApp()
  if (app.$route && app.$route.params.__id__) {
    return new AudioContext(id, app.$route.params.__id__)
  } else {
    UniServiceJSBridge.emit('onError', 'createAudioContext:fail')
  }
}
