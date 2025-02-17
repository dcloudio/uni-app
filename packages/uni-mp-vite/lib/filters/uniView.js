module.exports = {
  sS: function (newValue, oldValue, _ownerInstance, instance) {
    if (newValue) {
      instance.setStyle(newValue)
    }
  },
  sA: function (newValue, oldValue, _ownerInstance, instance) {
    if (!newValue) {
      return
    }
    var info = {}
    info = JSON.parse(newValue)
    var element = _ownerInstance.selectComponent('#' + info.id)

    var state = element.getState()
    state.playState = info.playState

    var startTime = null
    var pauseTime = null

    var iterations = info.options.iterations || 1
    var duration = info.options.duration

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
      var isCancelled = state.playState === 'cancel'
      var currentTime = Date.now()
      if (startTime === null) {
        startTime = currentTime
      }
      var elapsedTime = currentTime - startTime

      if (isCancelled) {
        if (pauseTime === null) {
          pauseTime = currentTime
        }
        return // 如果动画暂停，直接返回
      } else if (pauseTime !== null) {
        elapsedTime -= currentTime - pauseTime // 减去暂停的时间
        pauseTime = null
      }
      var res = interpolateKeyframe(info.keyframes, elapsedTime)

      // currentStep removeClass
      if (!element.hasClass('__ct' + res.index) && elapsedTime < duration) {
        element.setStyle(res.style).addClass('__ct' + res.index)
      }
      if (currentStep !== res.index) {
        element.removeClass('__ct' + currentStep)
        currentStep = res.index
      }

      if (elapsedTime <= duration) {
        instance.requestAnimationFrame(step)
      } else {
        // done
        // element.callMethod('animationEnd')
      }
    }

    instance.requestAnimationFrame(step)
  },
}
