module.exports = {
  sS: function (newValue, oldValue, _ownerInstance, instance) {
    if (newValue) {
      instance.setStyle(newValue)
    }
  },
  sA: function (newValue, oldValue, _ownerInstance, instance) {
    var info = {}
    info = JSON.parse(newValue)

    if (!info) {
      return
    }

    var state = _ownerInstance.getState()
    state.duration = duration

    var startTime = null
    var pauseTime = null
    var isPaused = false
    var isCancelled = false

    var duration =
      info.keyframes[info.keyframes.length - 1]._startTime +
      info.keyframes[info.keyframes.length - 1]._duration
    if (!newValue) {
      return
    }

    function interpolateKeyframe(keyframes, usedTime) {
      var index = 0
      for (var i = 0; i < keyframes.length; i++) {
        if (keyframes[i]._startTime + keyframes[i]._duration > usedTime) {
          index = i
          break
        }
      }
      var currentFrame = keyframes[index]
      return {
        style: currentFrame,
        index: index,
      }
    }
    var currentStep = 0

    function step() {
      var currentTime = Date.now()
      if (startTime === null) {
        startTime = currentTime
      }
      var elapsedTime = currentTime - startTime

      if (isPaused) {
        if (pauseTime === null) {
          pauseTime = currentTime
        }
        return // 如果动画暂停，直接返回
      } else if (pauseTime !== null) {
        elapsedTime -= currentTime - pauseTime // 减去暂停的时间
        pauseTime = null
      }
      var res = interpolateKeyframe(info.keyframes, elapsedTime)
      var element = _ownerInstance.selectComponent('#' + info.id)

      // currentStep removeClass
      if (!element.hasClass('__ct' + res.index) && elapsedTime < duration) {
        // res.css._duration = undefined
        delete res.css._duration
        element.setStyle(res.style).addClass('__ct' + res.index)
      }
      if (currentStep !== res.index) {
        element.removeClass('__ct' + currentStep)
        currentStep = res.index
      }

      if (elapsedTime <= duration) {
        // console.log('go on')
        instance.requestAnimationFrame(step)
      } else {
        console.log('done')
      }
    }

    instance.requestAnimationFrame(step)
  },
}
