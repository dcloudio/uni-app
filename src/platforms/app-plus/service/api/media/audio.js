import {
  getRealPath
} from '../util'

import {
  invoke
} from '../../bridge'

const RECORD_TIME = 60 * 60 * 1000

let recorder
let recordTimeout

export function startRecord (args, callbackId) {
  recorder && recorder.stop()
  recorder = plus.audio.getRecorder()
  recorder.record({
    filename: '_doc/audio/',
    format: 'aac'
  }, (res) => {
    invoke(callbackId, {
      errMsg: 'startRecord:ok',
      tempFilePath: res
    })
  }, (res) => {
    invoke(callbackId, {
      errMsg: 'startRecord:fail'
    })
  })
  recordTimeout = setTimeout(() => {
    recorder.stop()
    recorder = false
  }, RECORD_TIME)
}

export function stopRecord () {
  if (recorder) {
    recordTimeout && clearTimeout(recordTimeout)
    recorder.stop()
    return {
      errMsg: 'stopRecord:ok'
    }
  }
  return {
    errMsg: 'stopRecord:fail'
  }
}

let player
let playerFilePath
let playerStatus

export function playVoice ({
  filePath
} = {}, callbackId) {
  if (player && playerFilePath === filePath && playerStatus === 'pause') { // 如果是当前音频被暂停，则继续播放
    playerStatus = 'play'
    player.play((res) => {
      player = false
      playerFilePath = false
      playerStatus = false
      invoke(callbackId, {
        errMsg: 'playVoice:ok'
      })
    })
    return {
      errMsg: 'playVoice:ok'
    }
  }
  if (player) { // 如果存在音频播放，则停止
    player.stop()
  }
  playerFilePath = filePath
  playerStatus = 'play'
  player = plus.audio.createPlayer(getRealPath(filePath))
  // 播放操作成功回调
  player.play((res) => {
    player = false
    playerFilePath = false
    playerStatus = false
    invoke(callbackId, {
      errMsg: 'playVoice:ok'
    })
  })
}

export function pauseVoice () {
  if (player && playerStatus === 'play') {
    player.pause()
    playerStatus = 'pause'
  }
  return {
    errMsg: 'pauseVoice:ok'
  }
}

export function stopVoice () {
  if (player) {
    player.stop()
    player = false
    playerFilePath = false
    playerStatus = false
  }
  return {
    errMsg: 'stopVoice:ok'
  }
}
