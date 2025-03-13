
module.exports = {
  sS: function (newValue, oldValue, _ownerInstance, instance) {
    if (newValue) {
      instance.setStyle(newValue)
    }
  },
  sA: function (newValue, oldValue, _ownerInstance, instance) {
    if (newValue) {
      handleStartAnimation(newValue, _ownerInstance, instance)
    }
  },
}

function handleStartAnimation(newValue, _ownerInstance, instance) {
  var info = {}
  info = JSON.parse(newValue)
  var element = _ownerInstance.selectComponent('#' + info.id)

  // playState leftTimes
  var state = element.getState()
  state.playState = info.playState

  var startTime = null

  state.leftTimes = info.options.iterations || 1
  var currentStep = 0

  var duration =
    info.options.direction === 'alternate'
      ? info.options.duration * 2
      : info.options.duration

  function interpolateKeyframe(keyframes, usedTime) {
    var index = 0
    for (var i = 0; i < keyframes.length; i++) {
      if (keyframes[i]._startTime + keyframes[i]._duration >= usedTime) {
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

  function step() {
    var isCancelled = state.playState === 'cancel'
    var currentTime = Date.now()
    if (startTime === null) {
      startTime = currentTime
    }
    var elapsedTime = currentTime - startTime

    if (isCancelled) {
      var lastFrame = info.keyframes[info.keyframes.length - 1]
      lastFrame.transition = 'none'
      element.setStyle(lastFrame)
      element.removeClass('__ct' + currentStep)
      return
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
      if (state.leftTimes > 1) {
        state.leftTimes--
        startTime = null
        instance.requestAnimationFrame(step)
        return
      } else if (state.leftTimes === -1) {
        // handle infinite
        startTime = null
        instance.requestAnimationFrame(step)
      }
    }
  }

  instance.requestAnimationFrame(step)
}
