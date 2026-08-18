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
  c: cls,
  h: hoverClass,
}

var CLASS_MASK_APP = 1
var CLASS_MASK_PAGE = 1 << 1
var CLASS_MASK_COMPONENT = 1 << 2

function pushClass (result, seen, token, mask, keepRaw) {
  if (!token) return
  var type = token.charCodeAt(1)
  // 已带内部前缀的 class 来自上一次展开，直接保留以保证组件转发时幂等。
  if (
    token.charCodeAt(0) === 45 &&
    token.charCodeAt(2) === 45 &&
    (type === 97 || type === 112 || type === 99)
  ) {
    pushUniqueClass(result, seen, token)
    return
  }
  if (keepRaw) pushUniqueClass(result, seen, token)
  if (mask & CLASS_MASK_APP) pushUniqueClass(result, seen, '-a-' + token)
  if (mask & CLASS_MASK_PAGE) pushUniqueClass(result, seen, '-p-' + token)
  if (mask & CLASS_MASK_COMPONENT) pushUniqueClass(result, seen, '-c-' + token)
}

function pushUniqueClass (result, seen, token) {
  var key = '$' + token
  if (seen[key]) return
  seen[key] = true
  result.push(token)
}

function cls (value, mask, keepRaw) {
  if (!value) return ''
  keepRaw = keepRaw !== 0
  var result = []
  var seen = {}
  var input = '' + value
  var start = -1
  // 与支付宝 SJS 保持一致，单次扫描 HTML 空白字符完成分词。
  for (var i = 0; i <= input.length; i++) {
    var code = i < input.length ? input.charCodeAt(i) : 32
    var isSpace = code === 32 || code === 9 || code === 10 || code === 13 || code === 12
    if (isSpace) {
      if (start !== -1) {
        pushClass(result, seen, input.slice(start, i), mask, keepRaw)
        start = -1
      }
    } else if (start === -1) {
      start = i
    }
  }
  return result.join(' ')
}

function hoverClass (value, mask) {
  // 与支付宝 SJS 保持一致，none 必须原样返回才能关闭 hover 效果。
  return value === 'none' ? value : cls(value, mask)
}

function handleStartAnimation (newValue, _ownerInstance, instance) {
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

  function interpolateKeyframe (keyframes, usedTime) {
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

  function step () {
    var isCancelled = state.playState === 'idle'
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
