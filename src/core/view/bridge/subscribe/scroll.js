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
    // 部分浏览器（比如微信）中 scrollTop 的值需要通过 document.body 来控制
    documentElement.scrollTop = document.body.scrollTop = scrollTop
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

let testReachBottomTimer
let lastScrollHeight = 0

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
      scrollHeight
    } = document.documentElement
    // 部分浏览器窗口高度变化后document.documentelement.clientheight不会变化，采用window.innerHeight
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY
    let isBottom = scrollY > 0 && scrollHeight > windowHeight && (scrollY + windowHeight + onReachBottomDistance) >= scrollHeight
    // 兼容部分浏览器滚动时scroll事件不触发
    const heightChanged = Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance
    if (isBottom && (!hasReachBottom || heightChanged)) {
      lastScrollHeight = scrollHeight
      hasReachBottom = true
      return true
    }

    if (!isBottom && hasReachBottom) {
      hasReachBottom = false
    }
    return false
  }

  function trigger () {
    const pages = getCurrentPages()
    if (!pages.length || pages[pages.length - 1].$page.id !== pageId) {
      return
    }
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
    function testReachBottom () {
      if (isReachBottom()) {
        publishHandler('onReachBottom', {}, pageId)
        onReachBottom = false
        setTimeout(function () {
          onReachBottom = true
        }, 350)
        return true
      }
    }
    if (enablePageReachBottom && onReachBottom) {
      if (testReachBottom()) {
      } else {
        // 解决部分浏览器滚动中js获取窗口高度不准确导致的问题
        testReachBottomTimer = setTimeout(testReachBottom, 300)
      }
    }
    ticking = false
  }

  return function onScroll () {
    clearTimeout(testReachBottomTimer)
    if (!ticking) {
      requestAnimationFrame(trigger)
    }
    ticking = true
  }
}
