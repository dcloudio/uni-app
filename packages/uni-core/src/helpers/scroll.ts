export interface CreateScrollListenerOptions {
  onPageScroll?: (scrollTop: number) => void
  onReachBottom?: () => void
  onReachBottomDistance?: number
}
export function disableScrollListener(evt: Event) {
  evt.preventDefault()
}
// 不直接声明为 number，可能跟 node.setTimeout 有冲突
let testReachBottomTimer: ReturnType<typeof setTimeout>
let lastScrollHeight = 0
export function createScrollListener({
  onPageScroll,
  onReachBottom,
  onReachBottomDistance,
}: CreateScrollListenerOptions) {
  let ticking = false
  let hasReachBottom = false
  let reachBottomLocking = true
  const isReachBottom = () => {
    const { scrollHeight } = document.documentElement
    // 部分浏览器窗口高度变化后document.documentelement.clientheight不会变化，采用window.innerHeight
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY
    const isBottom =
      scrollY > 0 &&
      scrollHeight > windowHeight &&
      scrollY + windowHeight + onReachBottomDistance! >= scrollHeight
    // 兼容部分浏览器滚动时scroll事件不触发
    const heightChanged =
      Math.abs(scrollHeight - lastScrollHeight) > onReachBottomDistance!
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
  const trigger = () => {
    onPageScroll && onPageScroll(window.pageYOffset)
    function testReachBottom() {
      if (isReachBottom()) {
        onReachBottom && onReachBottom()
        reachBottomLocking = false
        setTimeout(function () {
          reachBottomLocking = true
        }, 350)
        return true
      }
    }
    if (onReachBottom && reachBottomLocking) {
      if (testReachBottom()) {
      } else {
        // 解决部分浏览器滚动中js获取窗口高度不准确导致的问题
        testReachBottomTimer = setTimeout(testReachBottom, 300)
      }
    }
    ticking = false
  }

  return function onScroll() {
    clearTimeout(testReachBottomTimer)
    if (!ticking) {
      requestAnimationFrame(trigger)
    }
    ticking = true
  }
}
