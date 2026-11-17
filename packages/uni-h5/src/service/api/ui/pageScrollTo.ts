import {
  API_PAGE_SCROLL_TO,
  type API_TYPE_PAGE_SCROLL_TO,
  PageScrollToOptions,
  PageScrollToProtocol,
  defineAsyncApi,
} from '@dcloudio/uni-api'
import { scrollTo } from '@dcloudio/uni-shared'
//#if _X_VAPOR_
import { getCurrentPage } from '@dcloudio/uni-core'
import { getPageBody } from '../../../helpers/pageBody'
import { normalizePageSelector } from '../../../helpers/pageSelector'

const pageScrollFrames = new WeakMap<HTMLElement, number>()

function animatePageBodyScroll(
  pageBody: HTMLElement,
  top: number,
  duration: number
) {
  const previousFrame = pageScrollFrames.get(pageBody)
  if (previousFrame !== undefined) {
    cancelAnimationFrame(previousFrame)
    pageScrollFrames.delete(pageBody)
  }
  top = Math.max(
    0,
    Math.min(top, pageBody.scrollHeight - pageBody.clientHeight)
  )
  if (duration <= 0 || !Number.isFinite(duration)) {
    pageBody.scrollTo({ top, behavior: 'instant' })
    return
  }
  const startTop = pageBody.scrollTop
  if (startTop === top) {
    return
  }
  const startTime = performance.now()
  let expectedTop = startTop
  function step(time: number) {
    // 用户滚动、内容锚定或页面卸载后，不再覆盖新的滚动位置。
    if (
      !pageBody.isConnected ||
      Math.abs(pageBody.scrollTop - expectedTop) > 1
    ) {
      pageScrollFrames.delete(pageBody)
      return
    }
    const progress = Math.min(1, Math.max(0, (time - startTime) / duration))
    pageBody.scrollTo({
      top: startTop + (top - startTop) * progress,
      // 逐帧写入必须跳过原生平滑滚动，包括业务 CSS 的 scroll-behavior。
      behavior: 'instant',
    })
    expectedTop = pageBody.scrollTop
    if (progress < 1) {
      pageScrollFrames.set(pageBody, requestAnimationFrame(step))
    } else {
      pageScrollFrames.delete(pageBody)
    }
  }
  pageScrollFrames.set(pageBody, requestAnimationFrame(step))
}

function scrollPageBodyTo(
  pageBody: HTMLElement,
  top: number,
  selector: string | undefined,
  duration: number,
  offsetTop: number = 0
) {
  if (selector) {
    const normalizedSelector = normalizePageSelector(selector)
    const element =
      normalizedSelector !== selector && pageBody.matches(normalizedSelector)
        ? pageBody
        : pageBody.querySelector(normalizedSelector)
    if (!element) {
      return
    }
    top =
      element === pageBody
        ? 0
        : element.getBoundingClientRect().top -
          pageBody.getBoundingClientRect().top -
          pageBody.clientTop +
          pageBody.scrollTop
  }
  animatePageBodyScroll(pageBody, top + offsetTop, duration)
}
//#endif

export const pageScrollTo = defineAsyncApi<API_TYPE_PAGE_SCROLL_TO>(
  API_PAGE_SCROLL_TO,
  ({ scrollTop, selector, duration, offsetTop }, { resolve }) => {
    //#if _X_VAPOR_
    if (__VAPOR__) {
      const page = getCurrentPage() as unknown as UniPage | undefined
      const pageBody = page?.vm && getPageBody(page.vm.$)
      if (pageBody) {
        scrollPageBodyTo(
          pageBody,
          scrollTop || 0,
          selector,
          duration!,
          offsetTop
        )
      }
      resolve()
      return
    }
    //#endif
    scrollTo(selector! || scrollTop! || 0, duration!, true)
    resolve()
  },
  PageScrollToProtocol,
  PageScrollToOptions
)
