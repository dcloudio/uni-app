import { isString } from '@vue/shared'
import { getCustomDataset } from './customDataset'
export { initCustomDatasetOnce, getCustomDataset } from './customDataset'

export * from './style'

export function passive(passive: boolean) {
  return { passive }
}

export function normalizeDataset(el: Element) {
  // TODO
  return JSON.parse(JSON.stringify((el as HTMLElement).dataset || {}))
}

export function normalizeTarget(el: HTMLElement) {
  const { id, offsetTop, offsetLeft } = el
  return {
    id,
    dataset: getCustomDataset(el),
    offsetTop,
    offsetLeft,
  }
}

export function addFont(
  family: string,
  source: string,
  desc?: FontFaceDescriptors
): Promise<void> {
  const fonts = document.fonts
  if (fonts) {
    const fontFace = new FontFace(family, source, desc)
    return fontFace.load().then(() => {
      ;(fonts as any).add && (fonts as any).add(fontFace)
    })
  }
  return new Promise((resolve) => {
    const style = document.createElement('style')
    const values: string[] = []
    if (desc) {
      const { style, weight, stretch, unicodeRange, variant, featureSettings } =
        desc as FontFaceDescriptors
      style && values.push(`font-style:${style}`)
      weight && values.push(`font-weight:${weight}`)
      stretch && values.push(`font-stretch:${stretch}`)
      unicodeRange && values.push(`unicode-range:${unicodeRange}`)
      variant && values.push(`font-variant:${variant}`)
      featureSettings && values.push(`font-feature-settings:${featureSettings}`)
    }
    style.innerText = `@font-face{font-family:"${family}";src:${source};${values.join(
      ';'
    )}}`
    document.head.appendChild(style)
    resolve()
  })
}

export function scrollTo(
  scrollTop: number | string,
  duration: number,
  isH5?: boolean
) {
  if (isString(scrollTop)) {
    const el = document.querySelector(scrollTop)
    if (el) {
      const { top } = el.getBoundingClientRect()
      scrollTop = top + window.pageYOffset
      // 如果存在，减去 <uni-page-head> 高度
      const pageHeader = document.querySelector('uni-page-head')
      if (pageHeader) {
        scrollTop -= (pageHeader as HTMLElement).offsetHeight
      }
    }
  }
  if ((scrollTop as number) < 0) {
    scrollTop = 0
  }
  const documentElement = document.documentElement
  const { clientHeight, scrollHeight } = documentElement
  scrollTop = Math.min(scrollTop as number, scrollHeight - clientHeight)
  if (duration === 0) {
    // 部分浏览器（比如微信）中 scrollTop 的值需要通过 document.body 来控制
    documentElement.scrollTop = document.body.scrollTop = scrollTop
    return
  }
  if (window.scrollY === scrollTop) {
    return
  }
  const scrollTo = (duration: number) => {
    if (duration <= 0) {
      window.scrollTo(0, scrollTop as number)
      return
    }
    const distaince = (scrollTop as number) - window.scrollY
    requestAnimationFrame(function () {
      window.scrollTo(0, window.scrollY + (distaince / duration) * 10)
      scrollTo(duration - 10)
    })
  }
  scrollTo(duration)
}
