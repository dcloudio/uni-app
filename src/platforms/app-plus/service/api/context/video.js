export function operateVideoPlayer ({
  data,
  videoPlayerId,
  type
}) {
  const nativeVideo = plus.video.getVideoPlayerById(videoPlayerId + '')
  if (nativeVideo) {
    switch (type) {
      case 'play':
      case 'pause':
      case 'stop':
      case 'requestFullScreen':
      case 'exitFullScreen':
      case 'seek':
      case 'playbackRate':
      case 'showStatusBar':
        nativeVideo[type].apply(nativeVideo, data)
        return {
          errMsg: 'operateVideoPlayer:ok'
        }
      case 'sendDanmu':
        nativeVideo.sendDanmu({
          text: data[0],
          color: data[1]
        })
        return {
          errMsg: 'operateVideoPlayer:ok'
        }
      default:
        return {
          errMsg: 'operateVideoPlayer:fail:暂不支持[' + type + ']'
        }
    }
  } else {
    return {
      errMsg: 'operateVideoPlayer:fail:视频组件[' + videoPlayerId + ']不存在'
    }
  }
}
