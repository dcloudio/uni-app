import { FontFaceDescriptors } from 'css-font-loading-module'

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
    dataset: normalizeDataset(el),
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
      fonts.add(fontFace)
    })
  }
  return new Promise((resolve) => {
    const style = document.createElement('style')
    const values = []
    if (desc) {
      const {
        style,
        weight,
        stretch,
        unicodeRange,
        variant,
        featureSettings,
      } = desc as FontFaceDescriptors
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
