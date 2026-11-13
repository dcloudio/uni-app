export interface CreateScrollListenerOptions {
  onPageScroll?: (scrollTop: number) => void
  onReachBottom?: () => void
  onReachBottomDistance?: number
  scrollElement?: HTMLElement
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
  scrollElement,
}: CreateScrollListenerOptions) {
  let ticking = false
  let hasReachBottom = false
  let reachBottomLocking = true
  let elementLastScrollHeight = 0
  let elementTestReachBottomTimer: ReturnType<typeof setTimeout>
  let unlockTimer: ReturnType<typeof setTimeout>
  let frame: number | undefined
  let disposed = false
  const isReachBottom = () => {
    const { scrollHeight } = scrollElement || document.documentElement
    // 部分浏览器窗口高度变化后document.documentelement.clientheight不会变化，采用window.innerHeight
    const windowHeight = scrollElement
      ? scrollElement.clientHeight
      : window.innerHeight
    const scrollY = scrollElement ? scrollElement.scrollTop : window.scrollY
    const isBottom =
      scrollY > 0 &&
      scrollHeight > windowHeight &&
      scrollY + windowHeight + onReachBottomDistance! >= scrollHeight
    // 兼容部分浏览器滚动时scroll事件不触发
    const heightChanged =
      Math.abs(
        scrollHeight -
          (scrollElement ? elementLastScrollHeight : lastScrollHeight)
      ) > onReachBottomDistance!
    if (isBottom && (!hasReachBottom || heightChanged)) {
      if (scrollElement) {
        elementLastScrollHeight = scrollHeight
      } else {
        lastScrollHeight = scrollHeight
      }
      hasReachBottom = true
      return true
    }

    if (!isBottom && hasReachBottom) {
      hasReachBottom = false
    }
    return false
  }
  const trigger = () => {
    if (disposed) {
      return
    }
    onPageScroll &&
      onPageScroll(scrollElement ? scrollElement.scrollTop : window.pageYOffset)
    function testReachBottom() {
      if (isReachBottom()) {
        onReachBottom && onReachBottom()
        reachBottomLocking = false
        unlockTimer = setTimeout(function () {
          reachBottomLocking = true
        }, 350)
        return true
      }
    }
    if (onReachBottom && reachBottomLocking) {
      if (testReachBottom()) {
      } else {
        // 解决部分浏览器滚动中js获取窗口高度不准确导致的问题
        if (scrollElement) {
          elementTestReachBottomTimer = setTimeout(testReachBottom, 300)
        } else {
          testReachBottomTimer = setTimeout(testReachBottom, 300)
        }
      }
    }
    ticking = false
  }

  function onScroll() {
    clearTimeout(
      scrollElement ? elementTestReachBottomTimer : testReachBottomTimer
    )
    if (!ticking) {
      frame = requestAnimationFrame(trigger)
    }
    ticking = true
  }
  onScroll.dispose = () => {
    disposed = true
    if (frame !== undefined) {
      cancelAnimationFrame(frame)
    }
    clearTimeout(unlockTimer)
    clearTimeout(
      scrollElement ? elementTestReachBottomTimer : testReachBottomTimer
    )
  }
  return onScroll
}
