import {
  publishHandler
} from 'uni-platform/view/bridge'

export function disableScroll (evt) {
  evt.preventDefault()
}

export function pageScrollTo ({
  scrollTop,
  duration
}) {
  const documentElement = document.documentElement

  const {
    clientHeight,
    scrollHeight
  } = documentElement

  scrollTop = Math.min(scrollTop, scrollHeight - clientHeight)

  if (duration === 0) {
    documentElement.scrollTop = scrollTop
    return
  }

  if (window.scrollY === scrollTop) {
    return
  }

  function scrollTo (duration) {
    if (duration <= 0) {
      window.scrollTo(0, scrollTop)
      return
    }
    const distaince = scrollTop - window.scrollY
    requestAnimationFrame(function () {
      window.scrollTo(0, window.scrollY + distaince / duration * 10)
      scrollTo(duration - 10)
    })
  }

  scrollTo(duration)
  //  TODO 暂不使用 transform 会导致 fixed 元素不可见
  // 	const body = document.body
  // 	const bodyStyle = body.style
  //
  // 	function webkitTransitionEnd() {
  // 		bodyStyle.webkitTransition = ''
  // 		bodyStyle.webkitTransform = ''
  // 		documentElement.scrollTop = scrollTop
  // 		body.removeEventListener('webkitTransitionEnd', webkitTransitionEnd)
  // 	}
  //
  // 	body.addEventListener('webkitTransitionEnd', webkitTransitionEnd)
  // 	bodyStyle.webkitTransition = `-webkit-transform ${duration}ms ease-out`
  // 	bodyStyle.webkitTransform = `translateY(${documentElement.scrollTop}px) translateZ(0)`
}

export function createScrollListener (pageId, {
  enablePageScroll,
  enablePageReachBottom,
  onReachBottomDistance,
  enableTransparentTitleNView
}) {
  let ticking = false

  let hasReachBottom = false

  let onReachBottom = true

  function isReachBottom () {
    const {
      clientHeight,
      scrollHeight
    } = document.documentElement
    const scrollY = window.scrollY

    let isBottom = scrollY > 0 && scrollHeight > clientHeight && (scrollY + clientHeight + onReachBottomDistance) >=
			scrollHeight
    if (isBottom && !hasReachBottom) {
      hasReachBottom = true
      return true
    }

    if (!isBottom && hasReachBottom) {
      hasReachBottom = false
    }
    return false
  }

  function trigger () {
    // publish
    const scrollTop = window.pageYOffset
    if (enablePageScroll) { // 向 Service 发送 onPageScroll 事件
      publishHandler('onPageScroll', {
        scrollTop
      }, pageId)
    }

    if (enableTransparentTitleNView) {
      UniViewJSBridge.emit('onPageScroll', {
        scrollTop
      })
    }

    if (enablePageReachBottom && onReachBottom && isReachBottom()) {
      publishHandler('onReachBottom', {}, pageId)
      onReachBottom = false
      setTimeout(function () {
        onReachBottom = true
      }, 350)
    }
    ticking = false
  }

  return function onScroll () {
    if (!ticking) {
      requestAnimationFrame(trigger)
    }
    ticking = true
  }
}
